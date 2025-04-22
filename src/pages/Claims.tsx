
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useClaims, ClaimStatus } from "@/contexts/ClaimContext";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlassButton from "@/components/GlassButton";
import GlassSelect from "@/components/GlassSelect";
import GlassInput from "@/components/GlassInput";
import { CheckCircle, XCircle, Clock, AlertCircle, Filter, Search } from "lucide-react";

const Claims = () => {
  const { user } = useAuth();
  const { userClaims } = useClaims();
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  if (!user) return null;

  // Filter claims based on selected filter and search term
  const filteredClaims = userClaims.filter(claim => {
    // Filter by status
    if (filter !== "all" && claim.status !== filter) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !claim.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {user.role === "user" ? "My Claims" : "Claims"}
          </h1>
          <p className="text-white/70 mb-4 sm:mb-0">
            {user.role === "user"
              ? "View and manage your insurance claims"
              : "Review and process insurance claims"}
          </p>
        </div>
        
        {user.role === "user" && (
          <Link to="/claims/new">
            <GlassButton variant="primary">
              Submit New Claim
            </GlassButton>
          </Link>
        )}
      </div>

      <GlassCard className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/70" />
            </div>
            <GlassInput
              placeholder="Search claims..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-white/70 mr-2" />
            <GlassSelect
              options={[
                { value: "all", label: "All Claims" },
                { value: "pending", label: "Pending" },
                { value: "in-review", label: "In Review" },
                { value: "approved", label: "Approved" },
                { value: "rejected", label: "Rejected" },
              ]}
              value={filter}
              onChange={setFilter}
            />
          </div>
        </div>
      </GlassCard>

      {filteredClaims.length > 0 ? (
        <div className="space-y-4">
          {filteredClaims.map((claim) => (
            <Link key={claim.id} to={`/claims/${claim.id}`}>
              <GlassCard
                className="hover:bg-white/15 transition-colors"
                hoverEffect
              >
                <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                  <div className="rounded-full p-2 bg-white/10">
                    {getClaimStatusIcon(claim.status)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{claim.title}</h3>
                    <p className="text-white/70 mb-2">
                      {truncateText(claim.description, 80)}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/70">
                      <div>
                        <span className="opacity-70">Hospital:</span> {claim.hospitalName}
                      </div>
                      <div>
                        <span className="opacity-70">Agent:</span> {claim.agentName}
                      </div>
                      <div>
                        <span className="opacity-70">Amount:</span> ${claim.amount.toLocaleString()}
                      </div>
                      <div>
                        <span className="opacity-70">Submitted:</span> {formatDate(claim.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="self-start">
                    <span
                      className={`px-3 py-1 rounded-full font-medium text-sm ${getStatusColor(
                        claim.status
                      )}`}
                    >
                      {formatClaimStatus(claim.status)}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      ) : (
        <GlassCard className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No claims found</h3>
          <p className="text-white/70 mb-6">
            {searchTerm || filter !== "all"
              ? "Try changing your search or filter settings"
              : user.role === "user"
              ? "You haven't submitted any claims yet"
              : "No claims have been assigned to you"}
          </p>
          {user.role === "user" && (
            <Link to="/claims/new">
              <GlassButton variant="primary">Submit Your First Claim</GlassButton>
            </Link>
          )}
        </GlassCard>
      )}
    </DashboardLayout>
  );
};

// Helper function to get the appropriate icon for claim status
function getClaimStatusIcon(status: ClaimStatus) {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-5 w-5 text-green-400" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-400" />;
    case "in-review":
      return <Clock className="h-5 w-5 text-yellow-400" />;
    case "pending":
    default:
      return <AlertCircle className="h-5 w-5 text-blue-400" />;
  }
}

// Helper function to get the color for claim status
function getStatusColor(status: ClaimStatus) {
  switch (status) {
    case "approved":
      return "bg-green-500/30 text-green-200";
    case "rejected":
      return "bg-red-500/30 text-red-200";
    case "in-review":
      return "bg-yellow-500/30 text-yellow-200";
    case "pending":
    default:
      return "bg-blue-500/30 text-blue-200";
  }
}

// Helper function to format claim status
function formatClaimStatus(status: ClaimStatus) {
  switch (status) {
    case "in-review":
      return "In Review";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}

// Helper function to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Helper function to truncate text
function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export default Claims;

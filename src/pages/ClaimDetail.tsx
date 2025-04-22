
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useClaims, ClaimStatus } from "@/contexts/ClaimContext";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlassButton from "@/components/GlassButton";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  ChevronLeft,
  Building,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";

const ClaimDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getClaimById, updateClaimStatus } = useClaims();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!user || !id) return null;

  const claim = getClaimById(id);

  if (!claim) {
    return (
      <DashboardLayout>
        <div className="flex items-center mb-6">
          <GlassButton
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </GlassButton>
          <h1 className="text-2xl font-bold">Claim Not Found</h1>
        </div>
        <GlassCard className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">
            The claim you're looking for doesn't exist
          </h3>
          <p className="text-white/70 mb-6">
            The claim may have been deleted or you may not have access to view it.
          </p>
          <GlassButton
            variant="primary"
            onClick={() => navigate("/claims")}
          >
            View All Claims
          </GlassButton>
        </GlassCard>
      </DashboardLayout>
    );
  }

  const handleStatusUpdate = async (status: ClaimStatus) => {
    if (!user || !claim) return;

    // Determine if the current user can update the claim
    const canUpdate =
      (user.role === "hospital" && claim.hospitalId === user.id) ||
      (user.role === "agent" && claim.agentId === user.id) ||
      user.role === "admin";

    if (!canUpdate) {
      toast({
        title: "Error",
        description: "You don't have permission to update this claim",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      updateClaimStatus(
        claim.id,
        status,
        user.role === "agent" ? "agent" : "hospital"
      );

      toast({
        title: "Claim updated",
        description: `Claim has been ${status === "approved" ? "approved" : "rejected"}`,
        variant: status === "approved" ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update claim status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center">
          <GlassButton
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </GlassButton>
          <h1 className="text-2xl font-bold">Claim Details</h1>
        </div>
        <div className="flex items-center">
          <span
            className={`px-3 py-1 rounded-full font-medium text-sm ${getStatusColor(
              claim.status
            )}`}
          >
            {formatClaimStatus(claim.status)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="mb-6">
            <div className="flex items-center mb-4">
              <div className="rounded-full p-2 bg-white/10 mr-3">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">{claim.title}</h2>
            </div>
            <div className="text-white/80 whitespace-pre-line">
              {claim.description}
            </div>
          </GlassCard>

          <GlassCard className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Documents</h3>
            <div className="space-y-2">
              {claim.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/5 p-3 rounded-lg"
                >
                  <FileText className="h-5 w-5 mr-3 text-white/70" />
                  <span>{doc}</span>
                  <GlassButton
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={() => {
                      toast({
                        title: "Document Viewer",
                        description: "This is a demo. Document viewing is not available.",
                      });
                    }}
                  >
                    View
                  </GlassButton>
                </div>
              ))}
            </div>
          </GlassCard>

          {(user.role === "hospital" || user.role === "agent" || user.role === "admin") && (
            <GlassCard>
              <h3 className="text-lg font-semibold mb-4">Process Claim</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <GlassButton
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleStatusUpdate("rejected")}
                  isLoading={isLoading}
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Reject Claim
                </GlassButton>
                <GlassButton
                  variant="primary"
                  className="flex-1"
                  onClick={() => handleStatusUpdate("approved")}
                  isLoading={isLoading}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Approve Claim
                </GlassButton>
              </div>
            </GlassCard>
          )}
        </div>

        <div>
          <GlassCard className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Claim Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-3 text-white/70" />
                <div>
                  <p className="text-white/60 text-sm">Amount</p>
                  <p className="font-medium">${claim.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-white/70" />
                <div>
                  <p className="text-white/60 text-sm">Submission Date</p>
                  <p className="font-medium">{formatDate(claim.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-white/70" />
                <div>
                  <p className="text-white/60 text-sm">Last Updated</p>
                  <p className="font-medium">{formatDate(claim.updatedAt)}</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Hospital</h3>
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-3 text-white/70" />
              <div>
                <p className="font-medium">{claim.hospitalName}</p>
                <p className="text-white/60 text-sm">
                  {claim.hospitalApproved === true
                    ? "Approved"
                    : claim.hospitalApproved === false && claim.status === "rejected"
                    ? "Rejected"
                    : "Pending Review"}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Insurance Agent</h3>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-3 text-white/70" />
              <div>
                <p className="font-medium">{claim.agentName}</p>
                <p className="text-white/60 text-sm">
                  {claim.agentApproved === true
                    ? "Approved"
                    : claim.agentApproved === false && claim.status === "rejected"
                    ? "Rejected"
                    : "Pending Review"}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-semibold mb-4">Claimant</h3>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-3 text-white/70" />
              <div>
                <p className="font-medium">{claim.userName}</p>
                <p className="text-white/60 text-sm">User ID: {claim.userId}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Helper functions
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

function formatClaimStatus(status: ClaimStatus) {
  switch (status) {
    case "in-review":
      return "In Review";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default ClaimDetail;

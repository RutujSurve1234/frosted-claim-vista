
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useClaims, ClaimStatus } from "@/contexts/ClaimContext";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { FileText, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

// Simple stats card component
const StatCard = ({ title, value, icon: Icon, className }: { title: string; value: string | number; icon: React.ElementType; className?: string }) => (
  <GlassCard className={`flex items-center ${className}`}>
    <div className="rounded-full p-3 mr-4 bg-white/10">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <p className="text-white/70 text-sm">{title}</p>
      <h3 className="text-2xl font-semibold text-white">{value}</h3>
    </div>
  </GlassCard>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { claims, userClaims } = useClaims();
  
  // If not logged in, this page should not be rendered (handled by DashboardLayout)
  if (!user) return null;
  
  // Calculate statistics based on user role
  const stats = getStatsByRole(user.role, claims, userClaims);
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/70">
          Welcome to your {user.role.charAt(0).toUpperCase() + user.role.slice(1)} dashboard
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            className={stat.className}
          />
        ))}
      </div>
      
      {/* Recent Activity Section */}
      <div className="glass-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {userClaims.length > 0 ? (
            userClaims.slice(0, 3).map((claim) => (
              <div key={claim.id} className="bg-white/5 rounded-lg p-4 flex items-center">
                <div className="p-2 rounded-full bg-white/10 mr-3">
                  {getClaimStatusIcon(claim.status)}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{claim.title}</h3>
                  <p className="text-sm text-white/70">
                    {claim.hospitalName} • ${claim.amount.toLocaleString()}
                  </p>
                </div>
                <div className="text-sm">
                  <span className={`px-2 py-1 rounded-full ${getStatusColor(claim.status)}`}>
                    {formatClaimStatus(claim.status)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-white/60">
              <p>No recent activity to display</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Role-Specific Dashboard Components */}
      {getRoleSpecificDashboard(user.role)}
    </DashboardLayout>
  );
};

// Helper function to get stats based on user role
function getStatsByRole(role: string, claims: any[], userClaims: any[]) {
  const pendingClaims = userClaims.filter(claim => claim.status === "pending").length;
  const approvedClaims = userClaims.filter(claim => claim.status === "approved").length;
  const rejectedClaims = userClaims.filter(claim => claim.status === "rejected").length;
  const inReviewClaims = userClaims.filter(claim => claim.status === "in-review").length;
  
  switch (role) {
    case "admin":
      return [
        { title: "Total Claims", value: claims.length, icon: FileText, className: "" },
        { title: "Pending Review", value: pendingClaims, icon: Clock, className: "" },
        { title: "Approved", value: approvedClaims, icon: CheckCircle, className: "" },
        { title: "Rejected", value: rejectedClaims, icon: XCircle, className: "" },
      ];
    case "hospital":
    case "agent":
      return [
        { title: "Assigned Claims", value: userClaims.length, icon: FileText, className: "" },
        { title: "Pending Review", value: pendingClaims, icon: Clock, className: "" },
        { title: "Approved", value: approvedClaims, icon: CheckCircle, className: "" },
        { title: "Rejected", value: rejectedClaims, icon: XCircle, className: "" },
      ];
    case "user":
    default:
      return [
        { title: "Total Claims", value: userClaims.length, icon: FileText, className: "" },
        { title: "Pending", value: pendingClaims + inReviewClaims, icon: Clock, className: "" },
        { title: "Approved", value: approvedClaims, icon: CheckCircle, className: "" },
        { title: "Rejected", value: rejectedClaims, icon: XCircle, className: "" },
      ];
  }
}

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

// Helper function to get role-specific dashboard components
function getRoleSpecificDashboard(role: string) {
  switch (role) {
    case "admin":
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard>
            <h2 className="text-xl font-semibold mb-4">System Overview</h2>
            <p className="text-white/70">Access system-wide statistics and manage users, hospitals, and claims.</p>
          </GlassCard>
          <GlassCard>
            <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
            <p className="text-white/70">Use the sidebar to navigate to management sections for users, hospitals, and insurance agents.</p>
          </GlassCard>
        </div>
      );
    case "hospital":
      return (
        <GlassCard>
          <h2 className="text-xl font-semibold mb-4">Hospital Dashboard</h2>
          <p className="text-white/70">Review and process insurance claims assigned to your hospital. Approve valid claims or reject invalid ones.</p>
        </GlassCard>
      );
    case "agent":
      return (
        <GlassCard>
          <h2 className="text-xl font-semibold mb-4">Agent Dashboard</h2>
          <p className="text-white/70">Manage insurance claims assigned to you. Review documentation and process claims according to policy guidelines.</p>
        </GlassCard>
      );
    case "user":
    default:
      return (
        <GlassCard>
          <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
          <p className="text-white/70">Track your insurance claims and submit new ones. Check the status of existing claims and view your claim history.</p>
        </GlassCard>
      );
  }
}

export default Dashboard;

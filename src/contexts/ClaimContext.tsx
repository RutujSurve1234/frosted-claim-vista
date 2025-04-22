import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

// Claim status
export type ClaimStatus = "pending" | "approved" | "rejected" | "in-review";

// Claim interface
export interface Claim {
  id: string;
  userId: string;
  userName: string;
  hospitalId: string;
  hospitalName: string;
  agentId: string;
  agentName: string;
  title: string;
  description: string;
  amount: number;
  status: ClaimStatus;
  hospitalApproved: boolean;
  agentApproved: boolean;
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

// Hospital interface
export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
}

// Agent interface
export interface Agent {
  id: string;
  name: string;
  company: string;
  phone: string;
}

// Claim context interface
interface ClaimContextType {
  claims: Claim[];
  userClaims: Claim[];
  hospitals: Hospital[];
  agents: Agent[];
  submitClaim: (claim: Omit<Claim, "id" | "status" | "createdAt" | "updatedAt" | "hospitalApproved" | "agentApproved">) => void;
  updateClaimStatus: (claimId: string, status: ClaimStatus, role: "hospital" | "agent") => void;
  getClaimById: (claimId: string) => Claim | undefined;
  loading: boolean;
}

// Create context
const ClaimContext = createContext<ClaimContextType | undefined>(undefined);

// Mock data
const mockHospitals: Hospital[] = [
  { id: "1", name: "General Hospital", address: "123 Main St", phone: "555-1234" },
  { id: "2", name: "City Medical Center", address: "456 Elm St", phone: "555-5678" },
  { id: "3", name: "Community Health", address: "789 Oak St", phone: "555-9012" },
];

const mockAgents: Agent[] = [
  { id: "1", name: "Insurance Co", company: "ABC Insurance", phone: "555-3456" },
  { id: "2", name: "Health Protect", company: "XYZ Insurance", phone: "555-7890" },
  { id: "3", name: "Coverage Plus", company: "DEF Insurance", phone: "555-1234" },
];

const mockClaims: Claim[] = [
  {
    id: "1",
    userId: "4",
    userName: "Regular User",
    hospitalId: "1",
    hospitalName: "General Hospital",
    agentId: "1",
    agentName: "Insurance Co",
    title: "Emergency Room Visit",
    description: "Visited emergency room due to high fever and dehydration",
    amount: 1500,
    status: "pending",
    hospitalApproved: false,
    agentApproved: false,
    documents: ["medical_report.pdf", "receipt.pdf"],
    createdAt: "2025-04-15T10:30:00Z",
    updatedAt: "2025-04-15T10:30:00Z",
  },
  {
    id: "2",
    userId: "4",
    userName: "Regular User",
    hospitalId: "2",
    hospitalName: "City Medical Center",
    agentId: "2",
    agentName: "Health Protect",
    title: "Annual Checkup",
    description: "Routine annual physical examination",
    amount: 500,
    status: "approved",
    hospitalApproved: true,
    agentApproved: true,
    documents: ["checkup_report.pdf"],
    createdAt: "2025-03-20T14:15:00Z",
    updatedAt: "2025-03-22T09:45:00Z",
  },
  {
    id: "3",
    userId: "4",
    userName: "Regular User",
    hospitalId: "3",
    hospitalName: "Community Health",
    agentId: "3",
    agentName: "Coverage Plus",
    title: "Dental Procedure",
    description: "Root canal treatment and crown",
    amount: 1200,
    status: "rejected",
    hospitalApproved: true,
    agentApproved: false,
    documents: ["dental_report.pdf", "xray.pdf", "receipt.pdf"],
    createdAt: "2025-02-10T11:20:00Z",
    updatedAt: "2025-02-12T16:30:00Z",
  },
];

// Provider component
export const ClaimProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [claims, setClaims] = useState<Claim[]>(mockClaims);
  const [loading, setLoading] = useState(false);

  // Get claims for current user
  const userClaims = user ? claims.filter(claim => {
    if (user.role === "user") return claim.userId === user.id;
    if (user.role === "hospital") return claim.hospitalId === user.id;
    if (user.role === "agent") return claim.agentId === user.id;
    if (user.role === "admin") return true;
    return false;
  }) : [];

  // Submit a new claim
  const submitClaim = (claimData: Omit<Claim, "id" | "status" | "createdAt" | "updatedAt" | "hospitalApproved" | "agentApproved">) => {
    setLoading(true);
    
    try {
      // Create new claim
      const newClaim: Claim = {
        ...claimData,
        id: String(claims.length + 1),
        status: "pending",
        hospitalApproved: false,
        agentApproved: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Add to claims
      setClaims(prev => [...prev, newClaim]);
    } catch (error) {
      console.error("Error submitting claim:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update claim status
  const updateClaimStatus = (claimId: string, status: ClaimStatus, role: "hospital" | "agent") => {
    setLoading(true);
    
    try {
      setClaims(prev => prev.map(claim => {
        if (claim.id === claimId) {
          const updatedClaim = { 
            ...claim, 
            updatedAt: new Date().toISOString() 
          };
          
          if (role === "hospital") {
            updatedClaim.hospitalApproved = status === "approved";
          }
          
          if (role === "agent") {
            updatedClaim.agentApproved = status === "approved";
          }
          
          // If both hospital and agent have approved, set status to approved
          if (updatedClaim.hospitalApproved && updatedClaim.agentApproved) {
            updatedClaim.status = "approved";
          }
          // If either hospital or agent has rejected, set status to rejected
          else if (
            (role === "hospital" && status === "rejected") || 
            (role === "agent" && status === "rejected")
          ) {
            updatedClaim.status = "rejected";
          }
          // Otherwise, keep as in-review
          else {
            updatedClaim.status = "in-review";
          }
          
          return updatedClaim;
        }
        return claim;
      }));
    } catch (error) {
      console.error("Error updating claim:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get claim by ID
  const getClaimById = (claimId: string) => {
    return claims.find(claim => claim.id === claimId);
  };

  return (
    <ClaimContext.Provider
      value={{
        claims,
        userClaims,
        hospitals: mockHospitals,
        agents: mockAgents,
        submitClaim,
        updateClaimStatus,
        getClaimById,
        loading,
      }}
    >
      {children}
    </ClaimContext.Provider>
  );
};

// Custom hook to use claim context
export const useClaims = () => {
  const context = useContext(ClaimContext);
  if (context === undefined) {
    throw new Error("useClaims must be used within a ClaimProvider");
  }
  return context;
};

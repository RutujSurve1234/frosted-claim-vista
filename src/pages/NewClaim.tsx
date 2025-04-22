
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useClaims } from "@/contexts/ClaimContext";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import GlassInput from "@/components/GlassInput";
import GlassTextarea from "@/components/GlassTextarea";
import GlassSelect from "@/components/GlassSelect";
import GlassButton from "@/components/GlassButton";
import { ChevronLeft, Upload, Loader2 } from "lucide-react";

const NewClaim = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { submitClaim, hospitals, agents } = useClaims();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    hospitalId: "",
    agentId: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user) return null;

  // Only users can submit claims
  if (user.role !== "user") {
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
          <h1 className="text-2xl font-bold">Not Authorized</h1>
        </div>
        <GlassCard className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">
            Only users can submit claims
          </h3>
          <p className="text-white/70 mb-6">
            You must be logged in as a user to submit an insurance claim.
          </p>
          <GlassButton
            variant="primary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </GlassButton>
        </GlassCard>
      </DashboardLayout>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileUpload = () => {
    // Simulate file upload
    const mockFiles = [
      `medical_report_${Date.now()}.pdf`,
      `invoice_${Date.now()}.pdf`,
    ];
    setUploadedFiles((prev) => [...prev, ...mockFiles]);
    
    toast({
      title: "Files Uploaded",
      description: "Your medical documents have been uploaded successfully.",
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }
    
    if (!formData.hospitalId) {
      newErrors.hospitalId = "Please select a hospital";
    }
    
    if (!formData.agentId) {
      newErrors.agentId = "Please select an insurance agent";
    }
    
    if (uploadedFiles.length === 0) {
      newErrors.files = "At least one document is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const hospital = hospitals.find((h) => h.id === formData.hospitalId);
      const agent = agents.find((a) => a.id === formData.agentId);
      
      if (!hospital || !agent) {
        throw new Error("Hospital or agent not found");
      }
      
      submitClaim({
        userId: user.id,
        userName: user.name,
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        agentId: agent.id,
        agentName: agent.name,
        title: formData.title,
        description: formData.description,
        amount: Number(formData.amount),
        documents: uploadedFiles,
      });
      
      toast({
        title: "Claim Submitted",
        description: "Your insurance claim has been submitted successfully.",
      });
      
      navigate("/claims");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit claim. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <h1 className="text-2xl font-bold">Submit New Claim</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GlassCard className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Claim Details</h2>
              <div className="space-y-4">
                <GlassInput
                  label="Claim Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Emergency Room Visit"
                  error={errors.title}
                />
                
                <GlassTextarea
                  label="Claim Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of your claim..."
                  error={errors.description}
                />
                
                <GlassInput
                  label="Claim Amount ($)"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  error={errors.amount}
                />
              </div>
            </GlassCard>

            <GlassCard className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Documentation</h2>
              <div className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center hover:bg-white/5 transition-colors cursor-pointer ${
                    errors.files ? "border-red-500/70" : "border-white/30"
                  }`}
                  onClick={handleFileUpload}
                >
                  <div className="mx-auto bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="mb-1 font-medium">
                    Click to upload documents
                  </p>
                  <p className="text-sm text-white/70">
                    Medical reports, bills, prescriptions, etc.
                  </p>
                  {errors.files && (
                    <p className="text-red-400 text-sm mt-2">{errors.files}</p>
                  )}
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <h3 className="text-white/80 font-medium">
                      Uploaded Documents
                    </h3>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-white/5 p-3 rounded-lg"
                        >
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                            <div className="w-4 h-4 bg-white/70 rounded-sm"></div>
                          </div>
                          <span className="text-white/80">{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          <div>
            <GlassCard className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Hospital & Insurance</h2>
              <div className="space-y-4">
                <GlassSelect
                  label="Select Hospital"
                  name="hospitalId"
                  options={hospitals.map((hospital) => ({
                    value: hospital.id,
                    label: hospital.name,
                  }))}
                  value={formData.hospitalId}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, hospitalId: value }))
                  }
                  error={errors.hospitalId}
                />
                
                <GlassSelect
                  label="Select Insurance Agent"
                  name="agentId"
                  options={agents.map((agent) => ({
                    value: agent.id,
                    label: `${agent.name} (${agent.company})`,
                  }))}
                  value={formData.agentId}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, agentId: value }))
                  }
                  error={errors.agentId}
                />
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="text-xl font-semibold mb-4">Submit Claim</h2>
              <p className="text-white/70 mb-6">
                Once submitted, your claim will be reviewed by the selected
                hospital and insurance agent. You can track the status of your
                claim in the dashboard.
              </p>
              <GlassButton
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Claim"
                )}
              </GlassButton>
            </GlassCard>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default NewClaim;

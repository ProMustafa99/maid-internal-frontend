import { useQuery } from "@tanstack/react-query";
import { getFieldsByPageId } from "../api/fields";
import Paragraph from "../component/common/Paragraph";
import Header from "../component/common/Header";
import DynamicForm from "../component/form/DynamicForm";
import { toast } from "react-toastify";

export default function MaidsForm() {
  const {
    data: fieldsData,
    isLoading: fieldsLoading,
    error: fieldsError,
    refetch: refetchFields,
  } = useQuery({
    queryKey: ["fields", 2],
    queryFn: () => getFieldsByPageId(2),
    enabled: false, // Don't fetch automatically
  });

  // Transform fields data to match DynamicForm interface
  const formFields =
    fieldsData?.data?.map((field: any) => ({
      name: field.name,
      label: field.label || field.name,
      type: field.type || "text",
      placeholder:
        field.placeholder ||
        (field.type === "select"
          ? `Select ${field.label || field.name}`
          : `Enter ${field.label || field.name}`),
      validation: {
        required: field.required || false,
        minLength: field.validation?.minLength || 0,
        maxLength: field.validation?.maxLength || 0,
        min: field.validation?.min || undefined,
        pattern: field.validation?.pattern || undefined,
      },
      value: undefined,
      error: "",
      options:
        field.type === "select" && field.options ? field.options : undefined,
    })) || [];

  const handleCreateMaid = async (formData: Record<string, any>) => {
    try {
      // TODO: Implement create maid API call
      console.log("Creating maid with data:", formData);

      // Show success message
      toast.success("Maid created successfully!");

      // Close dialog
      // setIsAddMaidDialogOpen(false);
    } catch (error: any) {
      // Show error message
      toast.error(error.message || "Failed to create maid");
    }
  };
  return (
    <div className="">
      <div className="mb-10">
        <Header level="h1" size="2xl" weight="bold" color="default" truncate>
          Maids Management
        </Header>
        <Paragraph size="md" color="muted">
          Manage maid profiles and their information
        </Paragraph>
      </div>

      <DynamicForm
        formFields={formFields}
        buttonTitle="Add Maid"
        onSubmit={handleCreateMaid}
        isLoading={false}
      />
    </div>
  );
}

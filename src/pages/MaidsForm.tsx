import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getFieldsByPageId } from "../api/fields";
import Error from "../component/common/Error";
import Loading from "../component/common/Loading";
import DynamicForm from "../component/form/DynamicForm";

export default function MaidsForm() {
  const {
    data: fieldsData,
    isLoading: fieldsLoading,
    error: fieldsError,
    refetch: refetchFields,
  } = useQuery({
    queryKey: ["fields", 2],
    queryFn: () => getFieldsByPageId(2),
    enabled: true, // Enable automatic fetching
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
     

      {fieldsLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loading />
        </div>
      ) : fieldsError ? (
        <Error error={fieldsError} handleRefresh={() => window.location.reload()} />
      ) : (
        <DynamicForm
          formFields={formFields}
          buttonTitle="Add Maid"
          onSubmit={handleCreateMaid}
          isLoading={false}
          title="Add New Maid"
          description="Please fill in the maid's information below"
        />
      )}
    </div>
  );
}

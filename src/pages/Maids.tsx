import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getFieldsByPageId } from "../api/fields.api";
import { getAllMaids, deleteMaid, type Maid } from "../api/maids.api";
import Header from "../component/common/Header";
import Paragraph from "../component/common/Paragraph";
import DynamicTable from "../component/tabel/DynamicTable";
import Button from "../component/common/Button";
import Dialog from "../component/common/Dialog";
import Loading from "../component/common/Loading";
import Error from "../component/common/Error";
import DynamicForm from "../component/form/DynamicForm";

export default function Maids() {
  const [isAddMaidDialogOpen, setIsAddMaidDialogOpen] = useState(false);
  const [currentPage] = useState(1);
  const [pageSize] = useState(10);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch maids data
  const {
    data: maidsData,
    isLoading: maidsLoading,
    error: maidsError,
  } = useQuery({
    queryKey: ["maids", currentPage, pageSize],
    queryFn: () => getAllMaids(currentPage, pageSize),
  });

  // Fetch fields data for the form
  const {
    data: fieldsData,
    isLoading: fieldsLoading,
    error: fieldsError,
  } = useQuery({
    queryKey: ["fields", 2],
    queryFn: () => getFieldsByPageId(2),
    enabled: false, // Don't fetch automatically
  });

  // Delete maid mutation
  const deleteMaidMutation = useMutation({
    mutationFn: deleteMaid,
    onSuccess: () => {
      toast.success("Maid deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["maids"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete maid");
    },
  });

  // Table columns for maids
  const maidsTableColumns = [
    "id",
    "name",
    "gender",
    "religion",
    "age",
    "nationality_id",
    "price",
    "salary",
    "actions",
  ];

  // Transform maids data for table
  const maidsTableRows =
    maidsData?.data?.map((maid: Maid) => ({
      ...maid,
      actions: (
        <div className="flex space-x-2">
          <Button
            title="Edit"
            onClick={() => navigate(`/maids/edit/${maid.id}`)}
            color="secondary"
            size="sm"
          />
          <Button
            title="Delete"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this maid?")
              ) {
                deleteMaidMutation.mutate(maid.id);
              }
            }}
            color="error"
            size="sm"
            loading={deleteMaidMutation.isPending}
          />
        </div>
      ),
    })) || [];

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
      setIsAddMaidDialogOpen(false);
    } catch (error: any) {
      // Show error message
      toast.error(error.message || "Failed to create maid");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Header level="h1" size="2xl" weight="bold" color="default" truncate>
            Maids Management
          </Header>
          <Paragraph size="md" color="muted">
            Manage maid profiles and their information
          </Paragraph>
        </div>
        <Button
          title="Add New Maid"
          onClick={() => {
            // setIsAddMaidDialogOpen(true);
            // refetchFields(); // Fetch fields when dialog opens
            navigate("/maids/add-maids");
          }}
          color="primary"
          size="lg"
          icon="+"
          iconPosition="left"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {maidsLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loading />
          </div>
        ) : maidsError ? (
          <Error
            error={maidsError}
            handleRefresh={() => window.location.reload()}
          />
        ) : (
          <DynamicTable columns={maidsTableColumns} rows={maidsTableRows} />
        )}
      </div>

      {/* Add New Maid Dialog */}
      <Dialog
        open={isAddMaidDialogOpen}
        onClose={() => setIsAddMaidDialogOpen(false)}
        title="Add New Maid"
        maxWidth="2xl"
        fullWidth={false}
        className="max-w-4xl w-full"
      >
        <div className="space-y-6">
          {fieldsLoading ? (
            <Loading />
          ) : fieldsError ? (
            <Error
              error={fieldsError}
              handleRefresh={() => window.location.reload()}
            />
          ) : (
            <DynamicForm
              formFields={formFields}
              buttonTitle="Add Maid"
              onSubmit={handleCreateMaid}
              isLoading={false}
            />
          )}
        </div>
      </Dialog>
    </div>
  );
}

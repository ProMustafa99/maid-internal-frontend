import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getFieldsByPageId } from "../api/fields.api";
import { createMaid, type CreateMaidData } from "../api/maids.api";
import Loading from "../component/common/Loading";
import DynamicForm from "../component/form/DynamicForm";

export default function MaidsForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: fieldsData,
    isLoading: fieldsLoading,
    error: fieldsError,
  } = useQuery({
    queryKey: ["fields", 2],
    queryFn: () => getFieldsByPageId(2, 'create'),
    enabled: true, // Enable automatic fetching
    retry: 1, // Only retry once
  });

  const createMaidMutation = useMutation({
    mutationFn: createMaid,
    onSuccess: () => {
      toast.success("Maid created successfully!");
      queryClient.invalidateQueries({ queryKey: ["maids"] });
      navigate("/maids");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create maid");
    },
  });

  // Fallback fields if API fails
  const fallbackFields = [
    { name: 'Name', label: 'Full Name', type: 'text', required: true },
    { name: 'passport_id', label: 'Passport ID', type: 'text', required: true },
    { name: 'passport_issue_date', label: 'Passport Issue Date', type: 'date', required: true },
    { name: 'passport_expiry_date', label: 'Passport Expiry Date', type: 'date', required: true },
    { name: 'passport_image', label: 'Passport Image URL', type: 'text', required: true },
    { name: 'religion', label: 'Religion', type: 'select', required: true, options: [
      { value: 'Islam', label: 'Islam' },
      { value: 'Christianity', label: 'Christianity' },
      { value: 'Hinduism', label: 'Hinduism' },
      { value: 'Buddhism', label: 'Buddhism' },
      { value: 'Other', label: 'Other' }
    ]},
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'birthday', label: 'Birthday', type: 'date', required: true },
    { name: 'age', label: 'Age', type: 'number', required: true },
    { name: 'nationality_id', label: 'Nationality', type: 'select', required: true, options: [
      { value: 1, label: 'Indonesia' },
      { value: 2, label: 'Jordan' },
      { value: 3, label: 'India' },
      { value: 4, label: 'Philippines' },
      { value: 5, label: 'United Arab Emirates' }
    ]},
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'salary', label: 'Salary', type: 'number', required: true },
    { name: 'gender', label: 'Gender', type: 'select', required: true, options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' }
    ]},
    { name: 'current_job', label: 'Current Job', type: 'text', required: true },
    { name: 'rate', label: 'Rating', type: 'number', required: false },
    { name: 'height', label: 'Height (cm)', type: 'number', required: false },
    { name: 'weight', label: 'Weight (kg)', type: 'number', required: false },
    { name: 'contact_number', label: 'Contact Number', type: 'text', required: false },
  ];

  // Transform fields data to match DynamicForm interface
  const formFields = (fieldsData as any)?.data?.length > 0 
    ? (fieldsData as any).data.map((field: any) => ({
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
      }))
    : fallbackFields.map((field: any) => ({
        name: field.name,
        label: field.label,
        type: field.type,
        placeholder: field.type === "select" 
          ? `Select ${field.label}` 
          : `Enter ${field.label}`,
        validation: {
          required: field.required || false,
          minLength: 0,
          maxLength: 0,
          min: undefined,
          pattern: undefined,
        },
        value: undefined,
        error: "",
        options: field.options || undefined,
      }));

  const handleCreateMaid = async (formData: Record<string, any>) => {
    try {
      // Calculate age from birthday if age is null or invalid
      let calculatedAge = parseInt(formData.age);
      if (!calculatedAge || isNaN(calculatedAge)) {
        const today = new Date();
        const birthDate = new Date(formData.birthday);
        calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
      }

      // Transform form data to match API format
      const maidData: CreateMaidData = {
        passport_id: formData.passport_id?.toString() || "",
        passport_issue_date: formData.passport_issue_date,
        passport_expiry_date: formData.passport_expiry_date,
        passport_image: formData.passport_image?.toString() || "",
        religion: formData.religion?.toString() || "",
        description: formData.description?.toString() || "",
        birthday: formData.birthday,
        age: calculatedAge,
        nationality_id: parseInt(formData.nationality_id) || 0,
        city: formData.city?.toString() || "",
        price: parseFloat(formData.price) || 0,
        salary: parseFloat(formData.salary) || 0,
        gender: formData.gender?.toString() || "",
        current_job: formData.current_job?.toString() || "",
        Name: formData.Name?.toString() || "",
        rate: formData.rate ? parseFloat(formData.rate) : undefined,
        height: formData.height ? parseInt(formData.height) : undefined,
        weight: formData.weight ? parseInt(formData.weight) : undefined,
        contact_number: formData.contact_number?.toString() || "",
      };

      console.log("Sending maid data:", maidData);
      createMaidMutation.mutate(maidData);
    } catch (error: any) {
      console.error("Error creating maid:", error);
      toast.error(error.message || "Failed to create maid");
    }
  };
  return (
    <div className="">
     

      {fieldsLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loading />
        </div>
      ) : (
        <DynamicForm
          formFields={formFields}
          buttonTitle="Add Maid"
          onSubmit={handleCreateMaid}
          isLoading={createMaidMutation.isPending}
          title="Add New Maid"
          description={fieldsError ? "Using default form fields. Please fill in the maid's information below." : "Please fill in the maid's information below"}
        />
      )}
    </div>
  );
}

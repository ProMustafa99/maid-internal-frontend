import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getFieldsByPageId } from '../api/fields';
import Header from "../component/common/Header";
import Paragraph from "../component/common/Paragraph";
import DynamicTable from "../component/tabel/DynamicTable";
import Button from "../component/common/Button";
import Dialog from '../component/common/Dialog';
import Loading from '../component/common/Loading';
import Error from '../component/common/Error';
import DynamicForm from '../component/form/DynamicForm';
import { maidsTableColumns, maidsTableRows } from "../locally/tableData";

export default function Maids() {
  const [isAddMaidDialogOpen, setIsAddMaidDialogOpen] = useState(false);
    
  const { data: fieldsData, isLoading: fieldsLoading, error: fieldsError, refetch: refetchFields } = useQuery({
    queryKey: ['fields', 2],
    queryFn: () => getFieldsByPageId(2),
    enabled: false, // Don't fetch automatically
  });

  // Transform fields data to match DynamicForm interface
  const formFields = fieldsData?.data?.map((field: any) => ({
    name: field.name,
    label: field.label || field.name,
    type: field.type || 'text',
    placeholder: field.placeholder || (field.type === 'select' ? `Select ${field.label || field.name}` : `Enter ${field.label || field.name}`),
    validation: {
      required: field.required || false,
      minLength: field.validation?.minLength || 0,
      maxLength: field.validation?.maxLength || 0,
      min: field.validation?.min || undefined,
      pattern: field.validation?.pattern || undefined,
    },
    value: undefined,
    error: '',
    options: field.type === 'select' && field.options ? 
      field.options : 
      undefined,
  })) || [];

  const handleCreateMaid = async (formData: Record<string, any>) => {
    try {
      // TODO: Implement create maid API call
      console.log('Creating maid with data:', formData);
      
      // Show success message
      toast.success('Maid created successfully!');
      
      // Close dialog
      setIsAddMaidDialogOpen(false);
    } catch (error: any) {
      // Show error message
      toast.error(error.message || 'Failed to create maid');
    }
  };

  return (
    <div className='p-6'>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Header level="h1" size="2xl" weight="bold" color="default" truncate>Maids Management</Header>
          <Paragraph size="md" color="muted">Manage maid profiles and their information</Paragraph>
        </div>
        <Button 
          title="Add New Maid" 
          onClick={() => {
            setIsAddMaidDialogOpen(true);
            refetchFields(); // Fetch fields when dialog opens
          }}
          color="primary"
          size="lg"
          icon="+"
          iconPosition="left"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <DynamicTable columns={maidsTableColumns} rows={maidsTableRows} />
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
            <Error error={fieldsError} handleRefresh={() => window.location.reload()} />
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

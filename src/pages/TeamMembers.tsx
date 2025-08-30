import { useQuery } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { getFieldsByPageId, getFieldsForEditPage } from '../api/fields';
import type { CreateUserData, UpdateUserData } from '../api/team_member';
import { getSubUsers, useCreateUser, useUpdateUser } from '../api/team_member';
import UserCard from '../card/UserCard';
import Button from '../component/common/Button';
import Dialog from '../component/common/Dialog';
import Error from '../component/common/Error';
import Header from '../component/common/Header';
import Loading from '../component/common/Loading';
import Paragraph from '../component/common/Paragraph';
import DynamicForm from '../component/form/DynamicForm';
import type { User } from '../interface/users.interfcae';

export default function TeamMembers() {
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const refreshKeyRef = useRef(0);
    
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => getSubUsers(1),
  });

  const { data: fieldsData, isLoading: fieldsLoading, error: fieldsError, refetch: refetchFields } = useQuery({
    queryKey: ['fields'],
    queryFn: () => getFieldsByPageId(1),
    enabled: false, // Don't fetch automatically
  });

  // Query for edit fields when viewing user details
  const { data: fieldsDataForEdit, isLoading: fieldsLoadingForEdit, error: fieldsErrorForEdit, refetch: refetchFieldsForEdit } = useQuery({
    queryKey: ['fields', 'edit', 1, selectedUser?.id, refreshKeyRef.current],
    queryFn: () => getFieldsForEditPage(1, selectedUser!.id, 'Users'),
    enabled: !!selectedUser?.id, // Only run when we have a valid user ID
    staleTime: 0, // Always fetch fresh data
  });

  



  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  // Transform fields data to match DynamicForm interface
  const formFields = fieldsData?.data?.map((field: any) => ({
    name: field.name,
    label: field.label || field.name,
    type: field.type || 'text',
    placeholder: field.type === 'select' ? `Select ${field.label || field.name}` : `Enter ${field.label || field.name}`,
    validation: {
      required: field.required || false,
      minLength: field.minLength || 0,
      maxLength: field.maxLength || 0,
    },
    value: undefined,
    error: '',
    options: field.type === 'select' && field.options ? 
      field.options.map((opt: any) => ({ value: opt.value || opt, label: opt.label || opt })) : 
      undefined,
  })) || [];

  const formFieldsForEdit = fieldsDataForEdit?.data?.map((field: any) => ({
    name: field.name,
    label: field.label || field.name,
    type: field.type || 'text',
    placeholder: field.type === 'select' ? `Select ${field.label || field.name}` : `Enter ${field.label || field.name}`,
    validation: {
      required: field.required || false,
      minLength: field.minLength || 0,
      maxLength: field.maxLength || 0,
    },
    value: field.value || field.default_value || '',
    error: '',
    options: field.type === 'select' && field.options ? 
      field.options.map((opt: any) => ({ value: opt.value || opt, label: opt.label || opt })) : 
      undefined,
  }));

  const handleRefresh = () => {
    refetch();
  };

  // Handle viewing user details
  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user);
    setIsViewDetailsDialogOpen(true);
    setIsEditMode(false); // Reset to view mode
    refreshKeyRef.current += 1; // Force fresh data fetch
    refetchFieldsForEdit(); // Fetch fields for edit when dialog opens
  };

  // Handle updating user data
  const handleUpdateUser = async (formData: Record<string, any>) => {
    try {
      // TODO: Implement update user API call
      console.log('Updating user with data:', formData);
      
      // Show success message
      toast.success('User updated successfully!');
      
      // Close dialog and refresh users list
      setIsViewDetailsDialogOpen(false);
      setIsEditMode(false);
      refetch();
    } catch (error: any) {
      // Show error message
      toast.error(error.message || 'Failed to update user');
    }
  };

  // Here we need to use Toast when the found the Error
  const handleCreateUser = async (formData: Record<string, any>) => {
    try {
      // Transform form data to match CreateUserData interface
      const userData: CreateUserData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        gender: formData.gender || undefined,
        country_id: formData.country_id ? Number(formData.country_id) : undefined,
        role_id: Number(formData.role_id),
        agency_id: formData.agency_id ? Number(formData.agency_id) : undefined,
        record_status: formData.record_status ? Number(formData.record_status) : 1,
      };

      await createUserMutation.mutateAsync(userData);
      
      // Show success message
      toast.success('User created successfully!');
      
      // Close dialog and refresh users list
      setIsAddMemberDialogOpen(false);
      refetch();
    } catch (error: any) {
      // Show error message
      toast.error(error.message || 'Failed to create user');
    }
  };

  const handleUpdateUserForEdit = async (formData: Record<string, any>) => {
    let loadingToastId: string | number | undefined;
    
    try {
      if (!selectedUser?.id) {
        toast.error('No user selected for update');
        return;
      }

      // Show loading toast
      loadingToastId = toast.loading(`Updating ${selectedUser.name}...`, {
        position: "top-right",
        autoClose: false,
      });

      // Transform form data to match UpdateUserData interface
      const userData: UpdateUserData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        gender: formData.gender || undefined,
        country_id: formData.country_id ? Number(formData.country_id) : undefined,
        role_id: Number(formData.role_id),
        agency_id: formData.agency_id ? Number(formData.agency_id) : undefined,
        record_status: formData.record_status ? Number(formData.record_status) : 1,
      };

      // Only include password if it's provided and not empty
      if (formData.password && formData.password.trim() !== '') {
        userData.password = formData.password;
      }

      await updateUserMutation.mutateAsync({ userId: selectedUser.id, userData });
      
      // Dismiss loading toast and show success message
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }
      toast.success(`✅ ${selectedUser.name} updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
      
      // Increment refresh key to force fresh data on next open
      refreshKeyRef.current += 1;
      
      // Close dialog and refresh users list
      setIsViewDetailsDialogOpen(false);
      setIsEditMode(false);
      refetch();
    } catch (error: any) {
      // Dismiss loading toast and show error message
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }
      toast.error(`❌ Failed to update ${selectedUser?.name || 'user'}: ${error.message || 'Unknown error'}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} handleRefresh={handleRefresh} />;
  }

  const users = data?.data?.users || [];

  return (
    <div className='p-6'>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Header level="h1" size="2xl" weight="bold" color="default" truncate>Team Members</Header>
          <Paragraph size="md" color="muted">Manage internal team members and their information</Paragraph>
        </div>
        <Button 
          title="Add New Member" 
          onClick={() => {
            setIsAddMemberDialogOpen(true);
            refetchFields(); // Fetch fields when dialog opens
          }}
          color="primary"
          size="lg"
          icon="+"
          iconPosition="left"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} onViewDetails={handleViewUserDetails} />
        ))}
      </div>

      {/* Add New Member Dialog */}
      <Dialog
        open={isAddMemberDialogOpen}
        onClose={() => setIsAddMemberDialogOpen(false)}
        title="Add New Team Member"
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
              buttonTitle="Add Member" 
              onSubmit={handleCreateUser}
              isLoading={createUserMutation.isPending}
            />
          )}
        </div>
      </Dialog>

      {/* View User Details Dialog */}

      <Dialog
        open={isViewDetailsDialogOpen}
        onClose={() => setIsViewDetailsDialogOpen(false)}
        title={`View User Details - ${selectedUser?.name || 'Unknown User'}`}
        maxWidth="2xl"
        fullWidth={false}
        className="max-w-4xl w-full"
      >
        <div className="space-y-6">
          {fieldsLoadingForEdit ? (
            <Loading />
          ) : fieldsErrorForEdit ? (
            <Error error={fieldsErrorForEdit} handleRefresh={() => window.location.reload()} />
          ) : (
            <DynamicForm
              formFields={formFieldsForEdit || []} 
              buttonTitle="Update User" 
              onSubmit={handleUpdateUserForEdit}
              isLoading={updateUserMutation.isPending}
            />
          )}
        </div>
      </Dialog>
 
    </div>
  );
}

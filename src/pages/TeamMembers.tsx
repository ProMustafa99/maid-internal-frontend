import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getFieldsByPageId } from '../api/fields';
import type { CreateUserData } from '../api/team_member';
import { getSubUsers, useCreateUser } from '../api/team_member';
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
    
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => getSubUsers(1),
  });

  const { data: fieldsData, isLoading: fieldsLoading, error: fieldsError } = useQuery({
    queryKey: ['fields'],
    queryFn: () => getFieldsByPageId(1),
  });




  const createUserMutation = useCreateUser();

  // Transform fields data to match DynamicForm interface
  const formFields = fieldsData?.data?.map((field: any) => ({
    name: field.name,
    label: field.label || field.name,
    type: field.type || 'text',
    placeholder: field.placeholder || `Enter ${field.label || field.name}`,
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

  const handleRefresh = () => {
    refetch();
  };

  // Here we need to use Toast when the found the Error
  const handleCreateUser = async (formData: Record<string, any>) => {
    try {
      // Transform form data to match CreateUserData interface
      const userData: CreateUserData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
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
          onClick={() => setIsAddMemberDialogOpen(true)}
          color="primary"
          size="lg"
          icon="+"
          iconPosition="left"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Add New Member Dialog */}
      <Dialog
        open={isAddMemberDialogOpen}
        onClose={() => setIsAddMemberDialogOpen(false)}
        title="Add New Team Member"
        fullScreen={false}
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
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import { getSubUsers, useCreateUser } from '../api/teamMember/team_member';
import type { CreateUserData } from '../api/teamMember/team_member';
import UserCard from '../card/UserCard';
import Error from '../component/common/Error';
import Loading from '../component/common/Loading';
import type { User } from '../interface/users.interfcae';
import Header from '../component/common/Header';
import Paragraph from '../component/common/Paragraph';
import Button from '../component/common/Button';
import Dialog from '../component/common/Dialog';
import { useState } from 'react';
import DynamicForm from '../component/form/DynamicForm';
import { toast } from 'react-toastify';

export default function TeamMembers() {
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => getSubUsers(1),
  });

  const createUserMutation = useCreateUser();

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
  // const columns = data?.data?.columns || [];
  // const totalPages = data?.data?.totalPages || 0;
  // const currentPage = data?.data?.currentPage || 1;
  // const count = data?.data?.count || 0;

  const formFields = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
      validation: {
        required: true,
        minLength: 1,
        maxLength: 255,
      },
      value: "",
      error: "",
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      required: true,
      validation: {
        required: true,
        minLength: 1,
        maxLength: 255,
      },
      value: "",
      error: "",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
      validation: {
        required: true,
        minLength: 9,
        maxLength: 32,
      },
      value: "",
      error: "",
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      required: false,
      validation: {
        required: false,
        minLength: 1,
        maxLength: 20,
      },
      value: "",
      error: "",
    },
    {
      name: "gender",
      type: "select",
      label: "Gender",
      placeholder: "Select your gender",
      required: false,
      validation: {
        required: false,
        minLength: 1,
        maxLength: 10,
      },
      options: [
        { value: "Female", label: "Female" },
        { value: "Male", label: "Male" },
      ],
      value: "",
      error: "",
    },
    {
      name: "country_id",
      type: "number",
      label: "Country",
      placeholder: "Select your country",
      required: false,
      validation: {
        required: false,
        minLength: 1,
        maxLength: 999,
      },
      value: "",
      error: "",
      
    },
    // Here we need make the role id is dynamic based on the Current User Role
    // nobody can create a user with role id 1  (Super Admin)
    // ooption Based on the Current User Role
    {
      name: "role_id",
      type: "number",
      label: "Role ID",
      placeholder: "Enter role ID",
      required: true,
      validation: {
        required: true,
        minLength: 1,
        maxLength: 999,
      },
      value: "",
      error: "",
    },
    // Here if the current user role is 1 (Super Admin) must be Insert agency id 
    // and must be the agency is required
    // else get the ageny_id from the current user
    {
      name: "agency_id",
      type: "number",
      label: "Agency ID",
      placeholder: "Enter agency ID",
      required: false,
      validation: {
        required: false,
        minLength: 1,
        maxLength: 999,
      },
      value: "",
      error: "",
    },
  ];
  
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
          <DynamicForm 
            formFields={formFields} 
            buttonTitle="Add Member" 
            onSubmit={handleCreateUser}
            isLoading={createUserMutation.isPending}
          />
        </div>
      </Dialog>
    </div>
  );
}

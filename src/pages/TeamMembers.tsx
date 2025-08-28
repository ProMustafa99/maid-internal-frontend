import { useQuery } from '@tanstack/react-query';
import { getSubUsers } from '../api/teamMember/team_member';
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

export default function TeamMembers() {
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => getSubUsers(1),
  });

  const handleRefresh = () => {
    refetch();
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
      name: "user_name",
      type: "text",
      label: "User Name",
      placeholder: "Enter your name",
      required: true,
      validation: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      value: "test",
      error: "",
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      value: "",
      error: "",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      value: "",
      error: "",
    },
    {
      name: "age",
      type: "number",
      label: "Age",
      placeholder: "Enter your age",
      validation: {
        required: false,
        minLength: 3,
        maxLength: 20,
      },
      value: "",
      error: "",
    },
    {
      name: "bio",
      type: "textarea",
      label: "Bio",
      placeholder: "Tell us about yourself",
      validation: {
        required: false,
        minLength: 3,
        maxLength: 20,
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

          <DynamicForm formFields={formFields} />
        </div>
      </Dialog>
    </div>
  );
}

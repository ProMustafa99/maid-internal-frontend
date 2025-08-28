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
        maxWidth="lg"
      >
        <div className="space-y-6">
          <Paragraph size="md" color="muted">
            This dialog will contain the form to add a new team member.
          </Paragraph>
          <div className="flex justify-end space-x-3">
            <Button
              title="Cancel"
              onClick={() => setIsAddMemberDialogOpen(false)}
              color="secondary"
              variant="outline"
              size="md"
            />
            <Button
              title="Add Member"
              onClick={() => {
                // Handle adding member logic here
                console.log('Adding new member...');
                setIsAddMemberDialogOpen(false);
              }}
              color="success"
              size="md"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

import DynamicTable from '../component/tabel/DynamicTable';
import { getSubUsers } from '../api/teamMember/team_member';
import { useQuery } from '@tanstack/react-query';
import Loading from '../component/common/Loading';
import Error from '../component/common/Error';
import UserCard from '../card/UserCard';
import type { User } from '../interface/users.interfcae';

export default function TeamMembers() {
  
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
  const columns = data?.data?.columns || [];
  const totalPages = data?.data?.totalPages || 0;
  const currentPage = data?.data?.currentPage || 1;
  const count = data?.data?.count || 0;

  return (
    <div className='p-6'>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Team Members</h1>
        <p className="text-gray-600">Manage internal team members and their information</p>
        <div className="flex items-center space-x-4 mt-2">
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages} • Total Users: {count}
          </span>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Refresh Data
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

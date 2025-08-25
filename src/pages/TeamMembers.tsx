import DynamicTable from '../component/tabel/DynamicTable';
import { teamMembersTableColumns, teamMembersTableRows } from '../locally/tableData';

export default function TeamMembers() {
  return (
    <div className='p-6'>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Team Members</h1>
        <p className="text-gray-600">Manage internal team members and their information</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <DynamicTable 
          columns={teamMembersTableColumns}
          rows={teamMembersTableRows}
        />
      </div>
    </div>
  );
}

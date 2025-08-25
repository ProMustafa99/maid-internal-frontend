
import DynamicTable from '../component/tabel/DynamicTable';
import { leadsTableColumns, leadsTableRows } from '../locally/tableData';

export default function Leads() {
  return (
    <div className='p-6'>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Leads Management</h1>
        <p className="text-gray-600">Track and manage potential customers and their service requests</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <DynamicTable 
          columns={leadsTableColumns}
          rows={leadsTableRows}
        />
      </div>
    </div>
  );
}

import DynamicTable from "../component/tabel/DynamicTable";
import { maidsTableColumns, maidsTableRows } from "../locally/tableData";

export default function Maids() {
 
  return (
    <div className='p-6'>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Maids Management</h1>
        <p className="text-gray-600">Track and manage maids and their information</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <DynamicTable columns={maidsTableColumns} rows={maidsTableRows} />
      </div>
    </div>
  );

}

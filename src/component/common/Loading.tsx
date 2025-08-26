export default function Loading() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Team Members</h1>
        <p className="text-gray-600">
          Manage internal team members and their information
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 text-center">
          <div className="text-gray-500">Loading users...</div>
        </div>
      </div>
    </div>
  );
}

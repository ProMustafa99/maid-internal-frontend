export default function Error({ error, handleRefresh }: { error: any, handleRefresh: () => void }) {
    return (
        <div className='p-6'>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Team Members</h1>
            <p className="text-gray-600">Manage internal team members and their information</p>
          </div>
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 text-center">
              <div className="text-red-500">Error: {error.message}</div>
              <button 
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      );
}

import type { User } from '../interface/users.interfcae'
import Paragraph from '../component/common/Paragraph'
import Header from '../component/common/Header'

export default function UserCard({user}: {user: User}) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">
                        {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </span>
                </div>
                <div className="min-w-0">
                    <Header level="h3" size="lg" weight="semibold" color="default" truncate>{user.name || 'Unknown User'}</Header>
                    <Paragraph size="xs" color="muted">Role ID: {user.role_id}</Paragraph>
                </div>
            </div>
            
            {/* Status Badge - Top Right */}
            <div className={`px-3 py-2 rounded-full text-sm font-semibold ${
                user.record_status === 1 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
            }`}>
                {user.record_status === 1 ? 'Active' : 'Inactive'}
            </div>
        </div>

        {/* Details Section */}
        <div className="space-y-3 mb-4">
            {/* Contact */}
            <div className="flex items-center gap-2">
                <span className="span-label w-16">Email:</span>
                <span className="span-value truncate">{user.email || 'No email'}</span>
            </div>
            
            {user.phone && (
                <div className="flex items-center gap-2">
                    <span className="span-label w-16">Phone:</span>
                    <span className="span-value">{user.phone}</span>
                </div>
            )}

            {/* Agency Row */}
            <div className="flex items-center gap-2">
                <span className="span-label">Agency:</span>
                <span className="span-highlight">{user.agency_id || 'None'}</span>
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-2">
                <span className="span-label w-16">Joined:</span>
                <span className="span-value">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    }) : 'Unknown date'}
                </span>
            </div>
        </div>

        {/* Action Button */}
        <button className="w-full text-blue-600 hover:text-blue-700 font-medium py-2 text-sm transition-colors duration-200 border-t border-gray-100 pt-3">
            View Details →
        </button>
    </div>
  )
}
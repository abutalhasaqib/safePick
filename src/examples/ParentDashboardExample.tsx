import React from 'react'
import { useChildren, useAddChild, useCreateRide } from '../hooks/useParent'
import { useCurrentUser } from '../hooks/useAuth'
import { useNotifications } from '../hooks/useNotifications'
import { toast } from 'sonner'

export const ParentDashboardExample: React.FC = () => {
  const { data: user } = useCurrentUser()
  const { data: children, isLoading: childrenLoading } = useChildren(user?.id || '')
  const { data: notifications } = useNotifications(user?.id || '', 1, 5)
  
  const addChildMutation = useAddChild()
  const createRideMutation = useCreateRide()

  const handleAddChild = async () => {
    if (!user?.id) return
    
    try {
      await addChildMutation.mutateAsync({
        parent_id: user.id,
        first_name: 'John',
        last_name: 'Doe',
        age: 8,
        pickup_address: '123 Home St',
        dropoff_address: '456 School Ave',
        emergency_contact: 'Jane Doe',
        emergency_phone: '+1234567890',
        is_active: true,
      })
      toast.success('Child added successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to add child')
    }
  }

  const handleCreateRide = async (childId: string) => {
    if (!user?.id) return
    
    try {
      await createRideMutation.mutateAsync({
        rideData: {
          child_id: childId,
          pickup_address: '123 Home St',
          pickup_latitude: 40.7128,
          pickup_longitude: -74.0060,
          dropoff_address: '456 School Ave',
          dropoff_latitude: 40.7589,
          dropoff_longitude: -73.9851,
          scheduled_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
          special_instructions: 'Child has backpack and lunch box',
        },
        parentId: user.id,
      })
      toast.success('Ride requested successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create ride')
    }
  }

  if (childrenLoading) {
    return <div className="p-4">Loading children...</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>
      
      {/* Notifications Section */}
      <div className="mb-8 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
        {notifications?.data.length ? (
          <div className="space-y-2">
            {notifications.data.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded ${
                  notification.is_read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-400'
                }`}
              >
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <span className="text-xs text-gray-400">
                  {new Date(notification.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No notifications</p>
        )}
      </div>

      {/* Children Section */}
      <div className="mb-8 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Children</h2>
          <button
            onClick={handleAddChild}
            disabled={addChildMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {addChildMutation.isPending ? 'Adding...' : 'Add Child'}
          </button>
        </div>
        
        {children?.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {children.map((child) => (
              <div key={child.id} className="border rounded-lg p-4">
                <h3 className="font-medium text-lg">
                  {child.first_name} {child.last_name}
                </h3>
                <p className="text-gray-600">Age: {child.age}</p>
                <p className="text-sm text-gray-500 mb-3">
                  Pickup: {child.pickup_address}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Dropoff: {child.dropoff_address}
                </p>
                <button
                  onClick={() => handleCreateRide(child.id)}
                  disabled={createRideMutation.isPending}
                  className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {createRideMutation.isPending ? 'Requesting...' : 'Request Ride'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No children added yet</p>
        )}
      </div>
    </div>
  )
}

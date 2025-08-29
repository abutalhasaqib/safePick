import React, { useEffect } from 'react'
import { useDriverRides, useAcceptRide, useStartRide, useCompleteRide, useUpdateDriverAvailability } from '../hooks/useDriver'
import { useCurrentUser } from '../hooks/useAuth'
import { toast } from 'sonner'

export const DriverDashboardExample: React.FC = () => {
  const { data: user } = useCurrentUser()
  const { data: ridesData } = useDriverRides(user?.id || '', undefined, 1, 10)
  
  const acceptRideMutation = useAcceptRide()
  const startRideMutation = useStartRide()
  const completeRideMutation = useCompleteRide()
  const updateAvailabilityMutation = useUpdateDriverAvailability()

  // Example of updating driver location periodically
  useEffect(() => {
    if (!user?.id) return

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // You would use useUpdateDriverLocation hook here
            console.log('Current location:', position.coords.latitude, position.coords.longitude)
          },
          (error) => console.error('Error getting location:', error)
        )
      }
    }

    // Update location every 30 seconds when driver is available
    const interval = setInterval(updateLocation, 30000)
    return () => clearInterval(interval)
  }, [user?.id])

  const handleAcceptRide = async (rideId: string) => {
    if (!user?.id) return
    
    try {
      await acceptRideMutation.mutateAsync({ rideId, driverId: user.id })
      toast.success('Ride accepted!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to accept ride')
    }
  }

  const handleStartRide = async (rideId: string) => {
    try {
      await startRideMutation.mutateAsync(rideId)
      toast.success('Ride started!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to start ride')
    }
  }

  const handleCompleteRide = async (rideId: string) => {
    try {
      await completeRideMutation.mutateAsync(rideId)
      toast.success('Ride completed!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to complete ride')
    }
  }

  const handleToggleAvailability = async (isAvailable: boolean) => {
    if (!user?.id) return
    
    try {
      await updateAvailabilityMutation.mutateAsync({ 
        driverId: user.id, 
        isAvailable 
      })
      toast.success(`You are now ${isAvailable ? 'available' : 'unavailable'}`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to update availability')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActionButton = (ride: any) => {
    switch (ride.status) {
      case 'pending':
        return (
          <button
            onClick={() => handleAcceptRide(ride.id)}
            disabled={acceptRideMutation.isPending}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {acceptRideMutation.isPending ? 'Accepting...' : 'Accept'}
          </button>
        )
      case 'accepted':
        return (
          <button
            onClick={() => handleStartRide(ride.id)}
            disabled={startRideMutation.isPending}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {startRideMutation.isPending ? 'Starting...' : 'Start Ride'}
          </button>
        )
      case 'in_progress':
        return (
          <button
            onClick={() => handleCompleteRide(ride.id)}
            disabled={completeRideMutation.isPending}
            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {completeRideMutation.isPending ? 'Completing...' : 'Complete'}
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Driver Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleToggleAvailability(true)}
            disabled={updateAvailabilityMutation.isPending}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Go Online
          </button>
          <button
            onClick={() => handleToggleAvailability(false)}
            disabled={updateAvailabilityMutation.isPending}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            Go Offline
          </button>
        </div>
      </div>

      {/* Ride Requests */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Rides</h2>
        
        {ridesData?.data.length ? (
          <div className="space-y-4">
            {ridesData.data.map((ride) => (
              <div key={ride.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ride.status)}`}>
                      {ride.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">${ride.total_fare}</p>
                    <p className="text-sm text-gray-500">{ride.distance_km} km</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-medium text-sm text-gray-700">Pickup</p>
                    <p className="text-sm">{ride.pickup_address}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-700">Dropoff</p>
                    <p className="text-sm">{ride.dropoff_address}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Scheduled: {new Date(ride.scheduled_time).toLocaleString()}
                    </p>
                    {ride.special_instructions && (
                      <p className="text-sm text-blue-600 mt-1">
                        Note: {ride.special_instructions}
                      </p>
                    )}
                  </div>
                  {getActionButton(ride)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No rides available</p>
        )}
      </div>
    </div>
  )
}

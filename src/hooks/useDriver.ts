import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { driverApi } from '../services/driverService'
import { Driver, DriverEarnings, Ride } from '../types/api'

// Query keys
export const driverKeys = {
  all: ['driver'] as const,
  profile: (userId: string) => [...driverKeys.all, 'profile', userId] as const,
  earnings: (driverId: string, startDate?: string, endDate?: string) => 
    [...driverKeys.all, 'earnings', driverId, startDate, endDate] as const,
  rides: (driverId: string, status?: string) => 
    [...driverKeys.all, 'rides', driverId, status] as const,
  availableDrivers: (lat: number, lng: number, radius: number) => 
    [...driverKeys.all, 'available', lat, lng, radius] as const,
}

// Driver profile hooks
export const useDriverProfile = (userId: string) => {
  return useQuery({
    queryKey: driverKeys.profile(userId),
    queryFn: () => driverApi.getDriverProfile(userId),
    enabled: !!userId,
  })
}

export const useCreateDriverProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (driverData: Omit<Driver, 'id' | 'created_at' | 'updated_at'>) =>
      driverApi.createDriverProfile(driverData),
    onSuccess: (data) => {
      queryClient.setQueryData(driverKeys.profile(data.user_id), data)
      queryClient.invalidateQueries({ queryKey: driverKeys.profile(data.user_id) })
    },
  })
}

export const useUpdateDriverProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ driverId, driverData }: { driverId: string; driverData: Partial<Driver> }) =>
      driverApi.updateDriverProfile(driverId, driverData),
    onSuccess: (data) => {
      queryClient.setQueryData(driverKeys.profile(data.user_id), data)
      queryClient.invalidateQueries({ queryKey: driverKeys.profile(data.user_id) })
    },
  })
}

// Location and availability hooks
export const useUpdateDriverLocation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ driverId, latitude, longitude }: { driverId: string; latitude: number; longitude: number }) =>
      driverApi.updateLocation(driverId, latitude, longitude),
    onSuccess: (_, { driverId }) => {
      queryClient.invalidateQueries({ queryKey: driverKeys.all })
    },
  })
}

export const useUpdateDriverAvailability = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ driverId, isAvailable }: { driverId: string; isAvailable: boolean }) =>
      driverApi.updateAvailability(driverId, isAvailable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.all })
    },
  })
}

// Driver earnings hooks
export const useDriverEarnings = (
  driverId: string,
  startDate?: string,
  endDate?: string,
  page: number = 1,
  limit: number = 20
) => {
  return useQuery({
    queryKey: driverKeys.earnings(driverId, startDate, endDate),
    queryFn: () => driverApi.getDriverEarnings(driverId, startDate, endDate, page, limit),
    enabled: !!driverId,
  })
}

// Driver rides hooks
export const useDriverRides = (
  driverId: string,
  status?: string,
  page: number = 1,
  limit: number = 20
) => {
  return useQuery({
    queryKey: driverKeys.rides(driverId, status),
    queryFn: () => driverApi.getDriverRides(driverId, status, page, limit),
    enabled: !!driverId,
  })
}

// Available drivers hooks
export const useAvailableDrivers = (
  latitude: number,
  longitude: number,
  radiusKm: number = 10
) => {
  return useQuery({
    queryKey: driverKeys.availableDrivers(latitude, longitude, radiusKm),
    queryFn: () => driverApi.getAvailableDrivers(latitude, longitude, radiusKm),
    enabled: !!latitude && !!longitude,
    staleTime: 30 * 1000, // 30 seconds
  })
}

// Ride management hooks
export const useAcceptRide = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ rideId, driverId }: { rideId: string; driverId: string }) =>
      driverApi.acceptRide(rideId, driverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.all })
      queryClient.invalidateQueries({ queryKey: ['parent'] })
    },
  })
}

export const useStartRide = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (rideId: string) => driverApi.startRide(rideId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.all })
      queryClient.invalidateQueries({ queryKey: ['parent'] })
    },
  })
}

export const useCompleteRide = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (rideId: string) => driverApi.completeRide(rideId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.all })
      queryClient.invalidateQueries({ queryKey: ['parent'] })
    },
  })
}

export const useCancelRideByDriver = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ rideId, reason }: { rideId: string; reason: string }) =>
      driverApi.cancelRide(rideId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.all })
      queryClient.invalidateQueries({ queryKey: ['parent'] })
    },
  })
}

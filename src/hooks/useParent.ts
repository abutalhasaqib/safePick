import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { parentApi } from '../services/parentService'
import { Parent, Child, Ride, Driver, Payment, Rating, CreateRideRequest } from '../types/api'

// Query keys
export const parentKeys = {
  all: ['parent'] as const,
  profile: (userId: string) => [...parentKeys.all, 'profile', userId] as const,
  children: (parentId: string) => [...parentKeys.all, 'children', parentId] as const,
  rides: (parentId: string, status?: string) => [...parentKeys.all, 'rides', parentId, status] as const,
  ride: (rideId: string) => [...parentKeys.all, 'ride', rideId] as const,
  payments: (parentId: string) => [...parentKeys.all, 'payments', parentId] as const,
  availableDrivers: (lat: number, lng: number, radius: number) => 
    [...parentKeys.all, 'available-drivers', lat, lng, radius] as const,
  driverRatings: (driverId: string) => [...parentKeys.all, 'driver-ratings', driverId] as const,
}

// Parent profile hooks
export const useParentProfile = (userId: string) => {
  return useQuery({
    queryKey: parentKeys.profile(userId),
    queryFn: () => parentApi.getParentProfile(userId),
    enabled: !!userId,
  })
}

export const useCreateParentProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (parentData: Omit<Parent, 'id' | 'created_at' | 'updated_at'>) =>
      parentApi.createParentProfile(parentData),
    onSuccess: (data) => {
      queryClient.setQueryData(parentKeys.profile(data.user_id), data)
      queryClient.invalidateQueries({ queryKey: parentKeys.profile(data.user_id) })
    },
  })
}

export const useUpdateParentProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ parentId, parentData }: { parentId: string; parentData: Partial<Parent> }) =>
      parentApi.updateParentProfile(parentId, parentData),
    onSuccess: (data) => {
      queryClient.setQueryData(parentKeys.profile(data.user_id), data)
      queryClient.invalidateQueries({ queryKey: parentKeys.profile(data.user_id) })
    },
  })
}

// Children management hooks
export const useChildren = (parentId: string) => {
  return useQuery({
    queryKey: parentKeys.children(parentId),
    queryFn: () => parentApi.getChildren(parentId),
    enabled: !!parentId,
  })
}

export const useAddChild = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (childData: Omit<Child, 'id' | 'created_at' | 'updated_at'>) =>
      parentApi.addChild(childData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.children(data.parent_id) })
    },
  })
}

export const useUpdateChild = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ childId, childData }: { childId: string; childData: Partial<Child> }) =>
      parentApi.updateChild(childId, childData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.children(data.parent_id) })
    },
  })
}

export const useDeleteChild = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (childId: string) => parentApi.deleteChild(childId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: parentKeys.all })
    },
  })
}

// Ride management hooks
export const useCreateRide = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ rideData, parentId }: { rideData: CreateRideRequest; parentId: string }) =>
      parentApi.createRide(rideData, parentId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.rides(data.parent_id) })
    },
  })
}

export const useParentRides = (
  parentId: string,
  status?: string,
  page: number = 1,
  limit: number = 20
) => {
  return useQuery({
    queryKey: parentKeys.rides(parentId, status),
    queryFn: () => parentApi.getRides(parentId, status, page, limit),
    enabled: !!parentId,
  })
}

export const useRideWithDriver = (rideId: string) => {
  return useQuery({
    queryKey: parentKeys.ride(rideId),
    queryFn: () => parentApi.getRideWithDriver(rideId),
    enabled: !!rideId,
    refetchInterval: 5000, // Refetch every 5 seconds for live updates
  })
}

export const useCancelRideByParent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ rideId, reason }: { rideId: string; reason: string }) =>
      parentApi.cancelRide(rideId, reason),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.rides(data.parent_id) })
      queryClient.invalidateQueries({ queryKey: parentKeys.ride(data.id) })
    },
  })
}

// Driver discovery hooks
export const useAvailableDriversForRide = (
  pickupLatitude: number,
  pickupLongitude: number,
  radiusKm: number = 10
) => {
  return useQuery({
    queryKey: parentKeys.availableDrivers(pickupLatitude, pickupLongitude, radiusKm),
    queryFn: () => parentApi.getAvailableDriversForRide(pickupLatitude, pickupLongitude, radiusKm),
    enabled: !!pickupLatitude && !!pickupLongitude,
    staleTime: 30 * 1000, // 30 seconds
  })
}

// Payment hooks
export const useParentPayments = (
  parentId: string,
  page: number = 1,
  limit: number = 20
) => {
  return useQuery({
    queryKey: parentKeys.payments(parentId),
    queryFn: () => parentApi.getPayments(parentId, page, limit),
    enabled: !!parentId,
  })
}

export const useProcessPayment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (paymentData: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) =>
      parentApi.processPayment(paymentData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.payments(data.parent_id) })
    },
  })
}

// Rating hooks
export const useRateDriver = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (ratingData: Omit<Rating, 'id' | 'created_at'>) =>
      parentApi.rateDriver(ratingData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.driverRatings(data.driver_id) })
      queryClient.invalidateQueries({ queryKey: ['driver'] })
    },
  })
}

export const useDriverRatings = (driverId: string) => {
  return useQuery({
    queryKey: parentKeys.driverRatings(driverId),
    queryFn: () => parentApi.getDriverRatings(driverId),
    enabled: !!driverId,
  })
}

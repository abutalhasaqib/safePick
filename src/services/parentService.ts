import { apiClient, supabaseFilters } from '../lib/api'
import {
  Parent,
  Child,
  Ride,
  Driver,
  Payment,
  Rating,
  CreateRideRequest,
  PaginatedResponse,
} from '../types/api'

export const parentApi = {
  // Get parent profile
  getParentProfile: async (userId: string): Promise<Parent> => {
    const params = supabaseFilters.eq('user_id', userId)
    const response = await apiClient.get<Parent[]>(`/parents?${params}&${supabaseFilters.limit(1)}`)
    return response[0]
  },

  // Create parent profile
  createParentProfile: async (parentData: Omit<Parent, 'id' | 'created_at' | 'updated_at'>): Promise<Parent> => {
    return apiClient.post<Parent>('/parents', parentData)
  },

  // Update parent profile
  updateParentProfile: async (parentId: string, parentData: Partial<Parent>): Promise<Parent> => {
    const params = supabaseFilters.eq('id', parentId)
    const response = await apiClient.patch<Parent[]>(`/parents?${params}`, parentData)
    return response[0]
  },

  // Get children
  getChildren: async (parentId: string): Promise<Child[]> => {
    const params = [
      supabaseFilters.eq('parent_id', parentId),
      supabaseFilters.eq('is_active', true),
      supabaseFilters.order('created_at', false),
    ].join('&')
    
    return apiClient.get<Child[]>(`/children?${params}`)
  },

  // Add child
  addChild: async (childData: Omit<Child, 'id' | 'created_at' | 'updated_at'>): Promise<Child> => {
    return apiClient.post<Child>('/children', childData)
  },

  // Update child
  updateChild: async (childId: string, childData: Partial<Child>): Promise<Child> => {
    const params = supabaseFilters.eq('id', childId)
    const response = await apiClient.patch<Child[]>(`/children?${params}`, childData)
    return response[0]
  },

  // Delete child (soft delete by setting is_active to false)
  deleteChild: async (childId: string): Promise<void> => {
    const params = supabaseFilters.eq('id', childId)
    await apiClient.patch(`/children?${params}`, {
      is_active: false,
      updated_at: new Date().toISOString(),
    })
  },

  // Create ride request
  createRide: async (rideData: CreateRideRequest, parentId: string): Promise<Ride> => {
    const ride = {
      ...rideData,
      parent_id: parentId,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
    }
    return apiClient.post<Ride>('/rides', ride)
  },

  // Get rides
  getRides: async (
    parentId: string,
    status?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Ride>> => {
    const filters = [supabaseFilters.eq('parent_id', parentId)]
    
    if (status) {
      filters.push(supabaseFilters.eq('status', status))
    }
    
    filters.push(supabaseFilters.order('created_at', false))
    filters.push(supabaseFilters.limit(limit))
    filters.push(supabaseFilters.offset((page - 1) * limit))
    
    const params = filters.join('&')
    const rides = await apiClient.get<Ride[]>(`/rides?${params}`)
    
    // Get total count for pagination
    let countParams = supabaseFilters.eq('parent_id', parentId)
    if (status) {
      countParams += `&${supabaseFilters.eq('status', status)}`
    }
    const countResponse = await apiClient.get<{ count: number }>(`/rides?${countParams}&select=count()`)
    
    return {
      data: rides,
      count: countResponse.count,
      page,
      limit,
      total_pages: Math.ceil(countResponse.count / limit),
    }
  },

  // Get ride details with driver info
  getRideWithDriver: async (rideId: string): Promise<Ride & { driver?: Driver }> => {
    const rideParams = supabaseFilters.eq('id', rideId)
    const ride = await apiClient.get<Ride[]>(`/rides?${rideParams}&${supabaseFilters.limit(1)}`)
    
    if (ride[0]?.driver_id) {
      const driverParams = supabaseFilters.eq('id', ride[0].driver_id)
      const driver = await apiClient.get<Driver[]>(`/drivers?${driverParams}&${supabaseFilters.limit(1)}`)
      return { ...ride[0], driver: driver[0] }
    }
    
    return ride[0]
  },

  // Cancel ride
  cancelRide: async (rideId: string, reason: string): Promise<Ride> => {
    const params = supabaseFilters.eq('id', rideId)
    const response = await apiClient.patch<Ride[]>(`/rides?${params}`, {
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      cancellation_reason: reason,
      updated_at: new Date().toISOString(),
    })
    return response[0]
  },

  // Get available drivers for a ride
  getAvailableDriversForRide: async (
    pickupLatitude: number,
    pickupLongitude: number,
    radiusKm: number = 10
  ): Promise<Driver[]> => {
    // This would typically use a geographic query function in Supabase
    const params = [
      supabaseFilters.eq('is_available', true),
      supabaseFilters.eq('verification_status', 'verified'),
      supabaseFilters.order('rating', false),
    ].join('&')
    
    return apiClient.get<Driver[]>(`/drivers?${params}`)
  },

  // Get payments
  getPayments: async (
    parentId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Payment>> => {
    const filters = [
      supabaseFilters.eq('parent_id', parentId),
      supabaseFilters.order('created_at', false),
      supabaseFilters.limit(limit),
      supabaseFilters.offset((page - 1) * limit),
    ]
    
    const params = filters.join('&')
    const payments = await apiClient.get<Payment[]>(`/payments?${params}`)
    
    // Get total count for pagination
    const countParams = supabaseFilters.eq('parent_id', parentId)
    const countResponse = await apiClient.get<{ count: number }>(`/payments?${countParams}&select=count()`)
    
    return {
      data: payments,
      count: countResponse.count,
      page,
      limit,
      total_pages: Math.ceil(countResponse.count / limit),
    }
  },

  // Process payment
  processPayment: async (paymentData: Omit<Payment, 'id' | 'created_at' | 'updated_at'>): Promise<Payment> => {
    return apiClient.post<Payment>('/payments', paymentData)
  },

  // Rate driver
  rateDriver: async (ratingData: Omit<Rating, 'id' | 'created_at'>): Promise<Rating> => {
    return apiClient.post<Rating>('/ratings', ratingData)
  },

  // Get ratings for a driver
  getDriverRatings: async (driverId: string): Promise<Rating[]> => {
    const params = [
      supabaseFilters.eq('driver_id', driverId),
      supabaseFilters.order('created_at', false),
    ].join('&')
    
    return apiClient.get<Rating[]>(`/ratings?${params}`)
  },
}

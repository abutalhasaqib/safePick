import { apiClient, supabaseFilters } from '../lib/api'
import {
  Driver,
  DriverEarnings,
  Ride,
  PaginatedResponse,
} from '../types/api'

export const driverApi = {
  // Get driver profile
  getDriverProfile: async (userId: string): Promise<Driver> => {
    const params = supabaseFilters.eq('user_id', userId)
    const response = await apiClient.get<Driver[]>(`/drivers?${params}&${supabaseFilters.limit(1)}`)
    return response[0]
  },

  // Create driver profile
  createDriverProfile: async (driverData: Omit<Driver, 'id' | 'created_at' | 'updated_at'>): Promise<Driver> => {
    return apiClient.post<Driver>('/drivers', driverData)
  },

  // Update driver profile
  updateDriverProfile: async (driverId: string, driverData: Partial<Driver>): Promise<Driver> => {
    const params = supabaseFilters.eq('id', driverId)
    const response = await apiClient.patch<Driver[]>(`/drivers?${params}`, driverData)
    return response[0]
  },

  // Update driver location
  updateLocation: async (driverId: string, latitude: number, longitude: number): Promise<void> => {
    const params = supabaseFilters.eq('id', driverId)
    await apiClient.patch(`/drivers?${params}`, {
      current_latitude: latitude,
      current_longitude: longitude,
      updated_at: new Date().toISOString(),
    })
  },

  // Update driver availability
  updateAvailability: async (driverId: string, isAvailable: boolean): Promise<void> => {
    const params = supabaseFilters.eq('id', driverId)
    await apiClient.patch(`/drivers?${params}`, {
      is_available: isAvailable,
      updated_at: new Date().toISOString(),
    })
  },

  // Get available drivers near location
  getAvailableDrivers: async (
    latitude: number,
    longitude: number,
    radiusKm: number = 10
  ): Promise<Driver[]> => {
    // Note: This would require a custom RPC function in Supabase for geographic queries
    // For now, we'll get all available drivers and filter client-side
    const params = [
      supabaseFilters.eq('is_available', true),
      supabaseFilters.eq('verification_status', 'verified'),
    ].join('&')
    
    return apiClient.get<Driver[]>(`/drivers?${params}`)
  },

  // Get driver earnings
  getDriverEarnings: async (
    driverId: string,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<DriverEarnings>> => {
    const filters = [supabaseFilters.eq('driver_id', driverId)]
    
    if (startDate) {
      filters.push(supabaseFilters.gte('created_at', startDate))
    }
    if (endDate) {
      filters.push(supabaseFilters.lte('created_at', endDate))
    }
    
    filters.push(supabaseFilters.order('created_at', false))
    filters.push(supabaseFilters.limit(limit))
    filters.push(supabaseFilters.offset((page - 1) * limit))
    
    const params = filters.join('&')
    const earnings = await apiClient.get<DriverEarnings[]>(`/driver_earnings?${params}`)
    
    // Get total count for pagination
    const countParams = supabaseFilters.eq('driver_id', driverId)
    const countResponse = await apiClient.get<{ count: number }>(`/driver_earnings?${countParams}&select=count()`)
    
    return {
      data: earnings,
      count: countResponse.count,
      page,
      limit,
      total_pages: Math.ceil(countResponse.count / limit),
    }
  },

  // Get driver rides
  getDriverRides: async (
    driverId: string,
    status?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Ride>> => {
    const filters = [supabaseFilters.eq('driver_id', driverId)]
    
    if (status) {
      filters.push(supabaseFilters.eq('status', status))
    }
    
    filters.push(supabaseFilters.order('created_at', false))
    filters.push(supabaseFilters.limit(limit))
    filters.push(supabaseFilters.offset((page - 1) * limit))
    
    const params = filters.join('&')
    const rides = await apiClient.get<Ride[]>(`/rides?${params}`)
    
    // Get total count for pagination
    let countParams = supabaseFilters.eq('driver_id', driverId)
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

  // Accept ride request
  acceptRide: async (rideId: string, driverId: string): Promise<Ride> => {
    const params = supabaseFilters.eq('id', rideId)
    const response = await apiClient.patch<Ride[]>(`/rides?${params}`, {
      driver_id: driverId,
      status: 'accepted',
      updated_at: new Date().toISOString(),
    })
    return response[0]
  },

  // Start ride
  startRide: async (rideId: string): Promise<Ride> => {
    const params = supabaseFilters.eq('id', rideId)
    const response = await apiClient.patch<Ride[]>(`/rides?${params}`, {
      status: 'in_progress',
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    return response[0]
  },

  // Complete ride
  completeRide: async (rideId: string): Promise<Ride> => {
    const params = supabaseFilters.eq('id', rideId)
    const response = await apiClient.patch<Ride[]>(`/rides?${params}`, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    return response[0]
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
}

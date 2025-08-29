import { apiClient, supabaseFilters } from '../lib/api'
import {
  Notification,
  PaginatedResponse,
} from '../types/api'

export const notificationApi = {
  // Get notifications for user
  getNotifications: async (
    userId: string,
    page: number = 1,
    limit: number = 20,
    unreadOnly: boolean = false
  ): Promise<PaginatedResponse<Notification>> => {
    const filters = [supabaseFilters.eq('user_id', userId)]
    
    if (unreadOnly) {
      filters.push(supabaseFilters.eq('is_read', false))
    }
    
    filters.push(supabaseFilters.order('created_at', false))
    filters.push(supabaseFilters.limit(limit))
    filters.push(supabaseFilters.offset((page - 1) * limit))
    
    const params = filters.join('&')
    const notifications = await apiClient.get<Notification[]>(`/notifications?${params}`)
    
    // Get total count for pagination
    let countParams = supabaseFilters.eq('user_id', userId)
    if (unreadOnly) {
      countParams += `&${supabaseFilters.eq('is_read', false)}`
    }
    const countResponse = await apiClient.get<{ count: number }>(`/notifications?${countParams}&select=count()`)
    
    return {
      data: notifications,
      count: countResponse.count,
      page,
      limit,
      total_pages: Math.ceil(countResponse.count / limit),
    }
  },

  // Get unread notification count
  getUnreadCount: async (userId: string): Promise<number> => {
    const params = [
      supabaseFilters.eq('user_id', userId),
      supabaseFilters.eq('is_read', false),
    ].join('&')
    
    const response = await apiClient.get<{ count: number }>(`/notifications?${params}&select=count()`)
    return response.count
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<void> => {
    const params = supabaseFilters.eq('id', notificationId)
    await apiClient.patch(`/notifications?${params}`, {
      is_read: true,
      updated_at: new Date().toISOString(),
    })
  },

  // Mark all notifications as read
  markAllAsRead: async (userId: string): Promise<void> => {
    const params = supabaseFilters.eq('user_id', userId)
    await apiClient.patch(`/notifications?${params}`, {
      is_read: true,
      updated_at: new Date().toISOString(),
    })
  },

  // Create notification (typically used by backend, but included for completeness)
  createNotification: async (notificationData: Omit<Notification, 'id' | 'created_at'>): Promise<Notification> => {
    return apiClient.post<Notification>('/notifications', notificationData)
  },

  // Delete notification
  deleteNotification: async (notificationId: string): Promise<void> => {
    const params = supabaseFilters.eq('id', notificationId)
    await apiClient.delete(`/notifications?${params}`)
  },

  // Delete all notifications for user
  deleteAllNotifications: async (userId: string): Promise<void> => {
    const params = supabaseFilters.eq('user_id', userId)
    await apiClient.delete(`/notifications?${params}`)
  },
}

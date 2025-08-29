import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationApi } from '../services/notificationService'
import { Notification } from '../types/api'

// Query keys
export const notificationKeys = {
  all: ['notifications'] as const,
  list: (userId: string, unreadOnly?: boolean) => [...notificationKeys.all, 'list', userId, unreadOnly] as const,
  unreadCount: (userId: string) => [...notificationKeys.all, 'unread-count', userId] as const,
}

// Notification hooks
export const useNotifications = (
  userId: string,
  page: number = 1,
  limit: number = 20,
  unreadOnly: boolean = false
) => {
  return useQuery({
    queryKey: notificationKeys.list(userId, unreadOnly),
    queryFn: () => notificationApi.getNotifications(userId, page, limit, unreadOnly),
    enabled: !!userId,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  })
}

export const useUnreadNotificationCount = (userId: string) => {
  return useQuery({
    queryKey: notificationKeys.unreadCount(userId),
    queryFn: () => notificationApi.getUnreadCount(userId),
    enabled: !!userId,
    refetchInterval: 15 * 1000, // Refetch every 15 seconds
  })
}

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (notificationId: string) => notificationApi.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all })
    },
  })
}

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userId: string) => notificationApi.markAllAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all })
    },
  })
}

export const useCreateNotification = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (notificationData: Omit<Notification, 'id' | 'created_at'>) =>
      notificationApi.createNotification(notificationData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list(data.user_id) })
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount(data.user_id) })
    },
  })
}

export const useDeleteNotification = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (notificationId: string) => notificationApi.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all })
    },
  })
}

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userId: string) => notificationApi.deleteAllNotifications(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all })
    },
  })
}

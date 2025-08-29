import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi, profileApi } from '../services/authService'
import { User, UserProfile, CreateUserRequest, UpdateProfileRequest } from '../types/api'

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  profile: (userId: string) => [...authKeys.all, 'profile', userId] as const,
}

// Auth hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.user(), data.user)
      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userData: CreateUserRequest) => authApi.register(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear()
      localStorage.removeItem('supabase_token')
    },
  })
}

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (password: string) => authApi.updatePassword(password),
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.resetPassword(email),
  })
}

// Profile hooks
export const useProfile = (userId: string) => {
  return useQuery({
    queryKey: authKeys.profile(userId),
    queryFn: () => profileApi.getProfile(userId),
    enabled: !!userId,
  })
}

export const useCreateProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (profileData: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) =>
      profileApi.createProfile(profileData),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.profile(data.user_id), data)
      queryClient.invalidateQueries({ queryKey: authKeys.profile(data.user_id) })
    },
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, profileData }: { userId: string; profileData: UpdateProfileRequest }) =>
      profileApi.updateProfile(userId, profileData),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.profile(data.user_id), data)
      queryClient.invalidateQueries({ queryKey: authKeys.profile(data.user_id) })
    },
  })
}

export const useDeleteProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userId: string) => profileApi.deleteProfile(userId),
    onSuccess: (_, userId) => {
      queryClient.removeQueries({ queryKey: authKeys.profile(userId) })
      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
  })
}

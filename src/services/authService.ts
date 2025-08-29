import { apiClient, supabaseFilters } from '../lib/api'
import {
  User,
  UserProfile,
  CreateUserRequest,
  UpdateProfileRequest,
} from '../types/api'

export const authApi = {
  // Register new user
  register: async (userData: CreateUserRequest): Promise<User> => {
    return apiClient.post('/auth/v1/signup', userData)
  },

  // Login user
  login: async (email: string, password: string): Promise<{ user: User; access_token: string }> => {
    const response = await apiClient.post<{ user: User; access_token: string }>('/auth/v1/token?grant_type=password', {
      email,
      password,
    })
    
    // Store token in localStorage
    if (response.access_token) {
      localStorage.setItem('supabase_token', response.access_token)
    }
    
    return response
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/v1/logout')
    localStorage.removeItem('supabase_token')
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get('/auth/v1/user')
  },

  // Update user password
  updatePassword: async (password: string): Promise<void> => {
    return apiClient.put('/auth/v1/user', { password })
  },

  // Reset password
  resetPassword: async (email: string): Promise<void> => {
    return apiClient.post('/auth/v1/recover', { email })
  },
}

export const profileApi = {
  // Get user profile
  getProfile: async (userId: string): Promise<UserProfile> => {
    const params = supabaseFilters.eq('user_id', userId)
    const response = await apiClient.get<UserProfile[]>(`/profiles?${params}&${supabaseFilters.limit(1)}`)
    return response[0]
  },

  // Create user profile
  createProfile: async (profileData: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>): Promise<UserProfile> => {
    return apiClient.post('/profiles', profileData)
  },

  // Update user profile
  updateProfile: async (userId: string, profileData: UpdateProfileRequest): Promise<UserProfile> => {
    const params = supabaseFilters.eq('user_id', userId)
    const response = await apiClient.patch<UserProfile[]>(`/profiles?${params}`, profileData)
    return response[0]
  },

  // Delete user profile
  deleteProfile: async (userId: string): Promise<void> => {
    const params = supabaseFilters.eq('user_id', userId)
    return apiClient.delete(`/profiles?${params}`)
  },
}

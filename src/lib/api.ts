import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// Types for API responses
export interface ApiResponse<T = any> {
  data: T
  message?: string
  error?: string
}

export interface SupabaseError {
  message: string
  details?: string
  hint?: string
  code?: string
}

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// S3 Storage configuration
const SUPABASE_S3_URL = import.meta.env.VITE_SUPABASE_S3_URL
const S3_ACCESS_KEY = import.meta.env.VITE_S3_ACCESS_KEY
const S3_SECRET_KEY = import.meta.env.VITE_S3_SECRET_KEY
const S3_REGION = import.meta.env.VITE_S3_REGION

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

// Create axios instance for Supabase REST API
export const supabaseApi: AxiosInstance = axios.create({
  baseURL: `${SUPABASE_URL}`,
  headers: {
    'apikey': SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation', // Return the full object representation
  },
})

// Request interceptor to add auth token
supabaseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('supabase_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
supabaseApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('supabase_token')
      // You might want to redirect to login or refresh token here
    }
    
    // Transform Supabase error format
    const supabaseError: SupabaseError = {
      message: error.response?.data?.message || error.message,
      details: error.response?.data?.details,
      hint: error.response?.data?.hint,
      code: error.response?.data?.code,
    }
    
    return Promise.reject(supabaseError)
  }
)

// Generic API methods
export const apiClient = {
  // GET request
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await supabaseApi.get<T>(url, config)
    return response.data
  },

  // POST request
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await supabaseApi.post<T>(url, data, config)
    return response.data
  },

  // PUT request
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await supabaseApi.put<T>(url, data, config)
    return response.data
  },

  // PATCH request
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await supabaseApi.patch<T>(url, data, config)
    return response.data
  },

  // DELETE request
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await supabaseApi.delete<T>(url, config)
    return response.data
  },
}

// Utility functions for Supabase filters
export const supabaseFilters = {
  eq: (column: string, value: any) => `${column}=eq.${value}`,
  neq: (column: string, value: any) => `${column}=neq.${value}`,
  gt: (column: string, value: any) => `${column}=gt.${value}`,
  gte: (column: string, value: any) => `${column}=gte.${value}`,
  lt: (column: string, value: any) => `${column}=lt.${value}`,
  lte: (column: string, value: any) => `${column}=lte.${value}`,
  like: (column: string, value: string) => `${column}=like.${value}`,
  ilike: (column: string, value: string) => `${column}=ilike.${value}`,
  in: (column: string, values: any[]) => `${column}=in.(${values.join(',')})`,
  is: (column: string, value: 'null' | 'true' | 'false') => `${column}=is.${value}`,
  order: (column: string, ascending = true) => `order=${column}.${ascending ? 'asc' : 'desc'}`,
  limit: (count: number) => `limit=${count}`,
  offset: (count: number) => `offset=${count}`,
  select: (columns: string[]) => `select=${columns.join(',')}`,
}

// Storage utilities
export const storageClient = {
  // Upload file to Supabase storage
  uploadFile: async (bucket: string, path: string, file: File): Promise<{ path: string; publicUrl: string }> => {
    const formData = new FormData()
    formData.append('', file)
    
    const response = await supabaseApi.post(`/storage/v1/object/${bucket}/${path}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
    return { path, publicUrl }
  },

  // Get public URL for a file
  getPublicUrl: (bucket: string, path: string): string => {
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
  },

  // Delete file from storage
  deleteFile: async (bucket: string, path: string): Promise<void> => {
    await supabaseApi.delete(`/storage/v1/object/${bucket}/${path}`)
  },

  // List files in a bucket
  listFiles: async (bucket: string, prefix?: string): Promise<any[]> => {
    const params = prefix ? `?prefix=${prefix}` : ''
    const response = await supabaseApi.get<any[]>(`/storage/v1/object/list/${bucket}${params}`)
    return response.data
  },
}

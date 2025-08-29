// User types
export interface User {
  id: string
  email: string
  role: 'parent' | 'driver'
  full_name?: string
  phone?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  phone: string
  date_of_birth?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  emergency_contact?: string
  emergency_phone?: string
  created_at: string
  updated_at: string
}

// Driver types
export interface Driver {
  id: string
  user_id: string
  license_number: string
  license_expiry: string
  vehicle_make: string
  vehicle_model: string
  vehicle_year: number
  vehicle_plate: string
  vehicle_color: string
  insurance_provider: string
  insurance_policy: string
  insurance_expiry: string
  background_check_status: 'pending' | 'approved' | 'rejected'
  driving_record_status: 'pending' | 'approved' | 'rejected'
  verification_status: 'pending' | 'verified' | 'rejected'
  is_available: boolean
  current_latitude?: number
  current_longitude?: number
  rating: number
  total_rides: number
  created_at: string
  updated_at: string
}

export interface DriverEarnings {
  id: string
  driver_id: string
  ride_id: string
  base_fare: number
  distance_fee: number
  time_fee: number
  tips: number
  total_amount: number
  commission_rate: number
  commission_amount: number
  net_earnings: number
  payment_status: 'pending' | 'paid'
  created_at: string
}

// Parent types
export interface Parent {
  id: string
  user_id: string
  subscription_plan: 'basic' | 'premium' | 'family'
  subscription_status: 'active' | 'inactive' | 'cancelled'
  payment_method_id?: string
  created_at: string
  updated_at: string
}

export interface Child {
  id: string
  parent_id: string
  first_name: string
  last_name: string
  age: number
  school_name?: string
  school_address?: string
  pickup_address: string
  dropoff_address: string
  special_instructions?: string
  emergency_contact: string
  emergency_phone: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Ride types
export interface Ride {
  id: string
  parent_id: string
  driver_id?: string
  child_id: string
  pickup_address: string
  pickup_latitude: number
  pickup_longitude: number
  dropoff_address: string
  dropoff_latitude: number
  dropoff_longitude: number
  scheduled_time: string
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
  distance_km: number
  estimated_duration: number
  base_fare: number
  total_fare: number
  special_instructions?: string
  created_at: string
  updated_at: string
  started_at?: string
  completed_at?: string
  cancelled_at?: string
  cancellation_reason?: string
}

export interface RideTracking {
  id: string
  ride_id: string
  driver_latitude: number
  driver_longitude: number
  speed: number
  heading: number
  timestamp: string
}

// Payment types
export interface Payment {
  id: string
  ride_id: string
  parent_id: string
  driver_id: string
  amount: number
  payment_method: 'card' | 'wallet' | 'cash'
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  transaction_id?: string
  created_at: string
  updated_at: string
}

// Notification types
export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'ride_request' | 'ride_update' | 'payment' | 'system' | 'promotion'
  is_read: boolean
  data?: Record<string, any>
  created_at: string
}

// Rating types
export interface Rating {
  id: string
  ride_id: string
  parent_id: string
  driver_id: string
  rating: number
  comment?: string
  created_at: string
}

// API request/response types
export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  total_pages: number
}

export interface CreateUserRequest {
  email: string
  password: string
  role: 'parent' | 'driver'
  full_name?: string
}

export interface UpdateProfileRequest {
  first_name?: string
  last_name?: string
  phone?: string
  date_of_birth?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  emergency_contact?: string
  emergency_phone?: string
}

export interface CreateRideRequest {
  child_id: string
  pickup_address: string
  pickup_latitude: number
  pickup_longitude: number
  dropoff_address: string
  dropoff_latitude: number
  dropoff_longitude: number
  scheduled_time: string
  special_instructions?: string
}

export interface UpdateRideStatusRequest {
  status: 'accepted' | 'in_progress' | 'completed' | 'cancelled'
  driver_id?: string
  cancellation_reason?: string
}

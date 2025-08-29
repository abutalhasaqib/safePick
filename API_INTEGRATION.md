# SafePick API Integration with React Query

This documentation covers the implementation of Supabase REST API integration using React Query in the SafePick application.

## Setup

### 1. Environment Variables

Create a `.env` file in your project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Dependencies

The following packages are already installed:
- `@tanstack/react-query` - For data fetching and state management
- `@tanstack/react-query-devtools` - For debugging React Query
- `axios` - For HTTP requests

## Architecture

### Core Files

1. **`src/lib/queryClient.ts`** - React Query configuration
2. **`src/lib/api.ts`** - Axios configuration and Supabase REST API client
3. **`src/types/api.ts`** - TypeScript types for all API entities
4. **`src/services/`** - API service functions organized by domain
5. **`src/hooks/`** - Custom React Query hooks for components

### Services

- **`authService.ts`** - Authentication and user profile management
- **`driverService.ts`** - Driver-specific operations
- **`parentService.ts`** - Parent-specific operations
- **`notificationService.ts`** - Notification management

### Custom Hooks

- **`useAuth.ts`** - Authentication hooks (login, register, profile)
- **`useDriver.ts`** - Driver-related hooks (rides, earnings, availability)
- **`useParent.ts`** - Parent-related hooks (children, rides, payments)
- **`useNotifications.ts`** - Notification hooks

## Usage Examples

### Authentication

```tsx
import { useLogin, useCurrentUser, useProfile } from '../hooks/useAuth'

function LoginComponent() {
  const loginMutation = useLogin()
  const { data: user } = useCurrentUser()
  const { data: profile } = useProfile(user?.id || '')

  const handleLogin = async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ email, password })
      // User is now logged in
    } catch (error) {
      // Handle error
    }
  }

  return (
    // Your login form JSX
  )
}
```

### Parent Operations

```tsx
import { useChildren, useCreateRide, useParentRides } from '../hooks/useParent'

function ParentDashboard() {
  const { data: children } = useChildren(parentId)
  const { data: rides } = useParentRides(parentId)
  const createRideMutation = useCreateRide()

  const handleCreateRide = async (childId: string) => {
    await createRideMutation.mutateAsync({
      rideData: {
        child_id: childId,
        pickup_address: '123 Home St',
        pickup_latitude: 40.7128,
        pickup_longitude: -74.0060,
        dropoff_address: '456 School Ave',
        dropoff_latitude: 40.7589,
        dropoff_longitude: -73.9851,
        scheduled_time: new Date().toISOString(),
      },
      parentId: parentId
    })
  }

  return (
    // Your dashboard JSX
  )
}
```

### Driver Operations

```tsx
import { useDriverRides, useAcceptRide, useUpdateDriverAvailability } from '../hooks/useDriver'

function DriverDashboard() {
  const { data: rides } = useDriverRides(driverId)
  const acceptRideMutation = useAcceptRide()
  const updateAvailabilityMutation = useUpdateDriverAvailability()

  const handleAcceptRide = async (rideId: string) => {
    await acceptRideMutation.mutateAsync({ rideId, driverId })
  }

  const toggleAvailability = async (isAvailable: boolean) => {
    await updateAvailabilityMutation.mutateAsync({ driverId, isAvailable })
  }

  return (
    // Your dashboard JSX
  )
}
```

### Real-time Updates

For real-time features, the hooks are configured with automatic refetching:

- **Ride tracking**: `useRideWithDriver` refetches every 5 seconds
- **Notifications**: `useNotifications` refetches every 30 seconds
- **Available drivers**: `useAvailableDrivers` has a 30-second stale time

## API Endpoints

The integration uses Supabase REST API endpoints:

### Authentication
- `POST /auth/v1/signup` - Register
- `POST /auth/v1/token` - Login
- `POST /auth/v1/logout` - Logout
- `GET /auth/v1/user` - Get current user

### Data Tables
- `/profiles` - User profiles
- `/drivers` - Driver information
- `/parents` - Parent information
- `/children` - Children data
- `/rides` - Ride requests and status
- `/driver_earnings` - Driver earnings
- `/payments` - Payment transactions
- `/ratings` - Driver ratings
- `/notifications` - User notifications

## Query Keys

React Query uses structured query keys for efficient caching:

```tsx
// Auth keys
['auth', 'user']
['auth', 'profile', userId]

// Driver keys
['driver', 'profile', userId]
['driver', 'rides', driverId, status]
['driver', 'earnings', driverId, startDate, endDate]

// Parent keys
['parent', 'children', parentId]
['parent', 'rides', parentId, status]
['parent', 'payments', parentId]
```

## Error Handling

The API client includes automatic error handling:

- **401 Unauthorized**: Automatically removes token and redirects to login
- **Supabase errors**: Transformed into consistent error format
- **Network errors**: Handled with retry logic (3 retries for queries, 1 for mutations)

## Best Practices

1. **Always use the custom hooks** instead of calling service functions directly
2. **Handle loading and error states** in your components
3. **Use optimistic updates** for better UX where appropriate
4. **Invalidate related queries** after mutations to keep data fresh
5. **Use pagination** for large data sets
6. **Implement proper TypeScript types** for all API responses

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in your Supabase project URL and anon key
3. Ensure your Supabase database has the required tables and RLS policies
4. Test the connection by running the development server

## Database Schema

Make sure your Supabase database includes these tables:
- `profiles`
- `drivers`
- `parents`
- `children`
- `rides`
- `driver_earnings`
- `payments`
- `ratings`
- `notifications`

Each table should have appropriate Row Level Security (RLS) policies for your authentication requirements.

## Development Tools

- **React Query Devtools**: Available in development mode for debugging queries
- **Error boundaries**: Implement error boundaries to catch and handle API errors gracefully
- **Loading states**: All hooks provide `isLoading`, `isPending`, and `isError` states

This setup provides a robust, type-safe, and efficient way to integrate with Supabase REST APIs while maintaining excellent developer experience with React Query's powerful caching and synchronization features.

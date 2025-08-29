import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import { router } from './router'
import { RoleProvider } from './shared/role'
import { KYCProvider } from './shared/kyc'
import { queryClient } from './lib/queryClient'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoleProvider>
        <KYCProvider>
          <RouterProvider router={router} />
        </KYCProvider>
      </RoleProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)

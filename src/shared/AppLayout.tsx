import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../ui/Navbar'
import Sidebar from '../ui/Sidebar'
import Footer from '../ui/Footer'
import { useRole } from './role'
import { Link } from 'react-router-dom'
import ToastProvider from '../ui/ToastProvider'
import BottomMenu from '../ui/BottomMenu'

export default function AppLayout() {
  const { role } = useRole()
  const { pathname } = useLocation()
  const isGuest = role === 'guest'
  const isAuthScreen = pathname === '/' || pathname.startsWith('/login')
  const shouldHideSidebar = isGuest || isAuthScreen
  return (
    <div className={`min-h-screen ${isAuthScreen ? 'grid grid-rows-[1fr,auto]' : 'grid grid-rows-[auto,1fr,auto]'} bg-background text-foreground`}>
      {!isAuthScreen && <Navbar />}
      <div className="container grid grid-cols-12 gap-4 sm:gap-6 py-4 sm:py-6">
        {!shouldHideSidebar && (
          <aside className="hidden lg:block col-span-3 xl:col-span-2 order-2 md:order-1">
            <Sidebar />
          </aside>
        )}
        <main className={`${shouldHideSidebar ? 'col-span-12' : 'col-span-12 lg:col-span-9 xl:col-span-10'} order-1 md:order-2`}>
          <Outlet />
          {isGuest && (
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Please <Link className="underline" to="/">sign in</Link> to continue.
            </div>
          )}
        </main>
      </div>
      <Footer />
      <ToastProvider />
  <BottomMenu />
    </div>
  )
}

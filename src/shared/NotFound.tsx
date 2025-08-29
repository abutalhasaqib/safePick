import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function NotFound() {
  const err = useRouteError()
  const isResp = isRouteErrorResponse(err)
  return (
    <div className="container py-16 text-center">
      <h1 className="text-3xl font-semibold">{isResp ? err.status : 404} – Page Not Found</h1>
      <p className="text-slate-600 dark:text-slate-300 mt-2">Let’s get you back to safety.</p>
      <Link to="/" className="inline-flex mt-6 px-4 py-2 rounded-xl bg-primary text-slate-900 font-medium">Go Home</Link>
    </div>
  )
}

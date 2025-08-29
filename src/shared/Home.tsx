import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl p-6 shadow-soft bg-card">
        <h1 className="text-2xl font-semibold">Welcome to SafePick</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">Your child’s safety is our priority.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 shadow-soft bg-card">
          <h2 className="text-xl font-semibold">I’m a Parent</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Find and hire verified drivers for monthly pick & drop.</p>
          <Link to="/parent" className="inline-flex mt-4 px-4 py-2 rounded-xl bg-primary text-slate-900 font-medium hover:opacity-90">Go to Parent Portal</Link>
        </div>
        <div className="rounded-2xl p-6 shadow-soft bg-card">
          <h2 className="text-xl font-semibold">I’m a Driver</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Complete KYC, set your route and accept requests.</p>
          <Link to="/driver" className="inline-flex mt-4 px-4 py-2 rounded-xl bg-secondary text-slate-900 font-medium hover:opacity-90">Go to Driver Portal</Link>
        </div>
      </div>
    </div>
  )
}

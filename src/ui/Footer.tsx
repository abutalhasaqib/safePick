export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-6 text-sm text-slate-600 dark:text-slate-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} SafePick · Your child’s safety is our priority.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Helpline</a>
          <a href="#" className="hover:underline">FAQs</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
      </div>
    </footer>
  )
}

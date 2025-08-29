import { Card, Button } from '../../../ui/primitives'
import { toast } from 'sonner'
import PageHeader from '../../../ui/PageHeader'

export default function Payments(){
  const invoices = [
    { id: 'INV-1007', date: '05 Aug 2025', amount: 3600, status: 'Paid' },
    { id: 'INV-1006', date: '05 Jul 2025', amount: 3600, status: 'Paid' },
    { id: 'INV-1005', date: '05 Jun 2025', amount: 3600, status: 'Paid' },
  ]
  return (
    <div className="space-y-6">
      <PageHeader title="Payments" />
      
      <div className="space-y-4">
      <Card className="p-6">
        <h2 className="font-semibold">Payment Methods</h2>
        <div className="mt-3 flex gap-2">
          <Button onClick={()=>toast.success('Subscription activated for Ramesh Kumar. Bismillah — you’re set!')}>Pay with UPI</Button>
          <Button variant="secondary" onClick={()=>toast.error('Payment failed. Please retry.')}>Pay with Card</Button>
        </div>
      </Card>
      <Card className="p-0">
        <div className="p-6">
          <h2 className="font-semibold">Invoices</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">Download PDF invoices.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[560px] w-full text-sm">
            <thead className="sticky top-0 bg-card">
              <tr className="text-left">
                <th className="py-2 px-4">Invoice</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="border-t">
                  <td className="py-2 px-4">{inv.id}</td>
                  <td className="py-2 px-4">{inv.date}</td>
                  <td className="py-2 px-4">₹{inv.amount.toLocaleString('en-IN')}</td>
                  <td className="py-2 px-4">{inv.status}</td>
                  <td className="py-2 px-4"><Button variant="outline">Download</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      </div>
    </div>
  )
}

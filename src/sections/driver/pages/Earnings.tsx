import { Card } from '../../../ui/primitives'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', amt: 500 },
  { day: 'Tue', amt: 650 },
  { day: 'Wed', amt: 700 },
  { day: 'Thu', amt: 400 },
  { day: 'Fri', amt: 800 },
  { day: 'Sat', amt: 550 },
]

export default function Earnings(){
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="font-semibold mb-2">Earnings (MTD)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day"/>
              <YAxis/>
              <Tooltip/>
              <Line type="monotone" dataKey="amt" stroke="#059669" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold mb-2">Statements</h2>
        <ul className="text-sm space-y-2">
          <li>Aug payout: ₹18,200 · 05 Sep</li>
          <li>Jul payout: ₹17,600 · 05 Aug</li>
        </ul>
      </Card>
    </div>
  )
}

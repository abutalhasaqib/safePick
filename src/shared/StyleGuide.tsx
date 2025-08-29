import { Card, Button, Badge, Input, Skeleton } from '../ui/primitives'

export default function StyleGuide(){
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold">Style Guide</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Colors, typography, components</p>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold">Buttons</h2>
        <div className="mt-3 flex gap-2 flex-wrap">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold">Inputs & Badges</h2>
        <div className="mt-3 flex items-center gap-3">
          <Input placeholder="Sample input" className="max-w-xs"/>
          <Badge>Default</Badge>
          <Badge color="verified">Verified</Badge>
          <Badge color="warning">Warning</Badge>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="font-semibold">Skeletons</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <Skeleton className="h-20"/>
          <Skeleton className="h-20"/>
          <Skeleton className="h-20"/>
        </div>
      </Card>
    </div>
  )
}

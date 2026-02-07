interface QuickStatsCardProps {
  title: string
  value: string
  description: string
  icon: string
}

export function QuickStatsCard({
  title,
  value,
  description,
  icon,
}: QuickStatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

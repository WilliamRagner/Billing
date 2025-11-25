interface CostDistributionChartProps {
  clientId: string
}

const distributionData: Record<string, { label: string; value: number; color: string }[]> = {
  "1": [
    { label: "Computação", value: 45, color: "bg-chart-1" },
    { label: "Storage", value: 25, color: "bg-chart-2" },
    { label: "Rede", value: 18, color: "bg-chart-3" },
    { label: "Outros", value: 12, color: "bg-chart-4" },
  ],
  "2": [
    { label: "Banco de Dados", value: 55, color: "bg-chart-1" },
    { label: "Computação", value: 30, color: "bg-chart-2" },
    { label: "Storage", value: 10, color: "bg-chart-3" },
    { label: "Outros", value: 5, color: "bg-chart-4" },
  ],
  "3": [
    { label: "Storage", value: 60, color: "bg-chart-1" },
    { label: "Computação", value: 25, color: "bg-chart-2" },
    { label: "CDN", value: 10, color: "bg-chart-3" },
    { label: "Outros", value: 5, color: "bg-chart-4" },
  ],
  "4": [
    { label: "Computação", value: 70, color: "bg-chart-1" },
    { label: "Storage", value: 15, color: "bg-chart-2" },
    { label: "Rede", value: 10, color: "bg-chart-3" },
    { label: "Outros", value: 5, color: "bg-chart-4" },
  ],
}

export function CostDistributionChart({ clientId }: CostDistributionChartProps) {
  const data = distributionData[clientId] || distributionData["1"]

  return (
    <div className="p-3 bg-card border border-border rounded-md h-full">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-2">Distribuição de Custos</p>

      {/* Horizontal Stacked Bar */}
      <div className="flex h-4 rounded overflow-hidden mb-2">
        {data.map((item, i) => (
          <div
            key={i}
            className={`${item.color} first:rounded-l last:rounded-r`}
            style={{ width: `${item.value}%` }}
            title={`${item.label}: ${item.value}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px]">
            <div className={`w-2 h-2 rounded-sm ${item.color}`} />
            <span className="text-muted-foreground truncate">{item.label}</span>
            <span className="font-mono text-foreground ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

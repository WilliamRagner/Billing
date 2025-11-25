import { TrendingUp, TrendingDown, DollarSign, Gauge, Server } from "lucide-react"

interface BillingKpisProps {
  clientId: string
}

const kpiData: Record<
  string,
  { total: number; projection: number; topResource: string; topResourceCost: number; trend: number }
> = {
  "1": { total: 4827.45, projection: 5200.0, topResource: "VM-PROD-01", topResourceCost: 1245.8, trend: 8.5 },
  "2": { total: 2156.32, projection: 2400.0, topResource: "DB-CLUSTER", topResourceCost: 890.0, trend: -3.2 },
  "3": { total: 8934.12, projection: 9500.0, topResource: "STORAGE-S3", topResourceCost: 2100.5, trend: 12.1 },
  "4": { total: 1523.89, projection: 1600.0, topResource: "VM-DEV-02", topResourceCost: 450.0, trend: 2.4 },
}

export function BillingKpis({ clientId }: BillingKpisProps) {
  const data = kpiData[clientId] || kpiData["1"]
  const isPositiveTrend = data.trend > 0

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-md">
        <div className="p-2 bg-primary/10 rounded">
          <DollarSign className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Custo Total (Mês)</p>
          <p className="text-lg font-semibold font-mono text-foreground">
            R$ {data.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className={`flex items-center gap-0.5 text-xs ${isPositiveTrend ? "text-destructive" : "text-accent"}`}>
          {isPositiveTrend ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span className="font-mono">{Math.abs(data.trend)}%</span>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-md">
        <div className="p-2 bg-warning/20 rounded">
          <Gauge className="h-4 w-4 text-warning-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Projeção (Fim do Mês)</p>
          <p className="text-lg font-semibold font-mono text-foreground">
            R$ {data.projection.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-md">
        <div className="p-2 bg-accent/10 rounded">
          <Server className="h-4 w-4 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Recurso Mais Caro</p>
          <p className="text-sm font-semibold text-foreground truncate">{data.topResource}</p>
          <p className="text-xs font-mono text-muted-foreground">
            R$ {data.topResourceCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  )
}

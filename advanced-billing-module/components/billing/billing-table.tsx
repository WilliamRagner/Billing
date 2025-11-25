"use client"

import { useState } from "react"
import { Search, Filter, Server, Database, HardDrive, Globe, Cloud, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BillingTableProps {
  clientId: string
}

const resourceTypes = {
  vm: { icon: Server, label: "VM", color: "bg-chart-1/20 text-chart-1" },
  db: { icon: Database, label: "Database", color: "bg-chart-2/20 text-chart-2" },
  storage: { icon: HardDrive, label: "Storage", color: "bg-chart-3/20 text-chart-3" },
  network: { icon: Globe, label: "Rede", color: "bg-chart-4/20 text-chart-4" },
  cloud: { icon: Cloud, label: "Cloud", color: "bg-chart-5/20 text-chart-5" },
}

type ResourceType = keyof typeof resourceTypes

interface BillingEntry {
  id: string
  date: string
  resourceId: string
  type: ResourceType
  contract: string
  usage: string
  unitPrice: number
  total: number
}

const mockData: Record<string, BillingEntry[]> = {
  "1": [
    {
      id: "1",
      date: "2024-01-15",
      resourceId: "VM-PROD-01",
      type: "vm",
      contract: "CTR-001",
      usage: "720h",
      unitPrice: 1.73,
      total: 1245.8,
    },
    {
      id: "2",
      date: "2024-01-15",
      resourceId: "DB-MYSQL-PROD",
      type: "db",
      contract: "CTR-001",
      usage: "1TB",
      unitPrice: 450.0,
      total: 450.0,
    },
    {
      id: "3",
      date: "2024-01-14",
      resourceId: "STORAGE-S3-01",
      type: "storage",
      contract: "CTR-002",
      usage: "500GB",
      unitPrice: 0.023,
      total: 345.0,
    },
    {
      id: "4",
      date: "2024-01-14",
      resourceId: "VM-STAGING-01",
      type: "vm",
      contract: "CTR-001",
      usage: "720h",
      unitPrice: 0.89,
      total: 640.8,
    },
    {
      id: "5",
      date: "2024-01-13",
      resourceId: "LB-PROD-01",
      type: "network",
      contract: "CTR-003",
      usage: "1TB",
      unitPrice: 0.12,
      total: 122.4,
    },
    {
      id: "6",
      date: "2024-01-13",
      resourceId: "CDN-ASSETS",
      type: "network",
      contract: "CTR-003",
      usage: "2TB",
      unitPrice: 0.085,
      total: 170.0,
    },
    {
      id: "7",
      date: "2024-01-12",
      resourceId: "BACKUP-DAILY",
      type: "storage",
      contract: "CTR-002",
      usage: "200GB",
      unitPrice: 0.05,
      total: 300.0,
    },
    {
      id: "8",
      date: "2024-01-12",
      resourceId: "VM-DEV-01",
      type: "vm",
      contract: "CTR-001",
      usage: "480h",
      unitPrice: 0.45,
      total: 216.0,
    },
    {
      id: "9",
      date: "2024-01-11",
      resourceId: "REDIS-CACHE",
      type: "db",
      contract: "CTR-001",
      usage: "8GB",
      unitPrice: 45.0,
      total: 360.0,
    },
    {
      id: "10",
      date: "2024-01-11",
      resourceId: "FUNCTIONS-01",
      type: "cloud",
      contract: "CTR-004",
      usage: "1M req",
      unitPrice: 0.2,
      total: 200.0,
    },
    {
      id: "11",
      date: "2024-01-10",
      resourceId: "VM-WORKER-01",
      type: "vm",
      contract: "CTR-001",
      usage: "720h",
      unitPrice: 0.65,
      total: 468.0,
    },
    {
      id: "12",
      date: "2024-01-10",
      resourceId: "POSTGRES-REPLICA",
      type: "db",
      contract: "CTR-001",
      usage: "500GB",
      unitPrice: 0.15,
      total: 225.0,
    },
  ],
  "2": [
    {
      id: "1",
      date: "2024-01-15",
      resourceId: "DB-CLUSTER",
      type: "db",
      contract: "CTR-010",
      usage: "2TB",
      unitPrice: 445.0,
      total: 890.0,
    },
    {
      id: "2",
      date: "2024-01-14",
      resourceId: "VM-APP-01",
      type: "vm",
      contract: "CTR-010",
      usage: "720h",
      unitPrice: 0.95,
      total: 684.0,
    },
    {
      id: "3",
      date: "2024-01-13",
      resourceId: "STORAGE-BACKUP",
      type: "storage",
      contract: "CTR-011",
      usage: "100GB",
      unitPrice: 0.05,
      total: 150.0,
    },
    {
      id: "4",
      date: "2024-01-12",
      resourceId: "API-GATEWAY",
      type: "network",
      contract: "CTR-012",
      usage: "500K req",
      unitPrice: 0.001,
      total: 432.32,
    },
  ],
  "3": [
    {
      id: "1",
      date: "2024-01-15",
      resourceId: "STORAGE-S3",
      type: "storage",
      contract: "CTR-020",
      usage: "10TB",
      unitPrice: 0.021,
      total: 2100.5,
    },
    {
      id: "2",
      date: "2024-01-14",
      resourceId: "VM-BATCH-01",
      type: "vm",
      contract: "CTR-020",
      usage: "720h",
      unitPrice: 2.5,
      total: 1800.0,
    },
    {
      id: "3",
      date: "2024-01-13",
      resourceId: "CDN-GLOBAL",
      type: "network",
      contract: "CTR-021",
      usage: "5TB",
      unitPrice: 0.08,
      total: 400.0,
    },
    {
      id: "4",
      date: "2024-01-12",
      resourceId: "VM-BATCH-02",
      type: "vm",
      contract: "CTR-020",
      usage: "720h",
      unitPrice: 2.5,
      total: 1800.0,
    },
    {
      id: "5",
      date: "2024-01-11",
      resourceId: "ARCHIVE-S3",
      type: "storage",
      contract: "CTR-020",
      usage: "20TB",
      unitPrice: 0.004,
      total: 800.0,
    },
    {
      id: "6",
      date: "2024-01-10",
      resourceId: "TRANSCODING",
      type: "cloud",
      contract: "CTR-022",
      usage: "100h",
      unitPrice: 10.34,
      total: 1033.62,
    },
    {
      id: "7",
      date: "2024-01-09",
      resourceId: "DB-ANALYTICS",
      type: "db",
      contract: "CTR-020",
      usage: "1TB",
      unitPrice: 500.0,
      total: 500.0,
    },
    {
      id: "8",
      date: "2024-01-08",
      resourceId: "QUEUE-SQS",
      type: "cloud",
      contract: "CTR-022",
      usage: "10M msg",
      unitPrice: 0.00004,
      total: 500.0,
    },
  ],
  "4": [
    {
      id: "1",
      date: "2024-01-15",
      resourceId: "VM-DEV-02",
      type: "vm",
      contract: "CTR-030",
      usage: "720h",
      unitPrice: 0.625,
      total: 450.0,
    },
    {
      id: "2",
      date: "2024-01-14",
      resourceId: "VM-TEST-01",
      type: "vm",
      contract: "CTR-030",
      usage: "480h",
      unitPrice: 0.45,
      total: 216.0,
    },
    {
      id: "3",
      date: "2024-01-13",
      resourceId: "STORAGE-DEV",
      type: "storage",
      contract: "CTR-031",
      usage: "50GB",
      unitPrice: 0.05,
      total: 75.0,
    },
    {
      id: "4",
      date: "2024-01-12",
      resourceId: "DB-DEV",
      type: "db",
      contract: "CTR-030",
      usage: "100GB",
      unitPrice: 0.5,
      total: 350.0,
    },
    {
      id: "5",
      date: "2024-01-11",
      resourceId: "CI-RUNNER",
      type: "cloud",
      contract: "CTR-032",
      usage: "200h",
      unitPrice: 0.5,
      total: 432.89,
    },
  ],
}

export function BillingTable({ clientId }: BillingTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const data = mockData[clientId] || mockData["1"]

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.resourceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contract.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || item.type === typeFilter
    return matchesSearch && matchesType
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalValue = filteredData.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="bg-card border border-border rounded-md flex flex-col flex-1 min-h-0">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-border">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Buscar recurso ou contrato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-7 pl-7 text-xs"
          />
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-7 w-[140px] text-xs">
            <Filter className="h-3 w-3 mr-1.5" />
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">
              Todos os tipos
            </SelectItem>
            <SelectItem value="vm" className="text-xs">
              VM
            </SelectItem>
            <SelectItem value="db" className="text-xs">
              Database
            </SelectItem>
            <SelectItem value="storage" className="text-xs">
              Storage
            </SelectItem>
            <SelectItem value="network" className="text-xs">
              Rede
            </SelectItem>
            <SelectItem value="cloud" className="text-xs">
              Cloud
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto text-[10px] text-muted-foreground">
          <span className="font-medium">{filteredData.length}</span> itens · Total:{" "}
          <span className="font-mono font-semibold text-foreground">
            R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-muted/50 sticky top-0">
            <tr className="border-b border-border">
              <th className="text-left font-medium text-muted-foreground px-2 py-1.5 w-[85px]">Data</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-1.5">ID Recurso</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-1.5 w-[100px]">Tipo</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-1.5 w-[90px]">Contrato</th>
              <th className="text-right font-medium text-muted-foreground px-2 py-1.5 w-[70px]">Uso</th>
              <th className="text-right font-medium text-muted-foreground px-2 py-1.5 w-[90px]">Valor Unit.</th>
              <th className="text-right font-medium text-muted-foreground px-2 py-1.5 w-[100px]">Total</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => {
              const typeInfo = resourceTypes[item.type]
              const Icon = typeInfo.icon
              return (
                <tr
                  key={item.id}
                  className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${index % 2 === 0 ? "" : "bg-muted/20"}`}
                >
                  <td className="px-2 py-1.5 font-mono text-muted-foreground">{item.date}</td>
                  <td className="px-2 py-1.5 font-medium text-foreground">{item.resourceId}</td>
                  <td className="px-2 py-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${typeInfo.color}`}
                    >
                      <Icon className="h-2.5 w-2.5" />
                      {typeInfo.label}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 font-mono text-muted-foreground">{item.contract}</td>
                  <td className="px-2 py-1.5 text-right font-mono">{item.usage}</td>
                  <td className="px-2 py-1.5 text-right font-mono text-muted-foreground">
                    R$ {item.unitPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-2 py-1.5 text-right font-mono font-semibold text-foreground">
                    R$ {item.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2 py-1.5 border-t border-border bg-muted/30">
        <span className="text-[10px] text-muted-foreground">
          Página {currentPage} de {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { FileSpreadsheet, FileText, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModuleHeaderProps {
  onExportExcel: () => void
  onGenerateInvoice: () => void
}

export function ModuleHeader({ onExportExcel, onGenerateInvoice }: ModuleHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <Receipt className="h-5 w-5 text-primary" />
        <h1 className="text-base font-semibold text-foreground">Billing</h1>
        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Módulo de Cobrança</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onExportExcel} className="h-7 text-xs gap-1.5 bg-transparent">
          <FileSpreadsheet className="h-3.5 w-3.5" />
          Exportar Excel
        </Button>
        <Button size="sm" onClick={onGenerateInvoice} className="h-7 text-xs gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          Gerar Fatura PDF
        </Button>
      </div>
    </header>
  )
}

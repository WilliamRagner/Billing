"use client"

import { useState } from "react"
import { AccountSelector } from "./account-selector"
import { BillingKpis } from "./billing-kpis"
import { CostDistributionChart } from "./cost-distribution-chart"
import { BillingTable } from "./billing-table"
import { ModuleHeader } from "./module-header"
import { InvoiceModal } from "./invoice-modal"

const clients = [
  { id: "1", name: "TechCorp Soluções", cnpj: "12.345.678/0001-90" },
  { id: "2", name: "StartupX Digital", cnpj: "98.765.432/0001-10" },
  { id: "3", name: "Empresa Alpha LTDA", cnpj: "11.222.333/0001-44" },
  { id: "4", name: "Comércio Beta S.A.", cnpj: "55.666.777/0001-88" },
]

export function BillingModule() {
  const [selectedClient, setSelectedClient] = useState(clients[0])
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      <ModuleHeader
        onExportExcel={() => console.log("Exportar Excel")}
        onGenerateInvoice={() => setInvoiceModalOpen(true)}
      />

      <div className="flex-1 overflow-auto p-3 space-y-3">
        <AccountSelector clients={clients} selectedClient={selectedClient} onSelectClient={setSelectedClient} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-3">
            <BillingKpis clientId={selectedClient.id} />
          </div>
          <div className="lg:col-span-1">
            <CostDistributionChart clientId={selectedClient.id} />
          </div>
        </div>

        <BillingTable clientId={selectedClient.id} />
      </div>

      <InvoiceModal
        open={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        clientName={selectedClient.name}
      />
    </div>
  )
}

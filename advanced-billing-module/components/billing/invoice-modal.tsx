"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, Eye, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface InvoiceModalProps {
  open: boolean
  onClose: () => void
  clientName: string
}

export function InvoiceModal({ open, onClose, clientName }: InvoiceModalProps) {
  const [dueDate, setDueDate] = useState("")
  const [paymentInstructions, setPaymentInstructions] = useState(
    "Banco: Itaú (341)\nAgência: 1234\nConta: 56789-0\n\nPix: contato@empresa.com.br",
  )
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="px-4 py-3 border-b border-border">
          <DialogTitle className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-primary" />
            Configurar Fatura PDF
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="p-2 bg-muted/50 rounded text-xs">
            <span className="text-muted-foreground">Cliente:</span> <span className="font-medium">{clientName}</span>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dueDate" className="text-xs">
              Data de Vencimento
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="h-8 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="paymentInstructions" className="text-xs">
              Instruções de Pagamento
            </Label>
            <Textarea
              id="paymentInstructions"
              value={paymentInstructions}
              onChange={(e) => setPaymentInstructions(e.target.value)}
              placeholder="Dados bancários, Pix, etc..."
              className="text-xs min-h-[100px] font-mono resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Logo da Empresa</Label>
            <div className="flex items-center gap-2">
              <label className="flex-1 flex items-center justify-center gap-2 h-8 px-3 border border-dashed border-border rounded cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {logoFile ? logoFile.name : "Selecionar arquivo..."}
                </span>
                <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
              </label>
              {logoFile && (
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setLogoFile(null)}>
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border bg-muted/30">
          <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-transparent">
            <Eye className="h-3 w-3" />
            Visualizar Preview
          </Button>
          <Button size="sm" className="h-7 text-xs gap-1.5">
            <FileText className="h-3 w-3" />
            Gerar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

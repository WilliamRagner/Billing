"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Client {
  id: string
  name: string
  cnpj: string
}

interface AccountSelectorProps {
  clients: Client[]
  selectedClient: Client
  onSelectClient: (client: Client) => void
}

export function AccountSelector({ clients, selectedClient, onSelectClient }: AccountSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 p-2 bg-card border border-border rounded-md">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Building2 className="h-3.5 w-3.5" />
        <span className="font-medium">Conta:</span>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-7 justify-between min-w-[280px] text-xs font-normal bg-transparent"
          >
            <span className="truncate">{selectedClient.name}</span>
            <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar cliente..." className="h-8 text-xs" />
            <CommandList>
              <CommandEmpty className="text-xs py-4">Nenhum cliente encontrado.</CommandEmpty>
              <CommandGroup>
                {clients.map((client) => (
                  <CommandItem
                    key={client.id}
                    value={client.name}
                    onSelect={() => {
                      onSelectClient(client)
                      setOpen(false)
                    }}
                    className="text-xs py-1.5"
                  >
                    <Check
                      className={cn("mr-2 h-3 w-3", selectedClient.id === client.id ? "opacity-100" : "opacity-0")}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{client.name}</span>
                      <span className="text-muted-foreground text-[10px]">{client.cnpj}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="ml-auto text-[10px] text-muted-foreground">
        CNPJ: <span className="font-mono">{selectedClient.cnpj}</span>
      </div>
    </div>
  )
}

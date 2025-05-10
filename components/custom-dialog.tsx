"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CustomDialogProps {
  trigger: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * 
 * @param trigger
 * @param title
 * @param description
 * @param children
 * @param footer
 * @param open
 * @param onOpenChange
 * @example ```
  <CustomDialog
            trigger={<Button variant="destructive">Supprimer l'élément</Button>}
            title="Suppression d'un élément"
            footer={<div className="flex justify-end gap-2 w-full">
              <Button variant="destructive">Oui</Button>
              <Button variant="outline">Non</Button>
            </div>}>
            <p>
             Etes-vous sur de vouloir supprimer ?
            </p>
  </CustomDialog> 
 ```
 */
export function CustomDialog({ trigger, title, description, children, footer, open, onOpenChange }: CustomDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)

  const isControlled = open !== undefined && onOpenChange !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

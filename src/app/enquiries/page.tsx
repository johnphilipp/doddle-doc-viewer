"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Enquiry {
  id: number
  text: string
  references: string
  flag: "orange" | "red" | "green"
  status: "open" | "resolved"
  order: number
}

const initialEnquiries: Enquiry[] = [
  {
    id: 1,
    text: "When was the last boiler maintenance check?",
    references:
      "Doddle AI checked all documents and did not find any references to a boiler maintenance check. Normally this information would be in the TA10 form.",
    flag: "orange",
    status: "open",
    order: 0,
  },
  {
    id: 2,
    text: "When was the last gas safety check?",
    references:
      "Doddle AI checked all documents and did not find any references to a gas safety check. Normally this information would be in the TA6 form.",
    flag: "red",
    status: "open",
    order: 1,
  },
  {
    id: 3,
    text: "Do any neighbours have shared access to the driveway?",
    references: "...",
    flag: "green",
    status: "open",
    order: 2,
  },
  {
    id: 4,
    text: "Do any neighbours share access to the back of the property?",
    references: "...",
    flag: "green",
    status: "resolved",
    order: 0,
  },
]

function EnquiryCard({
  enquiry,
  onDragStart,
  isDragging,
  onDragOverCard,
  onDropOnCard,
  isDragOver,
  dragOverPosition,
}: {
  enquiry: Enquiry
  onDragStart: (id: number) => void
  isDragging: boolean
  onDragOverCard: (e: React.DragEvent, targetId: number) => void
  onDropOnCard: (targetId: number, position: "top" | "bottom") => void
  isDragOver: boolean
  dragOverPosition?: "top" | "bottom"
}) {
  const flagColors = { red: "bg-red-500", orange: "bg-orange-500", green: "bg-green-500" }
  const flagTextColors = { red: "text-red-700", orange: "text-orange-700", green: "text-green-700" }
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onDragOverCard(e, enquiry.id)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const midpoint = rect.top + rect.height / 2
    const position = e.clientY < midpoint ? "top" : "bottom"
    onDropOnCard(enquiry.id, position)
  }

  return (
    <div ref={cardRef} className="relative mb-2" onDragOver={handleDragOver} onDrop={handleDrop}>
      {isDragOver && dragOverPosition === "top" && (
        <div className="absolute -top-1 left-0 right-0 h-2 bg-blue-400 rounded-full z-10 transition-all" />
      )}
      <Card
        className={`cursor-move hover:shadow-lg transition-all duration-200 ${
          isDragging ? "opacity-30 rotate-1 scale-105 shadow-xl" : "opacity-100"
        } ${isDragOver ? "ring-2 ring-blue-400 ring-offset-2" : ""}`}
        draggable
        onDragStart={() => onDragStart(enquiry.id)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-medium leading-tight">{enquiry.text}</CardTitle>
            <div className={`w-3 h-3 rounded-full ${flagColors[enquiry.flag]} flex-shrink-0 mt-1`} />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-xs text-muted-foreground">{enquiry.references}</CardDescription>
          <Badge variant="outline" className={`mt-2 text-xs ${flagTextColors[enquiry.flag]} border-current`}>
            {enquiry.flag.charAt(0).toUpperCase() + enquiry.flag.slice(1)} Priority
          </Badge>
        </CardContent>
      </Card>
      {isDragOver && dragOverPosition === "bottom" && (
        <div className="absolute -bottom-1 left-0 right-0 h-2 bg-blue-400 rounded-full z-10 transition-all" />
      )}
    </div>
  )
}

function KanbanColumn({
  title,
  status,
  enquiries,
  onDropInColumn,
  onDragStart,
  draggedId,
  onDragOverCard,
  onDropOnCard,
  dragOverCardId,
  dragOverCardPosition,
}: {
  title: string
  status: "open" | "resolved"
  enquiries: Enquiry[]
  onDropInColumn: (targetStatus: "open" | "resolved", position?: number) => void
  onDragStart: (id: number) => void
  draggedId: number | null
  onDragOverCard: (e: React.DragEvent, targetId: number) => void
  onDropOnCard: (targetId: number, position: "top" | "bottom") => void
  dragOverCardId: number | null
  dragOverCardPosition?: "top" | "bottom"
}) {
  const handleDragOverColumn = (e: React.DragEvent) => {
    e.preventDefault()
    if (dragOverCardId === null && draggedId !== null) {
      // Column is active for empty space drops
    }
  }

  const handleDropInEmptySpace = (e: React.DragEvent) => {
    e.preventDefault()
    if (dragOverCardId === null && draggedId !== null) {
      onDropInColumn(status)
    }
  }

  const isColumnActive = draggedId !== null && dragOverCardId === null

  return (
    <div className="flex-1">
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{enquiries.length} enquiries</p>
      </div>
      <div
        className={`min-h-[500px] p-4 rounded-lg border-2 transition-all duration-200 relative ${
          isColumnActive
            ? "bg-blue-50 border-blue-300 border-solid"
            : "bg-muted/20 border-dashed border-muted-foreground/20"
        }`}
        onDragOver={handleDragOverColumn}
        onDrop={handleDropInEmptySpace}
      >
        {enquiries.map((enquiry) => (
          <EnquiryCard
            key={enquiry.id}
            enquiry={enquiry}
            onDragStart={onDragStart}
            isDragging={draggedId === enquiry.id}
            onDragOverCard={onDragOverCard}
            onDropOnCard={onDropOnCard}
            isDragOver={dragOverCardId === enquiry.id}
            dragOverPosition={dragOverCardId === enquiry.id ? dragOverCardPosition : undefined}
          />
        ))}
        {enquiries.length === 0 && draggedId !== null && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm pointer-events-none">
            Drop here to add to {title}
          </div>
        )}
      </div>
    </div>
  )
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries)
  const [draggedId, setDraggedId] = useState<number | null>(null)
  const [dragOverCardId, setDragOverCardId] = useState<number | null>(null)
  const [dragOverCardPosition, setDragOverCardPosition] = useState<"top" | "bottom" | undefined>(undefined)

  const handleDragStart = (id: number) => {
    setDraggedId(id)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDragOverCardId(null)
    setDragOverCardPosition(undefined)
  }

  const handleDragOverCard = (e: React.DragEvent, targetId: number) => {
    if (draggedId === null || draggedId === targetId) return

    setDragOverCardId(targetId)

    const cardElement = e.currentTarget as HTMLElement
    const rect = cardElement.getBoundingClientRect()
    const midpoint = rect.top + rect.height / 2
    setDragOverCardPosition(e.clientY < midpoint ? "top" : "bottom")
  }

  const handleDropOnCard = (targetId: number, position: "top" | "bottom") => {
    if (draggedId === null || draggedId === targetId) return

    setEnquiries((prevEnquiries) => {
      const draggedItem = prevEnquiries.find((e) => e.id === draggedId)!
      const targetItem = prevEnquiries.find((e) => e.id === targetId)!

      const newEnquiries = prevEnquiries.filter((e) => e.id !== draggedId)
      const targetIndex = newEnquiries.findIndex((e) => e.id === targetId)

      draggedItem.status = targetItem.status

      if (position === "top") {
        newEnquiries.splice(targetIndex, 0, draggedItem)
      } else {
        newEnquiries.splice(targetIndex + 1, 0, draggedItem)
      }

      const openItems = newEnquiries.filter((e) => e.status === "open")
      const resolvedItems = newEnquiries.filter((e) => e.status === "resolved")

      let order = 0
      const reorderedOpen = openItems.map((i) => ({ ...i, order: order++ }))
      order = 0
      const reorderedResolved = resolvedItems.map((i) => ({ ...i, order: order++ }))

      return [...reorderedOpen, ...reorderedResolved]
    })
    handleDragEnd()
  }

  const handleDropInColumn = (targetStatus: "open" | "resolved", position?: number) => {
    if (draggedId === null) return

    setEnquiries((prevEnquiries) => {
      const draggedItem = { ...prevEnquiries.find((e) => e.id === draggedId)!, status: targetStatus }
      let newEnquiries = prevEnquiries.filter((e) => e.id !== draggedId)

      if (typeof position === "number") {
        const columnItems = newEnquiries.filter((e) => e.status === targetStatus)
        columnItems.splice(position, 0, draggedItem)
        newEnquiries = [...newEnquiries.filter((e) => e.status !== targetStatus), ...columnItems]
      } else {
        newEnquiries.push(draggedItem)
      }

      const openItems = newEnquiries.filter((e) => e.status === "open")
      const resolvedItems = newEnquiries.filter((e) => e.status === "resolved")

      let order = 0
      const reorderedOpen = openItems.map((i) => ({ ...i, order: order++ }))
      order = 0
      const reorderedResolved = resolvedItems.map((i) => ({ ...i, order: order++ }))

      return [...reorderedOpen, ...reorderedResolved]
    })
    handleDragEnd()
  }

  const openEnquiries = enquiries.filter((e) => e.status === "open").sort((a, b) => a.order - b.order)
  const resolvedEnquiries = enquiries.filter((e) => e.status === "resolved").sort((a, b) => a.order - b.order)

  return (
    <div className="flex flex-1 flex-col p-6" onDragEnd={handleDragEnd}>
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-4">Property Enquiries</h1>
      <div className="flex gap-8 flex-1">
        <KanbanColumn
          title="Open"
          status="open"
          enquiries={openEnquiries}
          onDropInColumn={handleDropInColumn}
          onDragStart={handleDragStart}
          draggedId={draggedId}
          onDragOverCard={handleDragOverCard}
          onDropOnCard={handleDropOnCard}
          dragOverCardId={dragOverCardId}
          dragOverCardPosition={dragOverCardPosition}
        />
        <KanbanColumn
          title="Resolved"
          status="resolved"
          enquiries={resolvedEnquiries}
          onDropInColumn={handleDropInColumn}
          onDragStart={handleDragStart}
          draggedId={draggedId}
          onDragOverCard={handleDragOverCard}
          onDropOnCard={handleDropOnCard}
          dragOverCardId={dragOverCardId}
          dragOverCardPosition={dragOverCardPosition}
        />
      </div>
    </div>
  )
}

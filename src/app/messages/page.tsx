"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Paperclip, Phone, Video, MoreVertical, Search, Filter, Archive, Star, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: number
  sender: "conveyancer" | "client"
  content: string
  timestamp: string
  type: "text" | "document" | "system"
  attachments?: {
    name: string
    type: string
    size: string
  }[]
  isRead: boolean
}

interface Conversation {
  id: number
  clientName: string
  clientEmail: string
  clientAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  property: string
}

const conversations: Conversation[] = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientEmail: "sarah.johnson@email.com",
    clientAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
    lastMessage: "Thank you for the update on the searches",
    lastMessageTime: "2 min ago",
    unreadCount: 0,
    isOnline: true,
    property: "7 Blake Street, Buckinghamshire",
  },
  {
    id: 2,
    clientName: "Michael Chen",
    clientEmail: "m.chen@email.com",
    clientAvatar: "/placeholder.svg?height=40&width=40&text=MC",
    lastMessage: "When can we expect the contract to be ready?",
    lastMessageTime: "1 hour ago",
    unreadCount: 2,
    isOnline: false,
    property: "15 Oak Avenue, Surrey",
  },
  {
    id: 3,
    clientName: "Emma Williams",
    clientEmail: "emma.w@email.com",
    clientAvatar: "/placeholder.svg?height=40&width=40&text=EW",
    lastMessage: "I've reviewed the documents you sent",
    lastMessageTime: "3 hours ago",
    unreadCount: 0,
    isOnline: true,
    property: "22 Maple Close, Kent",
  },
]

const messages: Message[] = [
  {
    id: 1,
    sender: "client",
    content: "Hi, I hope you're well. I wanted to check on the progress of my property purchase for 7 Blake Street.",
    timestamp: "Today, 9:30 AM",
    type: "text",
    isRead: true,
  },
  {
    id: 2,
    sender: "conveyancer",
    content:
      "Good morning Sarah! Thanks for reaching out. I'm pleased to update you that we've received the search results and they look positive. I'll send you a summary shortly.",
    timestamp: "Today, 9:45 AM",
    type: "text",
    isRead: true,
  },
  {
    id: 3,
    sender: "conveyancer",
    content: "I've attached the search report summary for your review. Please let me know if you have any questions.",
    timestamp: "Today, 10:15 AM",
    type: "document",
    attachments: [
      {
        name: "Search_Report_Summary_7_Blake_St.pdf",
        type: "PDF",
        size: "2.4 MB",
      },
    ],
    isRead: true,
  },
  {
    id: 4,
    sender: "system",
    content: "Document viewed by client",
    timestamp: "Today, 10:30 AM",
    type: "system",
    isRead: true,
  },
  {
    id: 5,
    sender: "client",
    content: "Thank you for the update on the searches. Everything looks good to me. What are the next steps?",
    timestamp: "Today, 11:20 AM",
    type: "text",
    isRead: true,
  },
  {
    id: 6,
    sender: "conveyancer",
    content:
      "Great! The next step is to review the draft contract. I'll have this ready for you by tomorrow morning. We're on track for completion as planned.",
    timestamp: "Today, 11:35 AM",
    type: "text",
    isRead: true,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.property.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden">
      {/* Conversations List */}
      <div className="w-96 min-w-96 border-r border-border bg-muted/20 flex flex-col lg:w-80 lg:min-w-80">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive All Read
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Messages
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Conversations */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className={`mb-2 cursor-pointer transition-all hover:shadow-sm ${
                  selectedConversation.id === conversation.id ? "bg-primary/5 border-primary/20" : "hover:bg-muted/40"
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={conversation.clientAvatar || "/placeholder.svg"}
                          alt={conversation.clientName}
                        />
                        <AvatarFallback>
                          {conversation.clientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm truncate">{conversation.clientName}</h3>
                        <div className="flex items-center gap-1">
                          {conversation.unreadCount > 0 && (
                            <Badge variant="default" className="h-5 min-w-5 text-xs px-1.5">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1">{conversation.property}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-tight">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedConversation.clientAvatar || "/placeholder.svg"}
                    alt={selectedConversation.clientName}
                  />
                  <AvatarFallback>
                    {selectedConversation.clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {selectedConversation.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{selectedConversation.clientName}</h3>
                <p className="text-sm text-muted-foreground">{selectedConversation.property}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Star className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Client Details</DropdownMenuItem>
                  <DropdownMenuItem>View Property Details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Block Client</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === "system" ? (
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      {message.content} • {message.timestamp}
                    </div>
                  </div>
                ) : (
                  <div className={`flex ${message.sender === "conveyancer" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] ${message.sender === "conveyancer" ? "order-2" : ""}`}>
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.sender === "conveyancer" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>

                        {message.attachments && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className={`flex items-center gap-2 p-2 rounded border ${
                                  message.sender === "conveyancer"
                                    ? "bg-primary-foreground/10 border-primary-foreground/20"
                                    : "bg-background border-border"
                                }`}
                              >
                                <Paperclip className="h-4 w-4" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium truncate">{attachment.name}</p>
                                  <p className="text-xs opacity-70">
                                    {attachment.type} • {attachment.size}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <p
                        className={`text-xs text-muted-foreground mt-1 ${
                          message.sender === "conveyancer" ? "text-right" : "text-left"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="min-h-[2.5rem] resize-none"
              />
            </div>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="h-9 w-9 shrink-0" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

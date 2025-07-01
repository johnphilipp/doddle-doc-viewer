"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  sources?: string;
  references?: string[];
}

const initialMessages: Message[] = [
  { id: "1", text: "What is the notice period for the lease?", sender: "user" },
  {
    id: "2",
    text: "The notice period for the lease is 3 months.",
    sender: "bot",
    sources:
      "This information was found in the 'LEASE CONTRACT REPORT' document on page 5, section 3.2.",
  },
  { id: "3", text: "Are there any break clauses?", sender: "user" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessages: Message[] = [
        ...messages,
        {
          id: String(Date.now()),
          text: inputValue,
          sender: "user",
        },
      ];
      setMessages(newMessages);
      setInputValue("");

      // Dummy bot response for demonstration
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: String(Date.now()),
            text: "This is a placeholder bot response.",
            sender: "bot",
            sources:
              "Source information would appear here, based on the documents.",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.sender === "user" ? (
                <div className="flex justify-end">
                  <div className="rounded-lg px-3 py-2 max-w-[80%] bg-primary text-primary-foreground">
                    <p className="text-sm break-words">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    AI
                  </div>
                  <div className="rounded-lg bg-background border max-w-[80%]">
                    <p className="text-sm break-words px-3 py-2">
                      {message.text}
                    </p>
                    {message.sources && (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem
                          value={`item-${message.id}`}
                          className="border-b-0"
                        >
                          <AccordionTrigger className="text-xs font-medium text-muted-foreground hover:no-underline py-1 px-3 justify-start gap-x-1 border-t">
                            <span>Sources</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-3 pb-2">
                            <p className="text-xs text-muted-foreground">
                              {message.sources}
                            </p>
                            {message.references &&
                              message.references.length > 0 && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  <span className="font-semibold">
                                    References:
                                  </span>{" "}
                                  {message.references.join(", ")}
                                </p>
                              )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Ask a question..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon" variant="outline">
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

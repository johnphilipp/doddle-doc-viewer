"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Enquiries from "./Enquiries";
import Chat from "./Chat";

export default function SidebarRight() {
  return (
    <aside className="w-120 bg-muted p-4 border-l flex flex-col flex-shrink-0">
      <Tabs defaultValue="chat" className="w-full h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
          <TabsTrigger value="report">Report</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="flex-1">
          <Chat />
        </TabsContent>
        <TabsContent value="enquiries">
          <Enquiries />
        </TabsContent>
        <TabsContent value="report">
          <p>Report content will go here.</p>
        </TabsContent>
      </Tabs>
    </aside>
  );
}

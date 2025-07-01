"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Flag, MessageCircleQuestionMark } from "lucide-react";
import { Badge } from "../ui/badge";

interface Enquiry {
  id: number;
  text: string;
  references: string;
  flag: "orange" | "red" | "green";
  status: "open" | "resolved";
}

const enquiries: Enquiry[] = [
  {
    id: 1,
    text: "When was the last boiler maintenance check?",
    references:
      "Doddle AI checked all documents and did not find any references to a boiler maintenance check. Normally this information would be in the TA10 form.",
    flag: "orange",
    status: "open",
  },
  {
    id: 2,
    text: "When was the last gas safety check?",
    references:
      "Doddle AI checked all documents and did not find any references to a gas safety check. Normally this information would be in the TA6 form.",
    flag: "red",
    status: "open",
  },
  {
    id: 3,
    text: "Do any neighbours have shared acess to the driveway?",
    references: "...",
    flag: "green",
    status: "open",
  },
  {
    id: 4,
    text: "Do any neighbours share access to the back of the property?",
    references: "...",
    flag: "green",
    status: "resolved",
  },
];

function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  return (
    <Card className="py-3 border-input shadow-xs rounded-md gap-2">
      <CardHeader className="px-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircleQuestionMark className="h-5 w-5" />
          <h3 className="text-sm font-medium">Enquiry</h3>
        </div>
        <Badge
          variant="default"
          className={cn(
            "bg-orange-100 text-orange-600",
            enquiry.flag === "orange" &&
              "bg-orange-100 text-orange-600 border-orange-200",
            enquiry.flag === "red" && "bg-red-100 text-red-600 border-red-200",
            enquiry.flag === "green" &&
              "bg-green-100 text-green-600 border-green-200"
          )}
        >
          <Flag />
        </Badge>
      </CardHeader>

      <CardContent className="px-3">
        <p className="text-sm text-muted-foreground">{enquiry.content}</p>
      </CardContent>

      <CardFooter className="px-1">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`item-${enquiry.id}`} className="border-b-0">
            <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:no-underline py-2 px-2 justify-start gap-x-1">
              <span>Sources</span>
            </AccordionTrigger>
            <AccordionContent className="px-2 pb-0">
              <p className="text-sm text-muted-foreground">
                {enquiry.references}
              </p>
              {enquiry.references && enquiry.references.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="font-semibold">References:</span>{" "}
                  {enquiry.references.join(", ")}
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}

export default function Enquiries() {
  return (
    <div className="flex flex-col gap-2">
      {enquiries.map((enquiry) => (
        <EnquiryCard key={enquiry.id} enquiry={enquiry} />
      ))}
    </div>
  );
}

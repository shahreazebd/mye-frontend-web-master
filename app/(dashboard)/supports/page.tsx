import { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";

const messages = [
  {
    sender: "Long Island City",

    timestamp: "20 December 2024, 04:38:31 PM",
    body: `Hello Manage Your eCommerce Team,\n\nI've been trying to delete my listing on the Manage Your eCommerce platform for the past few days using the “Delete Listing” button under the Listing Page. However, my listing keeps republishing without my consent.\n\nAs a result, I was forced to remove my listing through Amazon Seller Central.\n\nCould you please assist me with this issue as soon as possible to prevent it from happening again?\n\nThank you.`,
  },
  {
    sender: "MYE Support Team",
    timestamp: "20 December 2024, 04:52:40 PM",
    body: `Dear Long Island City Team,\n\nThank you for reaching out.\n\nWe apologize for the issue with the listing and have informed the relevant team, who is promptly addressing the matter to ensure a speedy solution.\n\nPlease bear with us as we fix this bug. We’ll keep you updated.\n\nKind regards,\nMYE Support Team.`,
  },
  {
    sender: "MYE Support Team",
    timestamp: "27 December 2024, 02:18:20 PM",
    body: `Dear Long Island City Team,\n\nWe appreciate your patience.\n\nWe've resolved the republishing issue from our end. Now, you can use the “Delete Listing” button as intended, and no listing will be published without the user’s consent.\n\nThe resolution period took longer than usual because of the festive season.\n\nWe value your feedback during this development phase and kindly request your cooperation.\n\nOnce again, we thank you for your understanding. Please don’t hesitate to contact us if you need any assistance from our side.\n\nKind regards,\nMYE Support Team.`,
  },
];

export const metadata: Metadata = {
  title: "Supports",
  description: "Manage Your Ecommerce",
};

const ticketId = "Ticket ID: 10365532";

export default function EmailConversation() {
  return (
    <div className="mx-auto w-full pb-6 pt-4">
      <div className="border-b border-gray-300 pb-1">
        <div className="flex items-center gap-x-2">
          <h1 className="text-lg font-bold">{ticketId}</h1>
          <Badge className="bg-green-700 text-white">Resolved</Badge>
        </div>
        <p className="font-bold">Subject: Amazon Listing Issue</p>
      </div>
      <div className="mt-6 space-y-8">
        {messages.map((msg, index) => (
          <Card key={index} className="border border-gray-300 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-x-1 font-semibold">
                  {index !== 0 && <Icons.logo className="size-4 " />}
                  {msg.sender}
                </h2>
              </div>

              <p className="mt-2 whitespace-pre-line text-gray-700">{msg.body}</p>

              <div className="my-2 flex justify-end">
                <Badge className="bg-white text-gray-400">{msg.timestamp}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

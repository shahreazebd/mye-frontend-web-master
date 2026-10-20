"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function CancelDetails() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b border-gray-200">
        <AccordionTrigger>Why was my payment declined?</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>You manually cancel the payment</li>
            <li>Insufficient funds in your account</li>
            <li>Incorrect card details entered</li>
            <li>Your card may have expired</li>
            <li>Your bank may have blocked the transaction</li>
            <li>Network or connection issues</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b border-gray-200">
        <AccordionTrigger>What should I do next?</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm">
            You can try again with a different payment method, check your card details, or
            contact your bank to resolve any issues with your card.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

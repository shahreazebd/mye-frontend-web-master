import React from "react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SectionHeader from "../shared/section-header";
import { Button } from "../ui/button";

function FAQ() {
  return (
    <section className="faq -mb-20 bg-faqBg pb-24 pt-12 lg:-mb-40 lg:py-40">
      <div className="container">
        <SectionHeader
          title="Frequently asked questions"
          description=""
          className="lg:w-2/3"
        />

        <div className="my-10 grid gap-x-24 gap-y-8 lg:my-16 lg:grid-cols-2 ">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other components&apos;
                aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other components&apos;
                aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="text-center">
          <h5 className="mb-2 text-[20px] lg:text-[32px]">Still have a question?</h5>

          <Link href="/contact-us">
            <Button className="mt-6 bg-[#007AFF] px-8">Contact Us</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FAQ;

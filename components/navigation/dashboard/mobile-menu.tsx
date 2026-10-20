import Link from "next/link";
import { AlignRight } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignRight className="block cursor-pointer lg:hidden" />
      </SheetTrigger>
      <SheetContent position="right" size="lg" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <a className="mt-4 flex items-center justify-end" href="/">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 size-4"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              <span className="font-bold">MYE</span>
            </a>
          </SheetTitle>

          <SheetDescription>
            <ul className="flex flex-col justify-end">
              <SheetClose>
                <li className="mb-2 text-right font-medium">
                  <Link href="/">Shipping</Link>
                </li>
              </SheetClose>
              <SheetClose>
                <li className="mb-2 text-right font-medium">
                  <Link href="/">Features</Link>
                </li>
              </SheetClose>
              <SheetClose>
                <li className="mb-2 text-right font-medium">
                  <Link href="/">Integrations</Link>
                </li>
              </SheetClose>
              <SheetClose>
                <li className="mb-2 text-right font-medium">
                  <Link href="/">About</Link>
                </li>
              </SheetClose>
              <SheetClose>
                <li className="mb-2 text-right font-medium">
                  <Link href="/">Pricing</Link>
                </li>
              </SheetClose>
              <SheetClose>
                <li className="mb-2 text-right font-medium">
                  <Link href="/">Blog</Link>
                </li>
              </SheetClose>
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

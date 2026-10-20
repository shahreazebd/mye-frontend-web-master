import { useState } from "react";
import Link from "next/link";
import { AlignRight, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";

export function MobileMenu({ isSuccess }: Readonly<{ isSuccess: boolean }>) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen((prev) => !prev);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <div onClick={toggleSheet}>
        {isSheetOpen ? (
          <X className="block cursor-pointer lg:hidden" />
        ) : (
          <AlignRight className="block cursor-pointer lg:hidden" />
        )}
      </div>
      <SheetContent position="right" size="lg" className="mt-[35px] w-64 overflow-y-auto">
        <SheetHeader>
          <SheetDescription className="mt-5">
            <ul className="flex flex-col justify-end">
              <li onClick={closeSheet} className="mb-2 text-right font-medium">
                <Link href="/shipping">Shipping</Link>
              </li>

              <li onClick={closeSheet} className="mb-2 text-right font-medium">
                <Link href="/features">Features</Link>
              </li>

              {/* <li onClick={closeSheet} className="mb-2 text-right font-medium">
                <Link href="/blog">Blog</Link>
              </li> */}

              <li onClick={closeSheet} className="mb-2 text-right font-medium">
                <Link href="/pricing">Pricing</Link>
              </li>

              <li onClick={closeSheet} className="mb-2 text-right font-medium">
                <Link href="/contact-us">Contact Us</Link>
              </li>

              {isSuccess ? (
                <li onClick={closeSheet} className="mb-2 text-right font-medium">
                  <Button variant="secondary">Dashboard</Button>
                </li>
              ) : (
                <li
                  onClick={closeSheet}
                  className="mb-2 space-x-2 text-right font-medium"
                >
                  <Link
                    href="/login"
                    className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
                  >
                    Login
                  </Link>

                  <Link href="/register" className={cn(buttonVariants({ size: "sm" }))}>
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

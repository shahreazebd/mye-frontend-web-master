import "@/styles/globals.css";
import { type Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { archivoFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AtomProvider from "@/components/atom-provider";
import { NotificationProvider } from "@/components/notification-provider";
import RQProvider from "@/components/rq-provider";
import ScrollToTop from "@/components/shared/scroll-to-top";
import { TailwindIndicator } from "@/components/tailwind-indicator";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.manageyourecommerce.com/"),
  title: {
    default: "Manage Your Ecommerce",
    template: `%s | Manage Your Ecommerce`,
  },
  description:
    "Multi-channel order management system is meticulously designed for eCommerce entrepreneurs like you.",

  twitter: {
    card: "summary_large_image",
  },

  // alternates: {
  //   canonical: "https://www.manageyourecommerce.com/",
  // },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen font-sans antialiased", archivoFont.variable)}
    >
      <body className={cn("min-h-screen antialiased")}>
        <RQProvider>
          <NuqsAdapter>
            <AtomProvider>
              <NotificationProvider>
                <TooltipProvider delayDuration={300}>
                  <div className="relative flex min-h-screen flex-col">
                    <NextTopLoader
                      showSpinner={false}
                      showAtBottom={false}
                      color="#6F6AF8"
                    />
                    <div className="flex-1">{children}</div>
                    <ScrollToTop />
                  </div>
                  <Toaster />
                  <TailwindIndicator />
                </TooltipProvider>
              </NotificationProvider>
            </AtomProvider>
          </NuqsAdapter>
        </RQProvider>
      </body>
    </html>
  );
}

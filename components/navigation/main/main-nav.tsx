"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "@/components/icons";

const marketplacesComponents: {
  title: string;
  href: string;
  description: string;
  img: string;
}[] = [
  {
    title: "Amazon Integration",
    img: "/images/integrations/amazon.svg",
    href: "/integrations/amazon",
    description:
      "Amazon integration facilitates a smooth and efficient collaboration between a company's internal systems and extensive e-commerce ecosystem.",
  },
  {
    title: "Ebay Integration",
    img: "/images/integrations/ebay.svg",
    href: "/integrations/ebay",
    description:
      "eBay integration is the seamless connection of a company's internal systems with eBay's extensive online marketplace.",
  },
  {
    title: "Otto Integration",
    img: "/images/integrations/otto.svg",
    href: "/integrations/otto",
    description:
      "Otto integration facilitates a smooth and efficient collaboration between a company's internal systems and extensive e-commerce ecosystem.",
  },
  {
    title: "WooCommerce Integration",
    img: "/images/integrations/woocommerce.svg",
    href: "/integrations/woocommerce",
    description:
      "WooCommerce integration is a versatile and scalable solution that empowers businesses to create a cohesive and efficient e-commerce ecosystem.",
  },
];

// const shippingComponents: {
//   title: string;
//   href: string;
//   description: string;
//   img: string;
// }[] = [
//   {
//     title: "DHL Integration",
//     img: "/images/integrations/dhl.svg",
//     href: "/integrations/dhl",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Evri Integration",
//     img: "/images/integrations/evri.svg",
//     href: "/integrations/evri",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
//   {
//     title: "Royal Mail Integration",
//     img: "/images/integrations/royal-mail.svg",
//     href: "/integrations/royal-mail",
//     description: "Users to preview content available behind a link.",
//   },
// ];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-6 md:gap-10 lg:gap-12 xl:gap-14">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.myelogo />
      </Link>
      <div className="hidden lg:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/features"
                  className={cn(navigationMenuTriggerStyle(), "text-gray-500", {
                    "font-bold text-gray-900": pathname.startsWith("/features"),
                  })}
                >
                  Features
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/shipping"
                  className={cn(navigationMenuTriggerStyle(), "text-gray-500", {
                    "font-bold text-gray-900": pathname.startsWith("/shipping"),
                  })}
                >
                  Shipping
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn("text-gray-500", {
                  "font-bold text-gray-900": pathname.startsWith("/features"),
                })}
              >
                Features
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className=" grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3 rounded-md bg-gradient-to-b from-[#BEBEFE] from-10% via-[#6B95D6] via-30% to-[#224C7A] to-70%">
                    <NavigationMenuLink asChild>
                      <a
                        className="from-muted/50 flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/features"
                      >
                        <Icons.logo className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-bold text-white">
                          All Features
                        </div>
                        <p className="text-sm leading-tight text-white">
                          Beautifully designed components built with Radix UI and Tailwind
                          CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem title="Postage">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem title="Message">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem title="Feedback">
                    Styles for headings, paragraphs, lists... etc.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn("text-gray-500", {
                  "font-bold text-gray-900": pathname.startsWith("/integrations"),
                })}
              >
                Integrations
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <div className="col-span-2 grid">
                    {marketplacesComponents.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        img={component.img}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </div>
                  {/* <div className="col-span-1 grid">
                    {shippingComponents.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        img={component.img}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </div> */}

                  <span className="col-span-2 pb-4 text-end text-xs font-bold text-primary">
                    <Link href="/integrations">See more...</Link>
                  </span>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className={cn(navigationMenuTriggerStyle(), "text-gray-500", {
                    "font-bold text-gray-900": pathname.startsWith("/about"),
                  })}
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/pricing"
                  className={cn(navigationMenuTriggerStyle(), "text-gray-500", {
                    "font-bold text-gray-900": pathname.startsWith("/pricing"),
                  })}
                >
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/blog"
                  className={cn(navigationMenuTriggerStyle(), "text-gray-500", {
                    "font-bold text-gray-900": pathname.startsWith("/blog"),
                  })}
                >
                  Blog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact-us"
                  className={cn(navigationMenuTriggerStyle(), "text-gray-500", {
                    "font-bold text-gray-900": pathname.startsWith("/contact-us"),
                  })}
                >
                  Contact Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { img?: string }
>(({ className, title, children, img, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={props.href as string}
          className={cn(
            "flex select-none gap-x-3 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {img ? (
            <Image src={img} width={50} height={50} alt="logo" className="size-10" />
          ) : (
            ""
          )}
          <div>
            <div className="mb-1 text-sm font-medium leading-none">{title}</div>
            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

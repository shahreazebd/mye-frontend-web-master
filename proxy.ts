import { NextRequest, NextResponse, ProxyConfig } from "next/server";

const protectedRoutes = new Set([
  "/dashboardnew",
  "/dashboard",
  "/inventory",
  "/settings/:id*",
  "/checkout/:id*",
  "/active-trial",
  "/order/:id*",
  "/reports/:id*",
  "/profile/:id*",
  "/messages",
  "/feedback",
  "/shipments",
]);

const wManagerAccess = new Set([
  "/dashboardnew",
  "/dashboard",
  "/settings/all-channels",
  "/reports",
  "/profile",
  "/messages",
  "/feedback",
]);

export async function proxy(request: NextRequest) {
  let accessToken = request.cookies.get("accessToken");

  if (
    accessToken &&
    request.cookies.get("userType")?.value === "w_manager" &&
    wManagerAccess.has(new URL(request.url).pathname)
  ) {
    return NextResponse.redirect(new URL("/inventory", request.url));
  }

  if (accessToken && request.cookies.get("userType")?.value === "child") {
    const pathname = new URL(request.url).pathname;

    if (pathname === "/settings" || pathname === "/settings/") {
      return NextResponse.redirect(new URL("/settings/reports/sales", request.url));
    }

    if (
      pathname.includes("/settings") &&
      !pathname.startsWith("/settings/reports/sales")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (!accessToken && protectedRoutes.has(new URL(request.url).pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    accessToken &&
    [
      "/shipping",
      "/integrations",
      "/about",
      // "/pricing",
      "/contact-us",
      "/login",
      "/register",
      "/verification",
      "/verify-identity",
    ].includes(new URL(request.url).pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config: ProxyConfig = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/shipping",
    "/integrations",
    "/integrations/:id*",
    "/about",
    "/pricing",
    "/blog",
    "/blog/:id*",
    "/contact-us",
    "/dashboard",
    "/inventory",
    "/settings/:id*",
    "/checkout/:id*",
    "/active-trial",
    "/order/:id*",
    "/reports/:id*",
    "/profile/:id*",
    "/messages",
    "/feedback",
  ],
};

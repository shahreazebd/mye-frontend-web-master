"use client";

import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";

export default function Username(props: { className: string }) {
  const { userInformation } = useAuth();

  return <h1 className={cn(props.className)}>{userInformation?.Name as string}</h1>;
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInventoryAtom } from "@/atoms/inventoryAtom";
import { History, RotateCw, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";
import useAuth from "@/hooks/custom/useAuth";

import LocationSelect from "../shared/location-select";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  refetch: any;
  isFetching: boolean;
};

export default function Header(props: Props) {
  const { setInventoryStore } = useInventoryAtom();

  const [search, setSearch] = useState("");
  const { userInformation } = useAuth();
  const pathName = usePathname();

  const onChange = (value: string) => {
    setInventoryStore((prev) => ({ ...prev, searchQuery: value }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const isViewOnly = userInformation?.permissions?.find(
    (p) => p.name === "inventory-view-only"
  );

  const isParent = ["owner", "parent"].includes(userInformation?.type!);

  return (
    <span className="flex items-center gap-2">
      <div className="flex items-center">
        <Input
          value={search}
          onChange={(e) => setSearch(e?.target?.value?.trim())}
          placeholder="Search..."
          className={`relative mr-2 h-[32px] pr-8 ${
            pathName === "/inventory" && "w-[270px]"
          }`}
        />
        {search ? (
          <X
            onClick={() => {
              setSearch("");
            }}
            className="z-20 -ml-6 size-4 cursor-pointer"
          />
        ) : (
          <span className="-ml-6 size-4"></span>
        )}
      </div>

      <Button
        className={`h-8 ${props.isFetching && "pointer-events-none  text-gray-400"}`}
        variant="outline"
        onClick={() => props.refetch()}
      >
        <RotateCw
          className={cn(
            "h-4 cursor-pointer text-gray-800",
            props.isFetching && "pointer-events-none animate-spin text-gray-400"
          )}
        />{" "}
        &nbsp;Refresh
      </Button>

      {!isViewOnly ||
        (isParent && (
          <Link
            href="/inventory/stock-request"
            className={cn(buttonVariants({ variant: "outline" }), "h-8")}
          >
            <History className="h-4" /> &nbsp;Stock Request
          </Link>
        ))}

      <LocationSelect />

      {!isViewOnly ||
        (isParent && (
          <Button
            variant="outline"
            className="h-8"
            onClick={() =>
              setInventoryStore((prev) => ({ ...prev, isSettingsSheetOpen: true }))
            }
          >
            <Upload className="h-4" /> &nbsp;Import
          </Button>
        ))}
    </span>
  );
}

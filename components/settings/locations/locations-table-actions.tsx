"use client";

import locationAtom from "@/atoms/locationAtom";
import { Location } from "@/schema/location";
import { useAtom } from "jotai";
import { Edit, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  data: Location;
}

export function LocationsTableActions({ data }: Props) {
  const [, setLocations] = useAtom(locationAtom);

  // const [alertOpen, setAlertOpen] = useState(false);

  const editSheetOpen = () => {
    setLocations((prev) => ({
      ...prev,
      singleLocation: data,
      isLocationEditSheetOpen: true,
    }));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={editSheetOpen}>
            <Edit className="text-muted-foreground/70 mr-2 size-3.5" />
            Edit
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>

          {/* <DropdownMenuItem onClick={() => setAlertOpen(true)}>
            <Trash className="text-muted-foreground/70 mr-2 size-3.5" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* {alertOpen && (
        <LocationDeleteALert
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          data={data}
        />
      )} */}
    </>
  );
}

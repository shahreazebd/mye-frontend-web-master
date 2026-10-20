"use client";

import { useState } from "react";
import { User } from "@/schema/users";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import useDeleteChildUser from "@/hooks/queries/user/useDeleteChildUser";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteAlert from "@/components/delete-alert";

import UsersEditSheet from "./user-edit-sheet";

interface Props {
  data: User;
}

export function UserTableActions({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const { mutate: deleteChildUser } = useDeleteChildUser();

  return (
    <>
      {data.type === "child" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => setIsEditSheetOpen(true)}>
              <Edit className="text-muted-foreground/70 mr-2 size-3.5" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
              }}
            >
              <Trash className="text-muted-foreground/70 mr-2 size-3.5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <UsersEditSheet
        isOpen={isEditSheetOpen}
        setIsOpen={setIsEditSheetOpen}
        data={data}
      />

      <DeleteAlert
        deletedItemName="User"
        removeFunction={() => {
          deleteChildUser(data.user_id);
        }}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

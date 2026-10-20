"use client";

import usersAtom from "@/atoms/usersAtom";
import { useAtom } from "jotai";
import { PlusCircle } from "lucide-react";

import useGetAllUsers from "@/hooks/queries/user/useGetAllUsers";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/core/data-table/data-table";

import UsersAddSheet from "./user-add-sheet";
import { columns } from "./user-column";

export default function UsersWrapper() {
  const [, setUsers] = useAtom(usersAtom);
  const { data, isLoading } = useGetAllUsers();

  const handelAddUserOpen = () => {
    setUsers((prev) => ({ ...prev, isUserAddSheetOpen: true }));
  };

  const components = (
    <Button variant="outline" className=" h-8 px-2 lg:px-3" onClick={handelAddUserOpen}>
      <PlusCircle className="mr-2 size-4" />
      Add New User
    </Button>
  );

  return (
    <>
      <DataTable
        data={data}
        searchColumn="email"
        searchPlaceholder="Search by email"
        loading={isLoading}
        columns={columns}
        component={components}
      />

      <UsersAddSheet />
    </>
  );
}

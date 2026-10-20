"use client";

import locationAtom from "@/atoms/locationAtom";
import { useAtom } from "jotai";
import { PlusCircle } from "lucide-react";

import useGetLocations from "@/hooks/queries/location/useGetLocations";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/core/data-table/data-table";

import { AddLocationSheet } from "./add-location-sheet";
import { EditLocationSheet } from "./edit-location-sheet";
import { columns } from "./location-columns";

export default function LocationWrapper() {
  const { data, isLoading } = useGetLocations();
  const [location, setLocations] = useAtom(locationAtom);

  const openSheet = () => {
    setLocations((prev) => ({ ...prev, isLocationAddSheetOpen: true }));
  };

  return (
    <>
      <DataTable
        component={
          <Button variant="outline" className="h-8" onClick={openSheet}>
            <PlusCircle className="mr-2 size-4" /> &nbsp;Add New
          </Button>
        }
        columns={columns}
        data={data ?? []}
        search={true}
        searchPlaceholder="Search locations name..."
        searchColumn="name"
        loading={isLoading}
        //   pagination={false}
      />

      <AddLocationSheet />
      {location.isLocationEditSheetOpen && <EditLocationSheet />}
    </>
  );
}

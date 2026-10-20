import locationAtom from "@/atoms/locationAtom";
import { useAtom } from "jotai";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LocationsHeader() {
  const [, setLocations] = useAtom(locationAtom);

  const openSheet = () => {
    setLocations((prev) => ({ ...prev, isLocationAddSheetOpen: true }));
  };

  return (
    <>
      <Button variant="outline" className="h-8" onClick={openSheet}>
        <PlusCircle className="mr-2 size-4" /> &nbsp;Add New
      </Button>
    </>
  );
}

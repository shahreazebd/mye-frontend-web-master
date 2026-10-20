import { useState } from "react";
import { Location } from "@/schema/location";
import { AlertTriangle } from "lucide-react";

import useAuth from "@/hooks/custom/useAuth";
import useDeleteLocation from "@/hooks/queries/location/useDeleteLocation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LocationDeleteALert({
  alertOpen,
  setAlertOpen,
  data,
}: {
  alertOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setAlertOpen: (open: boolean) => void;
  data: Location;
}) {
  const [inputValue, setInputValue] = useState("");

  const { mutate, isLoading } = useDeleteLocation();
  const { userInformation } = useAuth();

  const handleDeleteLocation = (id: number) => {
    mutate(
      {
        id,
        companyUid: userInformation?.company_uid as string,
      },
      {
        onSuccess: () => {
          setAlertOpen(false);
          setInputValue("");
        },
      }
    );
  };
  return (
    <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-2xl font-bold text-destructive">
            <AlertTriangle className="mr-2 size-6 text-destructive" />
            Permanently Delete Location
          </AlertDialogTitle>
          <AlertDialogDescription className="">
            <span className="font-bold text-red-400">WARNING:</span> This action{" "}
            <b>CANNOT</b> be undone. It will permanently delete <b>{data.name}</b> and all
            associated data. To confirm, type <b>&quot;{data.name}&quot;</b> below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="relative mt-4">
          <Input
            placeholder={`Type "${data.name}" to confirm deletion`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
        </div>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel
            onClick={() => {
              setInputValue("");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={inputValue !== data.name || isLoading}
            onClick={() => handleDeleteLocation(data.id)}
          >
            {isLoading ? "Deleting..." : "Permanently Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

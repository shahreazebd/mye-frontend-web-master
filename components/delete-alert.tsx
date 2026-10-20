import { Dispatch, SetStateAction } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type PropsType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  deletedItemName: string;
  removeFunction: () => void;
  isLoading?: boolean;
};

export default function DeleteAlert({
  open,
  setOpen,
  deletedItemName,
  removeFunction,
  isLoading = false,
}: PropsType) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent onClick={(event) => event.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {deletedItemName}{" "}
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            // onClick={onClose}
            className="border-0 bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-0"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={removeFunction}
            className="bg-red-100 text-red-700 hover:bg-red-200"
            disabled={isLoading}
          >
            Yes, delete {deletedItemName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

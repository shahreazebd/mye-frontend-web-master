import openOrderAtom from "@/atoms/openOrderAtom";
import { useAtom } from "jotai";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

interface Props {
  disabled: boolean;
  confirmFn: () => void;
}

export default function CancelOrderModal({ disabled = false, confirmFn }: Props) {
  const [openOrder, setOpenOrder] = useAtom(openOrderAtom);

  const closeCancelOrderModal = () => {
    setOpenOrder((prev) => ({ ...prev, isCancelOrderModalOpen: false }));
  };
  return (
    <>
      <Dialog
        open={openOrder?.isCancelOrderModalOpen}
        onOpenChange={closeCancelOrderModal}
      >
        <DialogContent className="w-[500px]">
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to cancel this order
              from MYE?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button disabled={disabled} type="submit" onClick={confirmFn}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

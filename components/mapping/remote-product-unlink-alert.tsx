import { useParams } from "next/navigation";
import { useUnlinkAlertStatus, useUnlinkRow } from "@/atoms/remoteProductsAtom";

import useAuth from "@/hooks/custom/useAuth";
import useCSVUnmapping from "@/hooks/queries/mapping/useCSVUnmapping";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function RemoteProductUnlinkAlert() {
  const { isUnlinkAlertOpen, setIsUnlinkAlertOpen } = useUnlinkAlertStatus();
  const { mutate: bulkUnmap, isLoading } = useCSVUnmapping();
  const params = useParams();

  const { unlinkRow } = useUnlinkRow();

  const { userInformation } = useAuth();

  function unmapHandler() {
    const remoteSku = unlinkRow?.remote_product_sku;

    if (!remoteSku) return;

    bulkUnmap({
      channelUid: params.channel_uid as string,
      companyUuid: userInformation?.company_uid || "",
      data: [remoteSku],
    });
  }

  return (
    <AlertDialog
      open={isUnlinkAlertOpen.isOpen}
      onOpenChange={() => setIsUnlinkAlertOpen((prev) => ({ ...prev, isOpen: false }))}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You cannot unlink this product</AlertDialogTitle>
          <AlertDialogDescription>
            {isUnlinkAlertOpen.description}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={unmapHandler} disabled={isLoading}>
            Unlink Anyway
          </AlertDialogAction>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

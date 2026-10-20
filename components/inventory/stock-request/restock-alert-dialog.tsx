import useAuth from "@/hooks/custom/useAuth";
import useApproveInventoryRequest from "@/hooks/queries/inventory/use-approve-inventory-request";
import useAddStock from "@/hooks/queries/inventory/useAddStock";
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
import { useToast } from "@/components/ui/use-toast";

export function RestockAlertDialog({ isOpen, setIsOpen, data }: any) {
  const { userInformation } = useAuth();
  const { mutate } = useAddStock();
  const { toast } = useToast();
  const { mutate: triggerApproveInventoryRequest } = useApproveInventoryRequest();

  const handleRestock = () => {
    if (!data?.location?.id) {
      return alert("Location id not found");
    }

    const filteredData = data?.data
      ?.filter((e: any) => e?.quantity !== 0)
      ?.map((product: any) => {
        return {
          ...product,
          location_id: data?.location?.id,
          company_uid: userInformation?.company_uid,
        };
      });

    mutate(filteredData, {
      onSuccess: () => {
        triggerApproveInventoryRequest(
          {
            company_uid: userInformation?.company_uid as string,
            uuid: data?.uuid,
            status: "SUCCESS",
          },
          {
            onSuccess: () => {
              alert("Stock added successfully");
              toast({
                title: "Success",
                description: "Stock added successfully",
              });
            },
          }
        );
      },
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action restock products. This will permanently restock your data and add
            data to our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRestock}>
            Yes, Restock Products
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

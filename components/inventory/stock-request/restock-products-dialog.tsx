import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCheck } from "lucide-react";

import { InventoryStockRequestData } from "@/types/inventory-stock-request";
import useAuth from "@/hooks/custom/useAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DataTable } from "@/components/core/data-table/data-table";
import { DataTableColumnHeader } from "@/components/core/data-table/data-table-column-header";
// import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { DataTableToolbar } from "@/components/core/data-table/data-table-toolbar";

import { RestockAlertDialog } from "./restock-alert-dialog";

const columns: ColumnDef<InventoryStockRequestData["data"]>[] | never[] = [
  {
    accessorKey: "sku",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
  },
  {
    accessorKey: "product_quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
  },
];

export function RestockProductsDialog({ isOpen, setIsOpen, data }: any) {
  const [isApprove, setIsApprove] = useState(false);
  const { userInformation } = useAuth();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className=" sm:max-w-[40%]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>

          <section>
            <DataTableToolbar />
            <DataTable
              className="max-h-[50vh] overflow-hidden 2xl:max-h-[65vh]"
              columns={columns}
              data={data?.data}
              search={false}
              pagination={false}
            />
          </section>
          {userInformation?.company_uid === "06c6bfb2-c090-4fb8-8971-2b3b7443908c" ? (
            <section className="flex w-full justify-center">
              <Button
                className="w-32 hover:bg-black/90"
                onClick={() => setIsApprove(true)}
              >
                <CheckCheck className="text-muted-foreground/70 mr-2 size-4" />
                Approve
              </Button>
            </section>
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
      <RestockAlertDialog data={data} isOpen={isApprove} setIsOpen={setIsApprove} />
    </>
  );
}

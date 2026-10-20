import Image from "next/image";
import { StockReport } from "@/schema/stock-report-schema";
import { ColumnDef } from "@tanstack/react-table";
import { CheckSquare, Copy } from "lucide-react";

import useSkuCopy from "@/hooks/custom/useSkuCopy";

import { DataTableColumnHeader } from "../../../core/data-table/data-table-column-header";

export const columns: ColumnDef<StockReport>[] = [
  {
    id: "#",
    accessorKey: "#",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },

  {
    accessorKey: "souce",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Souce" />,
    cell: (info) => {
      let image = "";
      switch (info.row.original?.souce) {
        case "amazon":
          image = "/images/logo/amazon.svg";
          break;
        case "ebay":
          image = "/images/logo/ebay.svg";
          break;

        case "shopify":
          image = "/images/logo/shopify.svg";
          break;
        case "woocommerce":
          image = "/images/logo/wooCommerce.svg";
          break;

        case "bigcommerce":
          image = "/images/logo/bigCommerce.svg";
          break;
        case "otto":
          image = "/images/logo/otto.svg";
          break;

        default:
          image = "/images/logo/otto.svg";
          break;
      }
      return (
        <div>
          <Image src={image} alt="image" height={10} width={80} />
        </div>
      );
    },
  },

  {
    accessorKey: "local_product_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Local Product Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("local_product_name")}</div>,
  },

  {
    accessorKey: "local_product_sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Local Product SKU" />
    ),
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { handleCopy, isClicked } = useSkuCopy();

      return (
        <div className="flex w-[280px] items-center">
          <div className="w-full text-left">{row?.original?.local_product_sku} </div>

          {isClicked ? (
            <CheckSquare className="ml-2 size-4 cursor-pointer text-green-600 transition ease-in-out" />
          ) : (
            <Copy
              onClick={() => handleCopy(row?.original?.local_product_sku)}
              className="ml-2 size-4 cursor-pointer transition ease-in-out"
            />
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "total_quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Quantity" />
    ),
    cell: ({ row }) => (
      <div className="w-[130px] text-center">{row.getValue("total_quantity")}</div>
    ),
  },

  {
    accessorKey: "total_sell",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Sell" />,
    cell: ({ row }) => (
      <div className="w-[100px] text-center">
        {Number(row.original.total_sell).toFixed(3)}
      </div>
    ),
  },
];

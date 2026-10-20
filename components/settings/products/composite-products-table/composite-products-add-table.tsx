"use client";

import { useEffect } from "react";
import { useCompositeProductsAtom } from "@/atoms/productsAtom";

import useGetProducts from "@/hooks/queries/product/use-get-products";
import { DataTable } from "@/components/core/data-table/data-table";

import { compositeProductAddColumns } from "./composite-product-table-columns";

export let allProductSelected = () => [] as number[];

export default function AddCompositeProductsTable({
  rowClickSelection,
}: {
  rowClickSelection?: boolean;
}) {
  const { data: products, isLoading } = useGetProducts();

  const { setCompositeProductsState } = useCompositeProductsAtom();

  useEffect(() => {
    if (products) {
      setCompositeProductsState((prev) => ({ ...prev, compositeProduct: products }));
    }
  }, [isLoading]);

  return (
    <DataTable
      columns={compositeProductAddColumns}
      data={products ?? []}
      // dataSize={12}
      loading={isLoading}
      paginationRowCountShow={false}
      singleRowSelection={false}
      rowClickSelection={rowClickSelection}
      noDataClassName="h-full"
      selectedRowData={(data) =>
        setCompositeProductsState((prev) => ({
          ...prev,
          selectedCompositeProduct: data,
        }))
      }
    />
  );
}

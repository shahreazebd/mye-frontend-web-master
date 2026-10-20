"use client";

import { channelAtom } from "@/atoms/channelAtom";
import { useAtom } from "jotai";

import useGetOrphanProducts from "@/hooks/queries/product/useGetOrphanProducts";
import { DataTable } from "@/components/core/data-table/data-table";

import ProductTopHeaderButtons from "./product-top-header-buttons";
import { columns } from "./products-column";

export let allProductSelected = () => [] as number[];

export default function ProductsHelthWrapper() {
  const [channelUid] = useAtom(channelAtom);
  const { data, isLoading } = useGetOrphanProducts(channelUid.uuid);

  return (
    <>
      <DataTable
        component={<ProductTopHeaderButtons />}
        columns={columns}
        data={data?.data.data ?? []}
        dataSize={10}
        loading={isLoading}
        pageOptions={[10, 50, 100]}
        paginationRowCountShow={true}
      />
    </>
  );
}

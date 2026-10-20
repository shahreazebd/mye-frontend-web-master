"use client";

import dynamic from "next/dynamic";
import productsAtom from "@/atoms/productsAtom";
import { useAtom } from "jotai";

import useGetProducts from "@/hooks/queries/product/use-get-products";
import { DataTable } from "@/components/core/data-table/data-table";

import { columns } from "./products-column";

const ProductTopHeaderButtons = dynamic(() => import("./product-top-header-buttons"), {
  ssr: false,
});
const MultipleProductAddSheet = dynamic(() => import("./multiple-product-add-sheet"), {
  ssr: false,
});
const ProductDetailsModal = dynamic(() => import("./product-details-modal"), {
  ssr: false,
});
const SingleProductAddSheet = dynamic(() => import("./single-product-add-sheet"), {
  ssr: false,
});
const SingleProductUpdateSheet = dynamic(() => import("./single-product-update-sheet"), {
  ssr: false,
});
const MultipleProductUpdateSheet = dynamic(
  () => import("./multiple-product-update-sheet"),
  {
    ssr: false,
  }
);

export let allProductSelected = () => [] as number[];

export default function ProductsWrapper() {
  const [products, setProduct] = useAtom(productsAtom);
  const { data, isLoading } = useGetProducts();

  allProductSelected = () => {
    return data?.map((product) => product.id) ?? ([] as number[]);
  };

  return (
    <>
      <DataTable
        component={<ProductTopHeaderButtons />}
        columns={columns}
        data={data}
        dataSize={100}
        loading={isLoading}
        pageOptions={[100, 200, 500]}
        singleRowSelection={false}
        paginationRowCountShow={true}
        selectedRowData={(data) =>
          setProduct((prev) => ({
            ...prev,
            selectedProducts: data.map((product) => product.id),
          }))
        }
      />

      <ProductDetailsModal />
      <SingleProductAddSheet />
      <MultipleProductAddSheet />
      <MultipleProductUpdateSheet />
      {products.isSingleProductEditSheet && <SingleProductUpdateSheet />}
    </>
  );
}

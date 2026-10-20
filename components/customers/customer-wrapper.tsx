"use client";

import { useCustomerPaginationAtom } from "@/atoms/customer-atom";

import { useGetCustomerList } from "@/hooks/queries/customers/use-get-customer-list";
import { DataTable2 } from "@/components/core/data-table/data-table-2";

import { columns } from "./customer-columns";
import { CustomerTableToolbar } from "./customer-table-toolbar";

export function CustomerWrapper() {
  const { customerListPagination, setCustomerListPagination } =
    useCustomerPaginationAtom();
  const { data: customerList, isLoading } = useGetCustomerList();

  return (
    <section>
      <CustomerTableToolbar
        title="Customers"
        description="Analyze your customers purchase behavior to increase sell"
      />

      <DataTable2
        header={false}
        columns={columns}
        data={customerList?.data}
        dataSize={100}
        pageOptions={[100, 500, 1000]}
        loading={isLoading}
        count={customerList?.count}
        pagination={customerListPagination}
        setPagination={setCustomerListPagination}
      />
    </section>
  );
}

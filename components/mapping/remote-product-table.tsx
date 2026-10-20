"use client";

import { useParams, useRouter } from "next/navigation";
import mappingAtom from "@/atoms/mappingAtom";
import { useRemoteProductFilterBy } from "@/atoms/remoteProductsAtom";
import { useAtom } from "jotai";

import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import useGetRemoteProducts from "@/hooks/queries/mapping/useGetRemoteProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/core/data-table/data-table";

import { Button } from "../ui/button";
import { colFunc } from "./remote-product-column";
import RemoteProductHeader from "./remote-product-header";
import { RemoteProductUnlinkAlert } from "./remote-product-unlink-alert";

export default function RemoteProductTable() {
  const { data, isLoading } = useGetRemoteProducts();
  const [, setMapping] = useAtom(mappingAtom);
  const { remoteProductsFilterBy } = useRemoteProductFilterBy();
  const router = useRouter();

  const filteredData = data?.data?.filter((e) => {
    if (remoteProductsFilterBy.linked === "link") {
      return e.mapping !== null;
    } else if (remoteProductsFilterBy.linked === "unlink") {
      return e.mapping === null;
    } else {
      return e;
    }
  });

  const params = useParams();

  const { data: channelDetails, status } = useGetChannelDetails(
    params.channel_uid as string
  );

  return (
    <div className="col-span-3">
      <div className="flex items-center justify-between">
        <div>
          {status === "loading" ? (
            <Skeleton className="mb-2 h-[20px] w-[400px] bg-gray-200" />
          ) : (
            <h5 className="flex items-center gap-3">
              <span className="inline-block max-w-80 truncate">
                {channelDetails?.name}
              </span>{" "}
              - Remote Products
            </h5>
          )}

          {data ? (
            <div>
              <b>Total:</b> {data?.total_remote_product} &nbsp;&nbsp;
              <b>Linked:</b> {data?.total_mapped_remote_product} &nbsp;&nbsp;
              <b>Unlinked:</b> {data?.unmapped_remote_product} &nbsp;&nbsp;
              <b>FB:</b> {data?.fba_count}
            </div>
          ) : (
            <div className="flex gap-2">
              <Skeleton className="h-[20px] w-[80px] bg-gray-200" />
              <Skeleton className="h-[20px] w-[80px] bg-gray-200" />
              <Skeleton className="h-[20px] w-[80px] bg-gray-200" />
              <Skeleton className="h-[20px] w-[80px] bg-gray-200" />
            </div>
          )}
        </div>

        <Button
          size="sm"
          variant="outline"
          className="mr-5 flex h-[32px] items-center gap-2"
          onClick={() => router.push("/orphan-products")}
        >
          Orphan Products
        </Button>
      </div>

      <DataTable
        columns={colFunc(channelDetails?.channel_type || "")}
        component={<RemoteProductHeader channelType={channelDetails?.channel_type} />}
        data={filteredData}
        dataSize={50}
        pageOptions={[50, 100, 200, 500]}
        loading={isLoading}
        searchColumn="remote_product_sku"
        searchPlaceholder="Search by SKU..."
        selectedRowData={(rows) => {
          rows?.length &&
            setMapping((prev) => ({ ...prev, remoteProductId: rows[0]?.remote_id }));
        }}
      />

      <RemoteProductUnlinkAlert />
    </div>
  );
}

"use client";

import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

import type { Postage } from "@/types/postage";
import useAuth from "@/hooks/custom/useAuth";
import useGetAllPostage from "@/hooks/queries/postage/useGetAllPostage";

import { DataTableLoading } from "../data-table-loading";
import { Card } from "../ui/card";
import { PostageFilters } from "./postage-filters";
import PostageOrderDetailsDialog from "./postage-order-details-dialog";
import { PostageTableBody } from "./postage-table-body";

export default function PostageWrapper() {
  const { data, isLoading } = useGetAllPostage();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Postage</h2>
          <p className="text-sm text-muted-foreground">Manage All Postage</p>
        </div>
        <PostageFilters />
      </div>

      {isLoading ? (
        <DataTableLoading columnCount={7} rowCount={18} />
      ) : (
        <Card className="relative w-full overflow-hidden">
          <div className="max-h-[calc(100vh-200px)] w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="sticky top-0 z-[1] border-b bg-white">
                <tr>
                  <th className="h-12 px-6 text-left font-medium">Channel</th>
                  <th className="h-12 px-6 text-left font-medium">Details</th>
                  <th className="h-12 px-6 text-center font-medium">Orders</th>
                  <th className="h-12 px-6 text-center font-medium">Success</th>
                  <th className="h-12 px-6 text-center font-medium">Failed</th>
                  <th className="h-12 px-6 text-center font-medium">Merged</th>
                  <th className="h-12 px-6 text-center font-medium">Postage</th>
                  <th className="h-12 px-6 text-left font-medium">Percentage</th>
                  <th className="h-12 px-6 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!data || data?.length < 1 ? (
                  <tr>
                    <td colSpan={9}>
                      <div className="mx-auto flex h-[calc(100vh-260px)] w-full flex-col items-center justify-center">
                        <Image
                          src="/images/no-data.png"
                          alt="no-data"
                          width={150}
                          height={150}
                        />
                        <p className="mt-1 text-sm text-[#8ba7b2]">No data!</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.map((postage: Postage) => (
                    <PostageTableBody key={postage?._id} postage={postage} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <PostageOrderDetailsDialog />
    </>
  );
}

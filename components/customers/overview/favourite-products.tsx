"use client";

import { Fragment } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import { useGetCustomerDetails } from "@/hooks/queries/customers/use-get-customer-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ProductDetails = {
  status: string;
  value: Value;
};

export type Value = {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  purchase_price: string;
  selling_price: string;
  is_composite: boolean;
  is_child: boolean;
  image: null | string;
  weight: string;
  height: string;
  width: string;
  depth: string;
  company_uid: string;
  stock_notification: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function getProductDetails({ company_uid, sku }: { company_uid: string; sku: string[] }) {
  const promises = sku.map((e) => {
    return fetch
      .get("/miams/api/v1/mapping/product/local-product/all-local-product", {
        params: {
          company_uid,
          sku: e,
        },
      })
      .then((res) => res.data.data[0]);
  });

  return Promise.allSettled(promises);
}

export default function FavouriteProducts() {
  const searchParams = useSearchParams();
  const urlParams = useParams();

  const { userInformation } = useAuth();

  const { data: customerDetails } = useGetCustomerDetails(
    decodeURI(urlParams.slug as string),
    searchParams.get("phone") as string
  );

  const { data: favoriteProductDetails } = useQuery({
    queryKey: ["dd"],
    queryFn: () =>
      getProductDetails({
        company_uid: userInformation?.company_uid as string,
        sku: customerDetails?.favourite_items.map((e) => e.local_sku)!,
      }),

    enabled:
      !!userInformation?.company_uid &&
      !!customerDetails?.favourite_items.map((e) => e.local_sku).length,
  });

  return (
    <Card className="w-5/12">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">Favourite Products</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-16">
          {(favoriteProductDetails as ProductDetails[])?.map((pd, i) => {
            return (
              <Fragment key={i}>
                {i === 0 && (
                  <div className="w-fit">
                    <div className="relative mb-6 w-fit rounded-lg text-center">
                      {pd.value.image ? (
                        <Image
                          height={500}
                          width={500}
                          src={pd.value.image}
                          alt="Product Image"
                          className="h-56 w-48 rounded-2xl bg-[#f6f6f6] object-contain"
                        />
                      ) : (
                        <Image
                          height={500}
                          width={500}
                          src="/images/no-image-available.svg"
                          alt="Product Image"
                          className="h-56 w-48 rounded-2xl border border-slate-100 object-contain p-14"
                        />
                      )}

                      {/* <div className="absolute -bottom-2.5 left-1/2 w-28 -translate-x-1/2 rounded-full bg-orange-600 px-3 text-sm font-medium text-white">
                        954 Ordered
                      </div> */}
                    </div>
                    <div>
                      <div className="truncate text-sm font-semibold">
                        {pd.value.name}
                      </div>
                      <div className="text-sm text-slate-500">{pd.value.sku}</div>
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}

          <div>
            {(favoriteProductDetails as ProductDetails[])?.map((pd, i) => {
              return (
                <Fragment key={i}>
                  {i > 0 && (
                    <div className="mb-6 flex items-center gap-4">
                      <div className="relative w-fit rounded-lg text-center">
                        {pd.value.image ? (
                          <Image
                            height={500}
                            width={500}
                            src={pd.value.image}
                            alt="Product Image"
                            className="h-32 w-28 rounded-2xl bg-[#f6f6f6] object-contain"
                          />
                        ) : (
                          <Image
                            height={500}
                            width={500}
                            src="/images/no-image-available.svg"
                            alt="Product Image"
                            className="h-32 w-28 rounded-2xl border border-slate-100 object-contain p-7"
                          />
                        )}

                        {/* <div className="absolute -bottom-2 left-1/2 w-24 -translate-x-1/2 rounded-full bg-orange-600 px-3 text-xs font-medium text-white">
                          954 Ordered
                        </div> */}
                      </div>
                      <div>
                        <div className="truncate text-sm font-semibold">
                          {pd.value.name}
                        </div>
                        <div className="text-sm text-slate-500">{pd.value.sku}</div>
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

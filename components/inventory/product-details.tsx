// import { ElementRef, useRef, useState } from "react";
import Image from "next/image";
import { useInventoryAtom } from "@/atoms/inventoryAtom";

// import useSetOrderThreshold from "@/hooks/queries/inventory/use-set-order-threshold";
import useGetProductDetails from "@/hooks/queries/inventory/useGetProductDetails";
import useUpdateProduct from "@/hooks/queries/product/use-update-product";
import { Switch } from "@/components/ui/switch";

export default function ProductDetails() {
  const { inventoryStore } = useInventoryAtom();

  const { data: productDetails } = useGetProductDetails(inventoryStore?.localProductId);

  const { mutate: updateProduct } = useUpdateProduct();

  // const [isSellsLimitDisabled, setIsSellsLimitDisabled] = useState(true);
  // const sellsLimitThresholdRef = useRef<ElementRef<"input">>(null);

  // const { mutate, isLoading } = useSetOrderThreshold();

  // function setOrderThresholdHandler() {
  //   if (productDetails && sellsLimitThresholdRef?.current) {
  //     const payload = {
  //       sku: productDetails?.sku,
  //       company_uid: productDetails?.company_uid,
  //       order_threshold: sellsLimitThresholdRef?.current?.valueAsNumber,
  //       location_id: inventoryStore?.locationId,
  //       order_threshold_status: true,
  //     };

  //     mutate(payload);
  //   }
  // }

  return (
    <div className="mt-5">
      <div className="flex gap-10">
        <div className="pl-2">
          {productDetails?.image ? (
            <Image
              height={600}
              width={400}
              src={productDetails?.image}
              alt="Product Image"
              className="rounded-lg border-4 border-gray-200"
            />
          ) : (
            <Image
              height={600}
              width={400}
              src="/images/no-image-available.svg"
              alt="Product Image"
              className="rounded-lg border-4 border-slate-200 p-32"
            />
          )}
        </div>

        <div className="w-[600px] items-center divide-y divide-blue-200">
          <div className="py-5">
            <p className="mb-1 text-3xl font-semibold text-slate-900">
              {productDetails?.name}
            </p>
            <p className="text-base font-normal text-gray-400">{productDetails?.sku}</p>
          </div>

          <div className="flex py-5">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-400">Purchase price</p>
              <p className="mt-2 text-2xl font-bold text-indigo-900">
                {productDetails?.purchase_price}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-400">Selling price</p>
              <p className="mt-2 text-2xl font-bold text-indigo-900">
                {productDetails?.selling_price}
              </p>
            </div>
          </div>

          <div className="flex justify-between py-5">
            <div>
              <p className="text-xs font-medium text-gray-400">Length</p>
              <p className="mt-2 text-2xl font-bold text-indigo-900">
                {productDetails?.depth}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Weight</p>
              <p className="mt-2 text-2xl font-bold text-indigo-900">
                {productDetails?.weight}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Height</p>
              <p className="mt-2 text-2xl font-bold text-indigo-900">
                {productDetails?.height}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Width</p>
              <p className="mt-2 text-2xl font-bold text-indigo-900">
                {productDetails?.width}
              </p>
            </div>
          </div>

          <div className="flex justify-between py-5">
            <div>
              <p className="text-xs font-medium text-gray-400">Product type</p>
              <p className="mt-2 text-2xl font-bold text-indigo-900">
                {productDetails?.is_child ? "Parent" : "Child"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Composite</p>
              <p className="mt-2 text-center text-2xl font-bold text-indigo-900">
                {productDetails?.is_composite ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Stock notification</p>
              <div className="mt-3.5 flex items-center space-x-1">
                <Switch
                  checked={productDetails?.stock_notification as boolean}
                  id="stock-notification-switch"
                  onCheckedChange={() => {
                    updateProduct({
                      indentifier: {
                        id: productDetails?.id as number,
                        sku: productDetails?.sku as string,
                        company_uuid: productDetails?.company_uid,
                      },
                      data: {
                        stock_notification: !productDetails?.stock_notification,
                      },
                    });
                  }}
                />
                <p className="text-xs font-medium text-gray-400">
                  {productDetails?.stock_notification ? "(Enabled)" : "(Disabled)"}
                </p>
              </div>
            </div>

            {/* <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  onCheckedChange={(value) => {
                    setIsSellsLimitDisabled(!value as boolean);
                  }}
                />

                <label htmlFor="terms" className="text-xs font-medium text-gray-400">
                  Daily Sells Limit
                </label>
              </div>
              <div className="mt-2 flex items-center gap-x-1">
                <Input
                  type="number"
                  className="h-8 w-16"
                  disabled={isSellsLimitDisabled || isLoading}
                  ref={sellsLimitThresholdRef}
                />
                <Button
                  type="button"
                  size="sm"
                  disabled={isSellsLimitDisabled || isLoading}
                  onClick={setOrderThresholdHandler}
                >
                  Set
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

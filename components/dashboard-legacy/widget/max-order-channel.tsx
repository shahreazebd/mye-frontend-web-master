import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// import useGetChannels from "@/hooks/queries/channel/useGetChannels";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

dayjs.extend(relativeTime);

export default function MaxOrderChannel() {
  // const { data } = useGetChannels();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Maximum Orders From</CardTitle>
        <CardDescription>See when your channels will expire</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[265px] overflow-y-scroll">
          <div className="mb-4 flex gap-3">
            <Avatar className="size-9 shrink-0 sm:flex">
              <AvatarImage src={`/logos/marketplaces/round/amazon.svg`} alt="Amazon" />
              <AvatarFallback className="uppercase">amazon</AvatarFallback>
            </Avatar>
            <div className="grid">
              <p className="pb-0.5 text-xs font-medium text-gray-800">Amazon</p>

              <p className="ml-8 text-xs text-gray-500">LC Amazon</p>
              <p className="ml-8 text-xs text-gray-500">Rough&Tough Amazon</p>
              <p className="ml-8 text-xs text-gray-500">Prosizzling Amazon</p>
            </div>
            <div className="ml-auto mr-10">
              <div className="text-lg font-medium text-gray-800">Total Orders 9789</div>

              <div className="ml-1 text-xs text-gray-500">7984 Orders</div>
              <div className="ml-1 text-xs text-gray-500">1127 Orders</div>
              <div className="ml-1 text-xs text-gray-500">678 Orders</div>
            </div>
          </div>
          <div className="mb-4 flex gap-3">
            <Avatar className="size-9 shrink-0 sm:flex">
              <AvatarImage src={`/logos/marketplaces/round/ebay.svg`} alt="eBay" />
              <AvatarFallback className="uppercase">ebay</AvatarFallback>
            </Avatar>
            <div className="grid">
              <p className="pb-0.5 text-lg font-medium text-gray-800">eBay</p>

              <p className="ml-8 text-xs text-gray-500">Strom Island UK</p>
              <p className="ml-8 text-xs text-gray-500">Prosizzling Ebay UK</p>
              <p className="ml-8 text-xs text-gray-500">Apparel21</p>
              <p className="ml-8 text-xs text-gray-500">Rough&Tough eBay</p>
            </div>
            <div className="ml-auto mr-10">
              <div className="text-lg font-medium text-gray-800">Total Orders 7589</div>

              <div className="ml-1 text-xs text-gray-500">3686 Orders</div>
              <div className="ml-1 text-xs text-gray-500">1766 Orders</div>
              <div className="ml-1 text-xs text-gray-500">1262 Orders</div>
              <div className="ml-1 text-xs text-gray-500">875 Orders</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Avatar className="size-9 shrink-0 sm:flex">
              <AvatarImage
                src={`/logos/marketplaces/round/woocommerce.svg`}
                alt="WooCommerce"
              />
              <AvatarFallback className="uppercase">woocommerce</AvatarFallback>
            </Avatar>
            <div className="grid">
              <p className="pb-0.5 text-lg font-medium text-gray-800">WooCommerce</p>

              <p className="ml-8 text-xs text-gray-500">AFS Fashion</p>
              <p className="ml-8 text-xs text-gray-500">Long Island City</p>
              <p className="ml-8 text-xs text-gray-500">Westace London</p>
              <p className="ml-8 text-xs text-gray-500">Rough&Tough Woocommerce</p>
            </div>
            <div className="ml-auto mr-10">
              <div className="text-lg font-medium text-gray-800">Total Orders 3589</div>

              <div className="ml-1 text-xs text-gray-500">1286 Orders</div>
              <div className="ml-1 text-xs text-gray-500">857 Orders</div>
              <div className="ml-1 text-xs text-gray-500">750 Orders</div>
              <div className="ml-1 text-xs text-gray-500">696 Orders</div>
            </div>
          </div>

          {/*           
            <div key={id} className="mb-3 flex items-center gap-4">
              <Avatar className=" h-7 w-7 shrink-0 sm:flex">
                <AvatarImage
                  src={`/logos/marketplaces/round/${e?.channel_type}.svg`}
                  alt="Avatar"
                />
                <AvatarFallback className="uppercase">
                  {e?.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid">
                <p className="pb-0.5 text-xs text-gray-800">{e?.name}</p>
                <p className="text-[11px] leading-none text-gray-500">
                  {e?.channel_type}
                </p>
              </div>
              <div className="ml-auto mr-4 text-xs text-rose-700">
                {!e?.expires_on ? "N/A" : dayjs(e?.expires_on).format("D MMM, YYYY")}
              </div>
            </div> */}
        </div>
      </CardContent>
    </Card>
  );
}

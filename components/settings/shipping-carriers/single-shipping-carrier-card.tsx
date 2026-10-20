import Image from "next/image";
import { ShippingCarrier } from "@/schema/shipping-carrier";

import { DataTable } from "@/components/core/data-table/data-table";

import { columns } from "./shipping-carrier-column";
import { ShippingCarrierEditSheet } from "./shipping-carrier-edit-sheet";

interface SingleChannelCardProps {
  data: ShippingCarrier[] | undefined;
  isLoading: boolean;
  logo: string;
  alt: string;
}

export default function SingleShippingCarrierCard({
  data,
  isLoading,
  logo,
  alt,
}: SingleChannelCardProps) {
  return (
    <div>
      <div className="mb-5 flex items-center">
        <Image src={logo} alt={alt} width={50} height={50} />
        <h5 className="ml-5 text-xl">{alt}</h5>
      </div>

      <div className="mb-5 rounded-lg border ">
        <DataTable
          className="border-none"
          columns={columns}
          data={data ?? []}
          header={false}
          search={true}
          searchPlaceholder="Search channel name..."
          searchColumn="name"
          loading={isLoading}
          pagination={false}
        />
      </div>

      <ShippingCarrierEditSheet />
    </div>
  );
}

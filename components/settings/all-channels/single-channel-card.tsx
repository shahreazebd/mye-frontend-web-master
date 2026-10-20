import Image from "next/image";
import { Channel } from "@/schema/channel";

import { DataTable } from "@/components/core/data-table/data-table";

import { columns } from "./channels-columns";

interface SingleChannelCardProps {
  data: Channel[] | undefined;
  isLoading: boolean;
  logo: string;
  alt: string;
}

export default function SingleChannelCard({
  data,
  isLoading,
  logo,
  alt,
}: Readonly<SingleChannelCardProps>) {
  return (
    <div>
      <div className="mb-5 flex items-center">
        <Image src={logo} alt={alt} width={50} height={50} />
        <h5 className="ml-5 text-xl capitalize">{alt}</h5>
      </div>

      <div className="mb-5 rounded-lg border">
        <DataTable
          className="border-none"
          columns={columns}
          data={data}
          header={false}
          search={true}
          searchPlaceholder="Search channel name..."
          searchColumn="name"
          loading={isLoading}
          pagination={false}
        />
      </div>
    </div>
  );
}

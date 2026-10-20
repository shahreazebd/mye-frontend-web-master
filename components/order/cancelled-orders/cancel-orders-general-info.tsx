import dayjs from "dayjs";

import { CopyText } from "@/components/shared/copy-text";

function CancelOrdersGeneralInfo({ info }: any) {
  return (
    <div className="w-[200px]">
      <span className="mb-1 flex items-center gap-x-1 font-medium">
        {info?.row?.original?.channel_order_id}

        <CopyText text={info.row.original?.channel_order_id} />
      </span>
      <span className="text-xs">
        {dayjs(info.row.original?.purchase_date).format("DD/MM/YYYY, h:mm a")}
      </span>
    </div>
  );
}

export default CancelOrdersGeneralInfo;

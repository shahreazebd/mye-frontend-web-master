import dayjs from "dayjs";
import { CheckCheck, Copy } from "lucide-react";

import useSkuCopy from "@/hooks/custom/useSkuCopy";

function OpenOrdersGeneralInfo({ info }: any) {
  const { handleCopy, isClicked } = useSkuCopy();

  return (
    <div className="group relative pr-4">
      <div className=" inline-flex items-center gap-x-1 text-xs font-medium">
        <div className={`${info?.row?.original?.duplicate && "text-[#ee1e5f]"}`}>
          {info?.row?.original?.channel_order_id}
        </div>
        {isClicked ? (
          <CheckCheck className="absolute right-0 size-3 cursor-pointer font-thin text-green-700 transition ease-in-out" />
        ) : (
          <Copy
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(info?.row?.original?.channel_order_id);
            }}
            className="absolute right-0 hidden size-3 animate-pulse cursor-pointer font-thin transition ease-in-out hover:duration-0 group-hover:block"
          />
        )}
      </div>
      <div className="text-[11px] text-slate-600">
        {dayjs(info?.row?.original?.purchase_date).format("DD-MM-YYYY h:mma")}
      </div>
    </div>
  );
}

export default OpenOrdersGeneralInfo;

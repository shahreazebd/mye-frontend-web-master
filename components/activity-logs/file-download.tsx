import { useRef, useState } from "react";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import { CSVLink } from "react-csv";

import { useToast } from "../ui/use-toast";

const NOTIFICATION_TYPES = [
  "missing_stock_update",
  "platform_inventory",
  "failed_order_tracker",
  "lost_trackers",
];

export default function FileDownload({ activityLog }: any) {
  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const [csvData, setCsvData] = useState([]);
  const { toast } = useToast();

  const downloadErrorReport = () => {
    setCsvData(activityLog?.failed_data);

    toast({
      title: "File is downloading...",
      description: "Please wait",
    });

    setTimeout(() => {
      csvLink?.current?.link?.click();
    }, 100);
  };

  return (
    <>
      {NOTIFICATION_TYPES?.includes(activityLog?.type) ? (
        <>
          <div className="da-mt-12" onClick={downloadErrorReport}>
            <div>
              <div>
                <Download size={20} />
              </div>
            </div>
            <div>
              <p>file.csv</p>
            </div>
          </div>

          <CSVLink
            data={csvData}
            filename={`${dayjs().format("M D Y - h mm a")}.csv`}
            ref={csvLink}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

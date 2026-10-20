import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { flattenObject, removeSpecialChar } from "@/utils/helpers";
import { Download, Loader2 } from "lucide-react";
import { CSVLink } from "react-csv";

import fetch from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";
import useGetRemoteProducts from "@/hooks/queries/mapping/useGetRemoteProducts";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { RetrieveProductsButton } from "./retrieve-products-button";

function RemoteProductHeader({ channelType }: Readonly<{ channelType?: string }>) {
  const [csvData, setCsvData] = useState([]);
  const csvLink = useRef<any>(null);
  const { toast } = useToast();
  const pathName = usePathname();
  const { userInformation } = useAuth();

  const { refetch, isFetching } = useGetRemoteProducts();

  const channelUid = pathName.split("/")[2];

  async function handleDownloadReport() {
    try {
      const URL = `/miams/api/v1/mapping/mapped-product/${userInformation?.company_uid}/${channelUid}/`;
      const { data: remoteProducts } = await fetch.get(URL);
      const flat = remoteProducts.data.map((e: any) => flattenObject(e));
      setCsvData(removeSpecialChar(flat));

      setTimeout(() => {
        csvLink.current.link.click();

        toast({
          title: "Success",
          description: "File downloaded successfully",
        });
      }, 500);
    } finally {
      //
    }
  }

  return (
    <section className="flex gap-4">
      <RetrieveProductsButton channelUid={channelUid} channelType={channelType} />

      <Button
        variant="outline"
        size="sm"
        className="flex h-[32px] items-center gap-2"
        onClick={() => refetch()}
        disabled={isFetching}
      >
        {isFetching && <Loader2 size={14} className="animate-spin" />} Reload
      </Button>

      <Button
        variant="default"
        size="sm"
        className="flex h-[32px] items-center gap-2"
        onClick={handleDownloadReport}
      >
        <Download size={14} /> Download
      </Button>

      <CSVLink data={csvData} filename={`file.csv`} ref={csvLink} />
    </section>
  );
}

export default RemoteProductHeader;

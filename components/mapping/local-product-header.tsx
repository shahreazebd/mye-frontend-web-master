import React, { useRef, useState } from "react";
import { Download } from "lucide-react";
import { CSVLink } from "react-csv";

import useGetLocalProducts from "@/hooks/queries/mapping/useGetLocalProducts";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

function LocalProductHeader() {
  const csvLinkDownload = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);
  const [csvData, setCsvData] = useState<any>([]);

  const { toast } = useToast();

  const { data } = useGetLocalProducts();

  const handleDownloadReport = () => {
    const mappedData = data?.map((e) => ({ Name: e.name, SKU: e.sku }));

    setCsvData(mappedData);

    setTimeout(() => {
      csvLinkDownload.current?.link.click();

      toast({
        title: "Success",
        description: "File downloaded successfully",
      });
    }, 500);
  };

  return (
    <>
      <Button
        variant="default"
        size="sm"
        className="flex h-[32px] items-center gap-2"
        onClick={handleDownloadReport}
      >
        <Download size={14} /> Download
      </Button>
      <CSVLink data={csvData} filename={`file.csv`} ref={csvLinkDownload} />
    </>
  );
}

export default LocalProductHeader;

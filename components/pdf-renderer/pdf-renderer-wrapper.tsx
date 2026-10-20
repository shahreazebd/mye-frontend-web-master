"use client";

import { ChangeEvent, useState } from "react";
import { openErrorNotification } from "@/utils/notification";
import xior from "xior";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card } from "../ui/card";

export function PdfRenderWrapper() {
  const [loading, setLoading] = useState(false);
  const [pdf, setPdf] = useState<File | null>(null);
  const [csv, setCsv] = useState<File | null>(null);

  const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdf(e.target.files[0]);
    }
  };

  const handleCsvChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsv(e.target.files[0]);
    }
  };

  function downloadPDF(pdf: any) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = new Date().toUTCString();
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  const handelSubmit = async () => {
    if (!pdf || !csv) {
      return openErrorNotification({ description: "Please select both files" });
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("pdf_file", pdf);
      formData.append("csv_file", csv);
      const response = await xior.post(
        "https://api-sandbox.manageyourecommerce.com/dhl/api/v1/dhl/pdf-reorder/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
          },
        }
      );

      downloadPDF(response?.data?.data);
    } catch (error: any) {
      openErrorNotification({ description: error?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-[80vh] w-full items-center justify-center">
      <Card className="mx-auto w-1/2 p-10">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label htmlFor="postage">Postage PDF</Label>
            <Input
              id="postage"
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
            />
          </div>

          <div>
            <Label htmlFor="order">Order CSV</Label>
            <Input
              id="order"
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleCsvChange}
            />
          </div>

          <div>
            <Button disabled={loading} loading={loading} onClick={handelSubmit}>
              Download PDF
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}

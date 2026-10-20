"use client";

import { ReactNode, useRef, useState } from "react";
import { downloadXlsx } from "@/utils/helpers";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import { CSVLink } from "react-csv";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useToast } from "../ui/use-toast";

type Props<T> = {
  data: T[] | undefined;
  filename?: string;
  additionalHeader?: ReactNode;
  showPdf?: boolean;
};

export function DownloadReport<T extends Record<string, unknown>>({
  data,
  filename,
  additionalHeader,
  showPdf = true,
}: Readonly<Props<T>>) {
  const { toast } = useToast();

  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  const [isPdfDownloadPending, setIsPdfDownloadPending] = useState(false);

  function downloadCsv() {
    if (!data || data.length === 0) {
      return toast({
        title: "No Data found",
        description: "There is no data to download CSV",
      });
    }

    csvLink.current?.link.click();
  }

  async function downloadPdf(rows: Record<string, string>[]) {
    if (!rows || rows.length === 0) {
      return toast({
        title: "No Data found",
        description: "There is no data to download pdf",
      });
    }

    try {
      setIsPdfDownloadPending(true);

      const { jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");

      const doc = new jsPDF();

      // Title & Date text
      const dateText = `Date: ${dayjs().format("DD MMMM YYYY")}, Time: ${dayjs().format(
        "hh:mm A"
      )}`;
      doc.setFontSize(10);
      doc.setTextColor(100);

      // Page width for centering text
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.text(dateText, pageWidth / 2, 15, { align: "center" });

      let startY = 22;

      // Handle additionalHeader if present
      if (additionalHeader) {
        const headerText =
          typeof additionalHeader === "string" || typeof additionalHeader === "number"
            ? String(additionalHeader)
            : "";
        if (headerText) {
          doc.setFontSize(11);
          doc.setTextColor(50);
          doc.text(headerText, pageWidth / 2, startY, { align: "center" });
          startY += 8;
        }
      }

      // Headers and data preparation
      const headers = Object.keys(rows[0]);
      const data = rows.map((row) => Object.values(row).map((val) => String(val)));

      // Generate the elegant table
      autoTable(doc, {
        head: [headers],
        body: data,
        startY: startY,
        theme: "striped",
        headStyles: {
          fillColor: [59, 130, 246], // Premium indigo-blue header
          textColor: 255,
          fontStyle: "bold",
          halign: "left",
        },
        bodyStyles: {
          textColor: 50,
          fontSize: 9,
        },
        alternateRowStyles: {
          fillColor: [250, 250, 250],
        },
        margin: { left: 14, right: 14 },
      });

      doc.save(
        filename
          ? `${filename}.pdf`
          : `${dayjs().format("ddd, MMM D, YYYY H-mm-ss Z")}.pdf`
      );

      toast({
        title: "Success",
        description: "PDF downloaded successfully",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF",
      });
    } finally {
      setIsPdfDownloadPending(false);
    }
  }

  function downloadReport() {
    if (!data || data.length === 0) {
      return toast({
        title: "No Data found",
        description: "There is no data to download XLSX",
      });
    }

    downloadXlsx(
      data as Record<string, unknown>[],
      filename
        ? `${filename}.xlsx`
        : `report_${dayjs().format("YYYY-MM-DD_HH-mm-ss")}.xlsx`
    );

    toast({
      title: "Success",
      description: "File downloaded successfully",
    });
  }

  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 px-2">
            <Download className="size-4" strokeWidth={1.3} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {showPdf && (
            <DropdownMenuItem
              disabled={isPdfDownloadPending}
              onClick={() => downloadPdf((data ?? []) as Record<string, string>[])}
            >
              Download PDF
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={downloadCsv}>Download CSV</DropdownMenuItem>

          <DropdownMenuItem
            disabled={!data || data.length === 0}
            onClick={downloadReport}
          >
            Download XLSX
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CSVLink
        data={data || []}
        filename={filename || `${dayjs().toISOString()}.csv`}
        ref={csvLink}
        className="hidden"
      />
    </section>
  );
}

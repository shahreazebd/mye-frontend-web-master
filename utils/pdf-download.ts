// utils/download.ts
export function downloadPDF(data: Blob, filename = "merged.pdf") {
  try {
    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    throw new Error("Failed to download PDF");
  }
}

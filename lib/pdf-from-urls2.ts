import fetch from "@/config/xior";

export default async function getPdfFromUrl2(urls: string[]) {
  try {
    const response = await fetch.post(
      "https://api.manageyourecommerce.com/mps/utils/pdf/merge",
      { urls, scale: 1 },
      { responseType: "blob" }
    );

    // Create a blob URL for the returned PDF
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

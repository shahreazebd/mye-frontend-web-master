import fetch from "@/config/xior";

export default async function getPdfFromUrls(urls: string[]) {
  try {
    const { data } = await fetch.post(
      `https://api.manageyourecommerce.com/postage-storage/api/v1/utils/pdf/merge?type=pdf`,
      {
        urls: urls,
      }
    );

    return data.base64;
  } catch (error) {
    console.log(error);
  }
}

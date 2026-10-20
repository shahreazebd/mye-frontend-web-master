import { useState } from "react";
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import ReSizer from "react-image-file-resizer";
import xior from "xior";

const resizeFile = (file: any) =>
  new Promise((resolve) => {
    ReSizer.imageFileResizer(
      file,
      400,
      400,
      "JPEG",
      60,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export default function useUploadMedia({ service }: any) {
  const [imageUrl, setImageUrl] = useState("");

  const beforeImageUpload = async (file: any) => {
    try {
      const base64 = await resizeFile(file);

      const payload = {
        service,
        encoded_image: base64,
      };

      const URI = "https://transmitter.evidentbd.com/api/v1/upload/global/image";
      const { data } = await xior.post(URI, payload);

      openSuccessNotification({ description: data.message });
      setImageUrl(data.data.edge_url);
    } catch (error) {
      openErrorNotification({ description: "Try Again. Something went wrong" });
    }

    return false;
  };

  return { beforeImageUpload, imageUrl };
}

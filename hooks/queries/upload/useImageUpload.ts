import { useState } from "react";
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import axios from "axios";
import ReSizer from "react-image-file-resizer";

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    ReSizer.imageFileResizer(
      file,
      800,
      800,
      "JPEG",
      60,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

type Props = {
  service: string;
};

export default function useImageUpload({ service }: Props) {
  const [edgeUrl, setEdgeUrl] = useState("");
  const [isImage, setIsImage] = useState(false);

  const imageUpload = async (e: any) => {
    setIsImage(e.target.files.length ? true : false);

    if (e.target.files.length) {
      try {
        const base64 = await resizeFile(e.target.files[0]);

        const payload = {
          service,
          encoded_image: base64,
        };

        const { data } = await axios({
          url: "https://transmitter.evidentbd.com/api/v1/upload/global/image",
          method: "POST",
          data: payload,
          headers: {
            "Content-Type": "application/json",
            "SECRET-KEY": "GYGWYERY58454FDS4FD8V487FF8WQ8EF11D88W1D",
          },
        });

        openSuccessNotification({ description: "Successfully Uploaded" });
        setEdgeUrl(data.data.edge_url);
      } catch (error) {
        openErrorNotification({ description: "Try Again. Something went wrong" });
      }
    }

    return false;
  };

  const imageUploadWithDZ = async (files: any) => {
    setIsImage(files.length ? true : false);
    if (files) {
      try {
        const base64 = await resizeFile(files[0]);

        const payload = {
          service,
          encoded_image: base64,
        };

        const { data } = await axios({
          url: "https://transmitter.evidentbd.com/api/v1/upload/global/image",
          method: "POST",
          data: payload,
          headers: {
            "Content-Type": "application/json",
            "SECRET-KEY": "GYGWYERY58454FDS4FD8V487FF8WQ8EF11D88W1D",
          },
        });

        openSuccessNotification({ description: "Successfully Uploaded" });

        setEdgeUrl(data.data.edge_url);
      } catch (error) {
        openErrorNotification({ description: "Try Again. Something went wrong" });
      }
    }

    return false;
  };

  return { imageUpload, imageUploadWithDZ, edgeUrl, isImage, setEdgeUrl };
}

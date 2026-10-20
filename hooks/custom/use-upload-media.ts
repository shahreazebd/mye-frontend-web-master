import { extractUploadErrorMessage } from "@/utils/error";
import { openErrorNotification } from "@/utils/notification";
import { useMutation } from "@tanstack/react-query";
import xior from "xior";

const UPLOAD_URL = "https://api.attendancekeeper.net/hr/api/public/storage/upload/";

const INTERNAL_TOKEN =
  "lsdaknfosfsdolnfsdnvajdoifmcvklsvsodihq049687asfwadfg8aw498g7sv4156sdager8sc1vb456sdf4gsa4v65sd4gf98as";

export type UploadMediaParams = {
  file: File;
  path?: string;
};

export type UploadMediaResponse = {
  success: boolean;
  status: string;
  status_code: number;
  message: string;
  data: Data;
};

type Data = {
  uuid: string;
  folder: string;
  file_name: string;
  file_size: number;
  content_type: string;
  file_url: string;
  created_at: string;
};

export async function uploadMedia({ file, path = "uploads/" }: UploadMediaParams) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("path", path);

  const res = await xior.post<UploadMediaResponse>(UPLOAD_URL, formData, {
    headers: {
      "x-internal-service-token": INTERNAL_TOKEN,
    },
  });

  if (!res.data?.data?.file_url) {
    const errorMsg =
      res.data?.message || "Upload succeeded but no URL was returned by the server.";
    throw new Error(errorMsg);
  }

  return {
    url: res.data.data.file_url,
    name: res.data.data.file_name,
    size: res.data.data.file_size,
    type: res.data.data.content_type,
  };
}

export function useUploadMedia() {
  return useMutation({
    mutationFn: uploadMedia,
    onError: (error) => {
      const message = extractUploadErrorMessage(error);

      openErrorNotification({ description: message });
    },
  });
}

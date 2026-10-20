import { openErrorNotification } from "@/utils/notification";
import { useQuery } from "@tanstack/react-query";

import fetch from "@/config/xior";

const userProfile = () => {
  return fetch.get("/identification/api/v1/get-user/meta/get/1/");
};

export default function useGetUserProfile() {
  return useQuery(["fetch-user-profile-data"], userProfile, {
    onError: (error: any) => {
      openErrorNotification(error.message);
    },
  });
}

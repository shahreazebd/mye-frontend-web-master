// utils
import { openErrorNotification, openSuccessNotification } from "@/utils/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// configs
import { fetchAuth } from "@/config/xior";
import useAuth from "@/hooks/custom/useAuth";

const editProfile = ({ data, id }: any) => {
  return fetchAuth.put(`/evident/auth/api/v1/user/edit/${id}/`, data);
};

export default function useEditProfile() {
  const queryClient = useQueryClient();
  const { userInformation } = useAuth();

  return useMutation((data) => editProfile({ data, id: userInformation?.id }), {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-user-data-update"]);
      queryClient.invalidateQueries(["fetch-all-user-data"]);
      openSuccessNotification({ description: "Edit Profile Successfully!" });
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status >= 500) {
          openErrorNotification({ description: "Network error!" });
        }

        if (error.response.status === 400) {
          openErrorNotification({
            description: error?.response?.data?.message || "400 Error",
          });
        } else {
          openErrorNotification({ description: "Something went wrong.." });
        }
      }
    },
  });
}

import { useEffect, useState } from "react";

// configs
import { fetchAuth } from "@/config/xior";

export default function useValidateToken() {
  const [data, setData] = useState(null);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    try {
      const options = {
        method: "GET",

        headers: {
          Authorization: `Beaerer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      };

      fetchAuth
        .get("/evident/auth/api/v1/user/validate-token/", options)
        .then((res: any) => {
          setData(res.data);
        });
    } catch (error: any) {
      setError(error);
    }
  }, []);

  return { data, error };
}

import { useMutation } from "@tanstack/react-query";

import fetch from "@/config/xior";

function findZPL(urls: string[]) {
  return fetch
    .post<{ isZPLFound: boolean; zpl: any[]; pdf: string[] }>(
      "/postage-storage/api/v1/utils/find-zpl",
      { urls: urls }
    )
    .then((res) => res.data);
}

export function useFindZPL() {
  return useMutation({
    mutationKey: ["find-zpl"],
    mutationFn: findZPL,
    cacheTime: 0,
  });
}

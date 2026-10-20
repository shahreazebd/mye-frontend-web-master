import { InventoryResponse } from "@/types/inventory";
import fetch from "@/config/xior";

import { decodeToken } from "./auth";

export default async function getInventories({ locationId }: { locationId: number }) {
  const user = decodeToken();

  return fetch
    .get<InventoryResponse>(
      `/miams/api/v1/stock/get-all-stock/${user?.company_uid}/${locationId}/`
    )
    .then((res) => res.data);
}

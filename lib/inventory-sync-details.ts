import fetch from "@/config/xior";

export type InventorySyncStatus = {
  success: boolean;
  data: SyncDetail[];
};

export type SyncDetail = {
  marketplace: string;
  sync_status: string;
  data: TableData[];
};

export type TableData = {
  id: number;
  channel_uid: string;
  sku: string;
  product_id?: number;
  item_id?: number;
  quantity: number;
  status: string;
  request_id: string;
  created_at: Date;
  updated_at: Date;
};

export default async function getInventorySyncStatus(
  companyUuid: string,
  localSku: string
) {
  const url = `/miams/api/v1/mapping/inventory-sync-details/${companyUuid}/${localSku}`;
  return fetch.get<InventorySyncStatus>(url);
}

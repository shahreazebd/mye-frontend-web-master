export type ChildProductResponse = {
  success: boolean;
  data: ChildProduct[];
};

export type ChildProduct = {
  id: number;
  parent_product_id: number;
  child_product_id: number;
  quantity: number;
  company_uid: string;
  createdAt: Date;
  updatedAt: Date;
  child_product_sku: string;
  child_product_name: string;
};

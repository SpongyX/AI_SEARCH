export interface Product {
  id: number;
  brand?: string;
  name?: string;
  description?: string;
  sku?: string;
  image?: string;
  price?: number;
  retailPrice?: number;
  listPrice?: number;
  stock?: number;
  onSale?: boolean;
  onStock?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  lastEdit?: Date;
  keywords?: string;
  vat?: number;
}

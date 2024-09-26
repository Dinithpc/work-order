export type ProductStatus = 'draft' | 'published';

export interface ProductVariant {
  id: string;
  createdAt: number;
  currency: string;
  description?: string;
  image?: string;
  name: string;
  price: number;
  quantity: number;
  sku?: string;
}

export interface Product {
  id: string;
  brand?: string;
  category?: string;
  chargeTax?: boolean;
  composition?: string[];
  createdAt: number;
  currency: string;
  defaultName?: string;
  description?: string;
  displayName?: string;
  features?: string[];
  image?: string;
  name: string;
  price: number;
  size?: string;
  sku?: string;
  status: ProductStatus;
  tags?: string[];
  updatedAt?: number;
  variants?: ProductVariant[];
}

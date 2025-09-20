export interface SkuFormData {
  platform: string;
  skuStyle: string;
  colors: string[];
  sizes: string[];
  brandName: string;
  collection: string;
  productName: string;
  category: string;
  subCategory: string;
  variantModel: string;
  customDetail: string;
  productUrl: string;
  imageUrl: string;
  costOfGoods?: number;
  shippingCost?: number;
  stateTax?: number;
  federalTax?: number;
  sellingPrice?: number;
}

export interface HistoryEntry {
  id: string;
  sku: string;
  formData: SkuFormData;
  variant: {
    color: string;
    size: string;
  };
}

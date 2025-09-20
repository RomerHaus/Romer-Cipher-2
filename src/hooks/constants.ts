import React from 'react';
// import { EcommercePlatform } from './types';
// import { SkuStyle } 
import { AmazonIcon, EbayIcon, EtsyIcon, GenericBrandIcon, InstagramIcon, PinterestIcon, ShopifyIcon, SquareSpaceIcon, TiktokIcon, TumiIcon, WixIcon } from '../components/Icons';

// Define missing types here
export type EcommercePlatform = {
  name: string;
  icon: React.ComponentType<any>;
};

export type SkuStyle = {
  name: string;
  format: string;
  description: string;
  required: string[];
};

export const ECOMMERCE_PLATFORMS: EcommercePlatform[] = [
  { name: 'Generic', icon: GenericBrandIcon },
  { name: 'Shopify', icon: ShopifyIcon },
  { name: 'Amazon', icon: AmazonIcon },
  { name: 'Etsy', icon: EtsyIcon },
  { name: 'Ebay', icon: EbayIcon },
  { name: 'Pinterest', icon: PinterestIcon },
  { name: 'Instagram', icon: InstagramIcon },
  { name: 'Tiktok', icon: TiktokIcon },
  { name: 'Wix', icon: WixIcon },
  { name: 'SquareSpace', icon: SquareSpaceIcon },
  { name: 'Tumi', icon: TumiIcon },
];


export const SKU_STYLES: SkuStyle[] = [
  {
    name: 'Simple',
    format: '{PROD}-{COLOR}-{SIZE}',
    description: 'Product Name > Color > Size. Good for small inventories.',
    required: ['productName'],
  },
  {
    name: 'Brand-First Detailed',
    format: '{BRAND}-{COLLECTION}-{SUBCAT}-{CAT}-{PROD}-{COLOR}-{SIZE}',
    description: 'Brand > Collection > Sub-Cat > Prod. Type > Name > Color > Size. For detailed inventories.',
    required: ['brandName', 'collection', 'productName', 'category', 'subCategory'],
  },
  {
    name: 'Category-First',
    format: '{CAT}-{BRAND}-{PROD}-{COLOR}-{SIZE}',
    description: 'Category > Brand > Product Name > Color > Size. Organizes by product type.',
    required: ['brandName', 'productName', 'category'],
  },
];

export const COLORS: { group: string; items: string[] }[] = [
  {
    group: 'Solid Colors',
    items: ['Black', 'White', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Navy', 'Maroon', 'Beige', 'Cream', 'Charcoal', 'Olive', 'Teal', 'Turquoise', 'Magenta', 'Violet', 'Indigo', 'Gold', 'Silver', 'Bronze', 'Cyan', 'Lavender', 'Mustard', 'Peach', 'Plum', 'Rose', 'Rust', 'Salmon', 'Tan', 'Sky Blue', 'Forest Green'],
  },
  {
    group: 'Patterns',
    items: ['Multi-color', 'Camouflage', 'Floral', 'Striped', 'Checkered', 'Polka Dot', 'Paisley', 'Tie-Dye', 'Ombré', 'Animal Print', 'Geometric', 'Abstract'],
  },
];

export const SIZES: string[] = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large', 'One Size'];

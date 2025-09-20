import { GenericBrandIcon, EtsyIcon, AmazonIcon, TumiIcon } from '../components/Icons';

export const SKU_STYLES = [
  {
    name: 'Brand-Product-Variant',
    description: 'Format: BRAND-PRODUCT-COLOR-SIZE (e.g., NIKE-AIR-BLK-L)',
    required: ['brandName', 'productName']
  },
  {
    name: 'Category-Collection-Product',
    description: 'Format: CAT-COLLECTION-PRODUCT-VARIANT (e.g., SHOE-SPORT-RUNNER-BLK-10)',
    required: ['category', 'collection', 'productName']
  },
  {
    name: 'Custom-Detail-Variant',
    description: 'Format: CUSTOM-DETAIL-COLOR-SIZE (e.g., SPECIAL-LIMITED-RED-M)',
    required: ['customDetail']
  },
  {
    name: 'Full-Descriptor',
    description: 'Format: BRAND-CAT-SUB-PRODUCT-MODEL-COLOR-SIZE',
    required: ['brandName', 'category', 'subCategory', 'productName', 'variantModel']
  }
];

export const ECOMMERCE_PLATFORMS = [
  { name: 'Etsy', icon: EtsyIcon },
  { name: 'Amazon', icon: AmazonIcon },
  { name: 'Shopify', icon: GenericBrandIcon },
  { name: 'eBay', icon: GenericBrandIcon },
  { name: 'Tumi', icon: TumiIcon },
  { name: 'Custom', icon: GenericBrandIcon }
];

export const COLORS = [
  {
    group: 'Basic Colors',
    items: ['Black', 'White', 'Gray', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink']
  },
  {
    group: 'Earth Tones', 
    items: ['Brown', 'Tan', 'Beige', 'Khaki', 'Olive', 'Burgundy', 'Rust', 'Cream']
  },
  {
    group: 'Metallics',
    items: ['Gold', 'Silver', 'Bronze', 'Copper', 'Rose Gold', 'Gunmetal']
  },
  {
    group: 'Pastels',
    items: ['Light Blue', 'Light Pink', 'Lavender', 'Mint', 'Peach', 'Baby Yellow']
  },
  {
    group: 'Dark Tones',
    items: ['Navy', 'Charcoal', 'Forest Green', 'Maroon', 'Dark Purple', 'Midnight Blue']
  }
];

export const SIZES = [
  'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',
  '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14',
  'One Size', 'OS', 'Free Size'
];

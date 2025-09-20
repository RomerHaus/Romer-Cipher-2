import React, { useState } from 'react';
import Header from './Header';
import SkuForm from './components/SkuForm';
import ResultsDisplay from './components/ResultsDisplay';
import HistoryDisplay from './components/HistoryDisplay';
import { SkuFormData, HistoryEntry } from './hooks/types';

// Initial form data
const initialFormData: SkuFormData = {
  platform: '',
  skuStyle: '',
  colors: [],
  sizes: [],
  brandName: '',
  collection: '',
  productName: '',
  category: '',
  subCategory: '',
  variantModel: '',
  customDetail: '',
  productUrl: '',
  imageUrl: '',
  costOfGoods: undefined,
  shippingCost: undefined,
  stateTax: undefined,
  federalTax: undefined,
  sellingPrice: undefined,
};

export default function App() {
  const [formData, setFormData] = useState<SkuFormData>(initialFormData);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [buildName, setBuildName] = useState<string>('');
  const [lastResult, setLastResult] = useState<{ count: number; productName: string } | null>(null);

  // Generate SKU based on the selected style and data
  const generateSku = (data: SkuFormData, color: string, size: string): string => {
    const style = data.skuStyle;
    const brand = data.brandName?.toUpperCase().replace(/\s+/g, '') || '';
    const product = data.productName?.toUpperCase().replace(/\s+/g, '') || '';
    const category = data.category?.toUpperCase().replace(/\s+/g, '') || '';
    const subCategory = data.subCategory?.toUpperCase().replace(/\s+/g, '') || '';
    const collection = data.collection?.toUpperCase().replace(/\s+/g, '') || '';
    const model = data.variantModel?.toUpperCase().replace(/\s+/g, '') || '';
    const custom = data.customDetail?.toUpperCase().replace(/\s+/g, '') || '';
    const colorCode = color.toUpperCase().replace(/\s+/g, '').substring(0, 3);
    const sizeCode = size.toUpperCase().replace(/\s+/g, '');

    switch (style) {
      case 'Brand-Product-Variant':
        return `${brand}-${product}-${colorCode}-${sizeCode}`;
      case 'Category-Collection-Product':
        return `${category}-${collection}-${product}-${colorCode}-${sizeCode}`;
      case 'Custom-Detail-Variant':
        return `${custom}-${colorCode}-${sizeCode}`;
      case 'Full-Descriptor':
        return `${brand}-${category}-${subCategory}-${product}-${model}-${colorCode}-${sizeCode}`;
      default:
        return `${brand || 'UNKNOWN'}-${product || 'PRODUCT'}-${colorCode}-${sizeCode}`;
    }
  };

  const handleGenerate = (data: SkuFormData) => {
    const newEntries: HistoryEntry[] = [];
    
    // Generate SKUs for all color/size combinations
    data.colors.forEach(color => {
      data.sizes.forEach(size => {
        const sku = generateSku(data, color, size);
        const entry: HistoryEntry = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          sku,
          formData: data,
          variant: { color, size }
        };
        newEntries.push(entry);
      });
    });

    // Add to history
    setHistory(prev => [...prev, ...newEntries]);
    
    // Set result for display
    setLastResult({
      count: newEntries.length,
      productName: data.productName || 'Product'
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    setLastResult(null);
  };

  const handleRemoveItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="xl:col-span-2">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-6">SKU Generator</h2>
              <SkuForm 
                onGenerate={handleGenerate}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="xl:col-span-1">
            <ResultsDisplay result={lastResult} />
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <HistoryDisplay
            history={history}
            buildName={buildName}
            setBuildName={setBuildName}
            onClearHistory={handleClearHistory}
            onRemoveItem={handleRemoveItem}
          />
        )}
      </div>
    </div>
  );
}

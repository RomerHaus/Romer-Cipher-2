import React, { useState } from 'react';
import { HistoryEntry } from '../hooks/types';
import { CopyIcon, Trash2Icon, FileDownIcon, ImageIcon } from './Icons';

interface HistoryDisplayProps {
  history: HistoryEntry[];
  buildName: string;
  setBuildName: (name: string) => void;
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ history, buildName, setBuildName, onClearHistory, onRemoveItem }) => {
  const handleExportCsv = () => {
    const headers = ['SKU', 'Brand', 'Collection', 'Product Name', 'Product Type', 'Sub-Category', 'Variant/Model', 'Custom Detail', 'Color', 'Size', 'Image URL', 'Cost of Goods', 'Shipping Cost', 'State Tax', 'Federal Tax', 'Selling Price', 'Net Profit', 'Profit Margin (%)'];
    const rows = history.map(entry => {
      const { formData, variant, sku } = entry;
      const cost = formData.costOfGoods || 0;
      const shipping = formData.shippingCost || 0;
      const sTax = formData.stateTax || 0;
      const fTax = formData.federalTax || 0;
      const price = formData.sellingPrice || 0;
      const totalCost = cost + shipping + sTax + fTax;
      const profit = price - totalCost;
      const margin = price > 0 ? (profit / price) * 100 : 0;
      return [
        sku,
        formData.brandName || '',
        formData.collection || '',
        formData.productName || '',
        formData.category || '',
        formData.subCategory || '',
        formData.variantModel || '',
        formData.customDetail || '',
        variant.color,
        variant.size,
        formData.imageUrl || '',
        cost.toFixed(2),
        shipping.toFixed(2),
        sTax.toFixed(2),
        fTax.toFixed(2),
        price.toFixed(2),
        profit.toFixed(2),
        margin.toFixed(2),
      ].map(val => `"${String(val).replace(/"/g, '""')}"`).join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const fileName = buildName.replace(/\s+/g, '_') || 'römer-ciph_build';
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
   const handleCopyAll = () => {
    const headers = ['SKU', 'Brand', 'Collection', 'Product Name', 'Product Type', 'Sub-Category', 'Variant/Model', 'Custom Detail', 'Color', 'Size', 'Image URL', 'Cost of Goods', 'Shipping Cost', 'State Tax', 'Federal Tax', 'Selling Price', 'Net Profit', 'Profit Margin (%)'];
    const rows = history.map(entry => {
      const { formData, variant, sku } = entry;
      const cost = formData.costOfGoods || 0;
      const shipping = formData.shippingCost || 0;
      const sTax = formData.stateTax || 0;
      const fTax = formData.federalTax || 0;
      const price = formData.sellingPrice || 0;
      const totalCost = cost + shipping + sTax + fTax;
      const profit = price - totalCost;
      const margin = price > 0 ? (profit / price) * 100 : 0;
      return [
        sku,
        formData.brandName || '',
        formData.collection || '',
        formData.productName || '',
        formData.category || '',
        formData.subCategory || '',
        formData.variantModel || '',
        formData.customDetail || '',
        variant.color,
        variant.size,
        formData.imageUrl || '',
        cost.toFixed(2),
        shipping.toFixed(2),
        sTax.toFixed(2),
        fTax.toFixed(2),
        price.toFixed(2),
        profit.toFixed(2),
        margin.toFixed(2),
      ].join('\t');
    });

    const tsvContent = [headers.join('\t'), ...rows].join('\n');
    navigator.clipboard.writeText(tsvContent);
  };

  return (
    <div className="mt-8 bg-gray-900/70 border border-green-500/30 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className='w-full md:w-auto'>
           <h3 className="text-lg font-semibold text-gray-200">Build History</h3>
            <input
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              placeholder="> Name this build..."
              className="w-full md:w-64 mt-2 md:mt-0 bg-transparent text-sm text-gray-400 focus:text-green-400 focus:outline-none border-b border-gray-700 focus:border-green-500 transition-colors"
            />
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button onClick={handleCopyAll} className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-md flex items-center space-x-2"><CopyIcon className="w-4 h-4" /><span>Copy All</span></button>
          <button onClick={handleExportCsv} className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-700 rounded-md flex items-center space-x-2"><FileDownIcon className="w-4 h-4" /><span>Export CSV</span></button>
          <button onClick={onClearHistory} className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/10 rounded-md flex items-center space-x-2"><Trash2Icon className="w-4 h-4" /><span>Clear</span></button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-700 text-gray-400">
            <tr>
              <th className="p-2 font-normal">Image</th>
              <th className="p-2 font-normal">SKU</th>
              <th className="p-2 font-normal">Details</th>
              <th className="p-2 font-normal text-right">Price</th>
              <th className="p-2 font-normal text-right">Cost</th>
              <th className="p-2 font-normal text-right">Profit</th>
              <th className="p-2 font-normal text-right">Margin</th>
              <th className="p-2 font-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map(item => {
              const costOfGoods = item.formData.costOfGoods || 0;
              const shippingCost = item.formData.shippingCost || 0;
              const stateTax = item.formData.stateTax || 0;
              const federalTax = item.formData.federalTax || 0;
              const sellingPrice = item.formData.sellingPrice || 0;

              const totalCost = costOfGoods + shippingCost + stateTax + federalTax;
              const netProfit = sellingPrice - totalCost;
              const profitMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;

              return (
              <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="p-2">
                  <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                    {item.formData.imageUrl ? <img src={item.formData.imageUrl} alt="Product" className="w-full h-full object-cover rounded-md"/> : <ImageIcon className="w-5 h-5 text-gray-600"/>}
                  </div>
                </td>
                <td className="p-2 font-mono text-green-400">{item.sku}</td>
                <td className="p-2">
                    <p className="font-medium text-gray-200">{item.formData.productName}</p>
                    <p className="text-xs text-gray-500">{item.variant.color} / {item.variant.size}</p>
                </td>
                <td className="p-2 text-right">${sellingPrice.toFixed(2)}</td>
                <td className="p-2 text-right text-red-400/80">${totalCost.toFixed(2)}</td>
                <td className={`p-2 text-right font-medium ${netProfit >= 0 ? 'text-green-400' : 'text-red-500'}`}>${netProfit.toFixed(2)}</td>
                <td className="p-2 text-right">{profitMargin.toFixed(1)}%</td>
                <td className="p-2 text-center">
                  <button onClick={() => onRemoveItem(item.id)} className="text-gray-500 hover:text-red-500 p-1"><Trash2Icon className="w-4 h-4"/></button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryDisplay;
import React, { useState } from 'react';
import { SkuFormData } from '../hooks/types';
import { SKU_STYLES, ECOMMERCE_PLATFORMS, COLORS, SIZES } from '../hooks/constants';


interface SkuFormProps {
  onGenerate: (formData: SkuFormData) => void;
  formData: SkuFormData;
  setFormData: React.Dispatch<React.SetStateAction<SkuFormData>>;
}

const SkuForm: React.FC<SkuFormProps> = ({ onGenerate, formData, setFormData }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedSkuStyle = SKU_STYLES.find(s => s.name === formData.skuStyle);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if ((e.target as HTMLInputElement).type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? undefined : parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelectChange = (field: 'colors' | 'sizes', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field];
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(v => v !== value) };
      } else {
        return { ...prev, [field]: [...currentValues, value] };
      }
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedSkuStyle) {
        newErrors.skuStyle = 'SKU Style is required';
    } else {
        selectedSkuStyle.required.forEach((field) => {
            if (!formData[field as keyof SkuFormData]) {
              newErrors[field] = 'This field is required for the selected SKU style.';
            }
        });
    }

    if (formData.colors.length === 0) {
      newErrors.colors = 'At least one color is required.';
    }
    if (formData.sizes.length === 0) {
      newErrors.sizes = 'At least one size is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onGenerate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SKU Structure Section */}
        <fieldset className="bg-gray-900/50 border border-gray-700/50 p-6 rounded-lg space-y-4">
          <legend className="text-sm font-medium text-green-400 px-2 -ml-2">1. SKU Structure</legend>
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-1">E-commerce Platform</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {ECOMMERCE_PLATFORMS.map(p => (
                <button
                  type="button"
                  key={p.name}
                  onClick={() => setFormData((prev: SkuFormData) => ({ ...prev, platform: p.name }))}
                  className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-lg border-2 transition-colors ${formData.platform === p.name ? 'border-green-500 bg-green-500/10' : 'border-gray-700 hover:border-gray-600'}`}
                >
                  <p.icon className={`w-6 h-6 ${formData.platform === p.name ? 'text-green-400' : 'text-gray-400'}`} />
                  <span className={`text-xs ${formData.platform === p.name ? 'text-white' : 'text-gray-300'}`}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="skuStyle" className="block text-sm font-medium text-gray-300 mb-1">SKU Style</label>
             <select id="skuStyle" name="skuStyle" value={formData.skuStyle} onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-green-500 focus:border-green-500">
                <option value="">Select a style</option>
                {SKU_STYLES.map(style => <option key={style.name} value={style.name}>{style.name}</option>)}
            </select>
            {selectedSkuStyle && <p className="text-xs text-gray-400 mt-1">{selectedSkuStyle.description}</p>}
            {errors.skuStyle && <p className="text-xs text-red-500 mt-1">{errors.skuStyle}</p>}
          </div>
        </fieldset>

        {/* Product Details Section */}
        <fieldset className="bg-gray-900/50 border border-gray-700/50 p-6 rounded-lg space-y-4">
          <legend className="text-sm font-medium text-green-400 px-2 -ml-2">2. Product Details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['brandName', 'collection', 'productName', 'category', 'subCategory', 'variantModel', 'customDetail'] as const).map(fieldName => {
                const isRequired = selectedSkuStyle?.required.includes(fieldName);
                return (
                    <div key={fieldName}>
                        <label htmlFor={fieldName} className="block text-sm font-medium text-gray-300 mb-1">
                            {fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            {isRequired && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="text"
                            id={fieldName}
                            name={fieldName}
                            value={formData[fieldName] || ''}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-green-500 focus:border-green-500"
                        />
                        {errors[fieldName] && <p className="text-xs text-red-500 mt-1">{errors[fieldName]}</p>}
                    </div>
                );
            })}
          </div>
        </fieldset>
      </div>

      {/* Variants Section */}
      <fieldset className="bg-gray-900/50 border border-gray-700/50 p-6 rounded-lg">
          <legend className="text-sm font-medium text-green-400 px-2 -ml-2">3. Variants</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Colors</label>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
              {COLORS.map(group => (
                  <div key={group.group}>
                      <p className="text-xs text-gray-400 font-semibold mb-1">{group.group}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map(color => (
                            <button type="button" key={color} onClick={() => handleMultiSelectChange('colors', color)} className={`px-2 py-1 text-xs rounded ${formData.colors.includes(color) ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}>{color}</button>
                        ))}
                      </div>
                  </div>
              ))}
              </div>
              {errors.colors && <p className="text-xs text-red-500 mt-1">{errors.colors}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sizes</label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                    <button type="button" key={size} onClick={() => handleMultiSelectChange('sizes', size)} className={`px-2 py-1 text-xs rounded ${formData.sizes.includes(size) ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}>{size}</button>
                ))}
              </div>
              {errors.sizes && <p className="text-xs text-red-500 mt-1">{errors.sizes}</p>}
            </div>
          </div>
      </fieldset>
      
       <fieldset className="bg-gray-900/50 border border-gray-700/50 p-6 rounded-lg">
        <legend className="text-sm font-medium text-green-400 px-2 -ml-2">4. Financials & Links (Optional)</legend>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(['sellingPrice', 'costOfGoods', 'shippingCost', 'stateTax', 'federalTax'] as const).map(fieldName => (
                 <div key={fieldName}>
                    <label htmlFor={fieldName} className="block text-sm font-medium text-gray-300 mb-1">{fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">$</span>
                        <input
                            type="number"
                            step="0.01"
                            id={fieldName}
                            name={fieldName}
                            value={formData[fieldName] ?? ''}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 pl-7 text-white focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
                <label htmlFor="productUrl" className="block text-sm font-medium text-gray-300 mb-1">Product URL</label>
                <input type="url" id="productUrl" name="productUrl" value={formData.productUrl || ''} onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-green-500 focus:border-green-500" />
            </div>
             <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-green-500 focus:border-green-500" />
            </div>
        </div>
       </fieldset>

       <div className="flex justify-end pt-4">
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
          Generate SKUs
        </button>
      </div>
    </form>
  );
};

export default SkuForm;

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct, uploadImage } from '@/lib/admin-actions';
import { ImagePlus, X, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'Free Size'];
const CATEGORIES = ['Shirts', 'T-Shirts', 'Jeans', 'Kurtas', 'Jackets', 'Ethnic Wear', 'Accessories'];

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [badge, setBadge] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  // Image handling
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      setImages(prev => [...prev, ...newFiles]);
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (images.length === 0) {
        throw new Error('Please upload at least one image.');
      }
      if (selectedSizes.length === 0) {
        throw new Error('Please select at least one size.');
      }

      // 1. Upload images sequentially
      const uploadedUrls: string[] = [];
      for (const file of images) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await uploadImage(formData);
        
        if (uploadRes && uploadRes.success && uploadRes.url) {
          uploadedUrls.push(uploadRes.url);
        } else {
          throw new Error('Failed to upload some images');
        }
      }

      // 2. Save product
      const productData = new FormData();
      productData.append('title', title);
      productData.append('description', description);
      productData.append('price', price.toString());
      productData.append('category', category);
      if (badge) productData.append('badge', badge);
      
      productData.append('sizes', JSON.stringify(selectedSizes));
      productData.append('images', JSON.stringify(uploadedUrls));

      const res = await addProduct(productData);
      
      if (res.success) {
        router.push('/admin/products');
      } else {
        throw new Error(res.error || 'Failed to save product');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="w-10 h-10 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-colors shadow-sm">
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-zinc-900">Add New Product</h1>
          <p className="text-zinc-600">Fill in the details to list a new item in the catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Product Title</label>
              <input 
                required type="text" value={title} onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none"
                placeholder="E.g. Premium Silk Kurta"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Price (₹)</label>
                <input 
                  required type="number" min="0" value={price} onChange={e => setPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none"
                  placeholder="2999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Badge (Optional)</label>
                <input 
                  type="text" value={badge} onChange={e => setBadge(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none"
                  placeholder="E.g. New Arrival"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Description</label>
              <textarea 
                required rows={5} value={description} onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none resize-none"
                placeholder="Product details, material, care instructions..."
              />
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
              <label className="block text-sm font-medium text-zinc-700 mb-3">Category</label>
              <select 
                value={category} onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none"
              >
                {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
              <label className="block text-sm font-medium text-zinc-700 mb-3">Available Sizes</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SIZES.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 border rounded-md text-sm font-medium transition-colors ${selectedSizes.includes(size) ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Images Upload */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
          <label className="block text-sm font-medium text-zinc-700 mb-4">Product Images ({images.length} uploaded)</label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {imagePreviews.map((preview, idx) => (
              <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-zinc-200 group bg-zinc-100">
                <Image src={preview} alt={`Preview ${idx}`} fill className="object-cover" />
                <button 
                  type="button" 
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  title="Remove Image"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            
            <label className="relative aspect-[3/4] rounded-xl border-2 border-dashed border-zinc-300 hover:border-[var(--color-gold)] hover:bg-[var(--color-beige)] transition-colors flex flex-col items-center justify-center cursor-pointer text-zinc-500 hover:text-[var(--color-gold)]">
              <ImagePlus size={32} className="mb-2" />
              <span className="text-sm font-medium">Add Image</span>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <p className="text-xs text-zinc-500 mt-4">The first image will be used as the primary thumbnail. Recommended aspect ratio is 3:4.</p>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/products" className="px-8 py-3.5 bg-white border border-zinc-200 text-zinc-700 font-medium rounded-xl hover:bg-zinc-50 transition-colors">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading}
            className="px-10 py-3.5 bg-zinc-900 text-white font-medium rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20 flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-zinc-400 border-t-white rounded-full animate-spin"></div>
            ) : "Save Product"}
          </button>
        </div>

      </form>
    </div>
  );
}

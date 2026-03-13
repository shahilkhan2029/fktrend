import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Eye, EyeOff, ShoppingBag } from 'lucide-react';
import ProductListActions from './ProductListActions';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-zinc-900 mb-2">Products Management</h1>
          <p className="text-zinc-600">Add, edit, or remove catalog items.</p>
        </div>
        <Link href="/admin/products/new" className="bg-[var(--color-gold)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#b5953c] transition-colors shadow-sm flex items-center gap-2">
          <Plus size={20} /> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 text-zinc-500 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100 w-24">Image</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Product Details</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Price</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100">Status</th>
                  <th className="px-6 py-4 font-medium border-b border-zinc-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {products.map(product => {
                  let images: string[] = [];
                  try {
                    images = product.images ? JSON.parse(product.images) : [];
                  } catch (e) {
                    // ignore
                  }
                  return (
                    <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-16 h-20 rounded-md overflow-hidden bg-zinc-100 relative shrink-0 shadow-sm">
                          <Image src={images[0] || '/placeholder.png'} alt={product.title} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-zinc-900 text-lg mb-1">{product.title}</div>
                        <div className="flex gap-2 text-xs">
                          <span className="bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded">{product.category}</span>
                          {product.badge && <span className="bg-black text-white px-2 py-0.5 rounded">{product.badge}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-zinc-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${product.available ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-600'}`}>
                          {product.available ? <><Eye size={14} /> Visible</> : <><EyeOff size={14} /> Hidden</>}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ProductListActions id={product.id} available={product.available} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center text-zinc-500 flex flex-col items-center">
            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mb-4">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-xl font-medium text-zinc-900 mb-2">No products found</h3>
            <p className="max-w-md mx-auto mb-6">Your catalog is currently empty. Start by adding your first product to the digital showroom.</p>
            <Link href="/admin/products/new" className="bg-zinc-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-800 transition-colors shadow-sm">
              Add First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

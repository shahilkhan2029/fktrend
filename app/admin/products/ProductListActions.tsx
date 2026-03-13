'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProduct, toggleProductAvailability } from '@/lib/admin-actions';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function ProductListActions({ id, available }: { id: string, available: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      await deleteProduct(id);
      router.refresh();
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    setLoading(true);
    await toggleProductAvailability(id, !available);
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button 
        onClick={handleToggle} 
        disabled={loading}
        title={available ? "Hide from Store" : "Show in Store"}
        className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
      >
        {available ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      
      {/* Edit Link */}
      <Link href={`/admin/products/${id}/edit`} className="p-2 inline-flex text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
        <Edit2 size={18} />
      </Link>
      
      <button 
        onClick={handleDelete} 
        disabled={loading}
        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

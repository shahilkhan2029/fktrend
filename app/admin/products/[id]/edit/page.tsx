import prisma from '@/lib/prisma';
import EditProductForm from './EditProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  
  if (!product) {
    notFound();
  }

  return <EditProductForm product={product} />;
}

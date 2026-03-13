'use server';

import { revalidatePath } from 'next/cache';
import prisma from './prisma';

function safeParseJSON(str: string | null | undefined): string[] {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export async function submitBooking(formData: FormData) {
  try {
    const productId = formData.get('productId') as string;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const size = formData.get('size') as string;
    const message = formData.get('message') as string;

    if (!productId || !name || !phone) {
      return { success: false, error: 'Missing required fields.' };
    }

    await prisma.booking.create({
      data: {
        productId,
        name,
        phone,
        size,
        message: message || null,
      }
    });

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Booking Error:', error);
    return { success: false, error: 'Failed to process booking. Please try again.' };
  }
}

// Helper to fetch featured products for Home Page
export async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { available: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
    });
    return products.map(p => ({
      ...p,
      sizes: safeParseJSON(p.sizes),
      images: safeParseJSON(p.images),
    }));
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

// Helper for shop page
export async function getProducts(category?: string) {
  try {
    const whereClause = {
      available: true,
      ...(category ? { category } : {})
    };
    
    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
    
    return products.map(p => ({
      ...p,
      sizes: safeParseJSON(p.sizes),
      images: safeParseJSON(p.images),
    }));
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

export async function getProduct(id: string) {
  try {
    const p = await prisma.product.findUnique({
      where: { id }
    });
    if (!p) return null;
    
    return {
      ...p,
      sizes: safeParseJSON(p.sizes),
      images: safeParseJSON(p.images),
    };
  } catch (error) {
    console.error('Fetch product error:', error);
    return null;
  }
}

export async function getCategories() {
  return [
    { name: 'Shirts', count: 12, image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=800&auto=format&fit=crop' },
    { name: 'T-Shirts', count: 24, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
    { name: 'Jeans', count: 18, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop' },
    { name: 'Kurtas', count: 15, image: 'https://images.unsplash.com/photo-1583391733958-d150204b6118?q=80&w=800&auto=format&fit=crop' },
    { name: 'Jackets', count: 8, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop' },
    { name: 'Ethnic Wear', count: 20, image: 'https://images.unsplash.com/photo-1627834241595-502a5e42a98f?q=80&w=800&auto=format&fit=crop' },
  ];
}

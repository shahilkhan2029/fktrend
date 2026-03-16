'use server';

import { revalidatePath } from 'next/cache';
import prisma from './prisma';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 1. Get Secret Signature for Client-Side Upload
export async function getCloudinarySignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  // In development, handle missing Cloudinary keys gracefully
  if (!process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_API_KEY) {
    if (process.env.NODE_ENV === 'development') {
      return {
        signature: 'local_dev_mock',
        timestamp,
        cloudName: 'local',
        apiKey: 'local',
      };
    }
  }

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'fk_trend' },
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  };
}

// Keep this for small uploads or backward compatibility
export async function uploadImage(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get('file') as File;
    if (!file) return { success: false, error: 'No file provided' };

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve) => {
      cloudinary.uploader.upload_stream(
        { folder: 'fk_trend' },
        (error: any, result: any) => {
          if (error) {
            console.error('SERVER-SIDE CLOUDINARY ERROR:', error);
            resolve({ 
              success: false, 
              error: error.message || 'Cloudinary upload failed' 
            });
          } else {
            resolve({ success: true, url: result?.secure_url });
          }
        }
      ).end(buffer);
    });
  } catch (err: any) {
    console.error('SERVER-SIDE CATCH ERROR:', err);
    return { success: false, error: err.message || 'Upload failed' };
  }
}

// Add Product
export async function addProduct(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const badge = (formData.get('badge') as string) || null;
    
    // Parse sizes & images JSON
    const sizes = formData.get('sizes') as string;
    const images = formData.get('images') as string;

    await prisma.product.create({
      data: {
        title,
        description,
        price,
        category,
        badge,
        sizes,
        images,
        available: true,
      }
    });

    revalidatePath('/admin');
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return { success: true };
  } catch (err: any) {
    console.error('ADD PRODUCT ERROR:', err);
    return { success: false, error: err.message || 'Failed to add product' };
  }
}

// Edit Product
export async function editProduct(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const badge = (formData.get('badge') as string) || null;
    
    // Parse sizes & images JSON
    const sizes = formData.get('sizes') as string;
    const images = formData.get('images') as string;

    await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price,
        category,
        badge,
        sizes,
        images,
      }
    });

    revalidatePath(`/admin/products/${id}/edit`);
    revalidatePath('/admin/products');
    revalidatePath(`/shop/${id}`);
    revalidatePath('/shop');
    return { success: true };
  } catch (err: any) {
    console.error('EDIT PRODUCT ERROR:', err);
    return { success: false, error: err.message || 'Failed to edit product' };
  }
}

// Delete Product
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: 'Failed to delete product' };
  }
}

// Toggle Product Availability
export async function toggleProductAvailability(id: string, available: boolean) {
  try {
    await prisma.product.update({ 
      where: { id },
      data: { available }
    });
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: 'Failed to update availability' };
  }
}

// Update Store Settings
export async function updateStoreSettings(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const address = formData.get('address') as string;
    const mapLocation = formData.get('mapLocation') as string;
    const directionsUrl = formData.get('directionsUrl') as string;
    const instagramUrl = formData.get('instagramUrl') as string;
    const facebookUrl = formData.get('facebookUrl') as string;
    const youtubeUrl = formData.get('youtubeUrl') as string;
    const profilePic = formData.get('profilePic') as string;

    await prisma.storeSettings.upsert({
      where: { id: 'singleton' },
      update: {
        email,
        phone,
        whatsapp,
        address,
        mapLocation,
        directionsUrl,
        instagramUrl,
        facebookUrl,
        youtubeUrl,
        profilePic,
      },
      create: {
        id: 'singleton',
        email,
        phone,
        whatsapp,
        address,
        mapLocation,
        directionsUrl,
        instagramUrl,
        facebookUrl,
        youtubeUrl,
        profilePic,
      },
    });

    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/admin/settings');
    return { success: true };
  } catch (err: any) {
    console.error('UPDATE SETTINGS ERROR:', err);
    return { success: false, error: err.message || 'Failed to update settings' };
  }
}

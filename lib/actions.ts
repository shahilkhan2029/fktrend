'use server';

import { revalidatePath } from 'next/cache';
import prisma from './prisma';
import bcrypt from 'bcryptjs';
import { signUserToken, getSession } from './auth';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

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
    const userId = formData.get('userId') as string;
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
        userId: userId || null,
        name,
        phone,
        size,
        message: message || null,
      }
    });

    revalidatePath('/admin');
    revalidatePath('/bookings');
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
  try {
    const categories = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
      where: {
        available: true,
      },
    });

    // Fetch the latest product for each category to get its image
    const categoriesWithImages = await Promise.all(
      categories.map(async (c) => {
        const latestProduct = await prisma.product.findFirst({
          where: { 
            category: c.category,
            available: true 
          },
          orderBy: { createdAt: 'desc' },
          select: { images: true }
        });

        let imageUrl = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop';
        
        if (latestProduct && latestProduct.images) {
          const imgs = safeParseJSON(latestProduct.images);
          if (imgs.length > 0) {
            imageUrl = imgs[0];
          }
        }

        return {
          name: c.category,
          count: c._count.category,
          image: imageUrl
        };
      })
    );

    return categoriesWithImages;
  } catch (error) {
    console.error('Fetch categories error:', error);
    return [];
  }
}

export async function getStoreSettings() {
  try {
    const settings = await prisma.storeSettings.findUnique({
      where: { id: 'singleton' }
    });
    return settings;
  } catch (error) {
    console.error('Fetch settings error:', error);
    return null;
  }
}

// --- USER AUTH ACTIONS ---

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !phone || !password) {
      return { success: false, error: 'All fields are required.' };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }]
      }
    });

    if (existingUser) {
      return { success: false, error: 'User with this email or phone already exists.' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      }
    });

    // Create token
    const token = await signUserToken({ id: user.id, email: user.email, name: user.name });

    // Set cookie
    (await cookies()).set('user_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed. Please try again.' };
  }
}

export async function loginUser(formData: FormData) {
  try {
    const emailOrPhone = formData.get('identifier') as string;
    const password = formData.get('password') as string;

    if (!emailOrPhone || !password) {
      return { success: false, error: 'All fields are required.' };
    }

    // --- ADMIN LOGIN CHECK ---
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'fktrend123';
    const ADMIN_SECRET = new TextEncoder().encode(process.env.ADMIN_PASS || 'fktrend123');

    if (emailOrPhone === ADMIN_USER && password === ADMIN_PASS) {
      // Create Admin JWT
      const token = await new SignJWT({ user: ADMIN_USER })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(ADMIN_SECRET);

      const cookieStore = await cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return { success: true, isAdmin: true };
    }

    // --- REGULAR USER LOGIN ---
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phone: emailOrPhone }]
      }
    });

    if (!user) {
      return { success: false, error: 'Invalid identifier or password.' };
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: 'Invalid identifier or password.' };
    }

    // Create token
    const token = await signUserToken({ id: user.id, email: user.email, name: user.name });

    // Set cookie
    (await cookies()).set('user_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed. Please try again.' };
  }
}

export async function logoutUser() {
  (await cookies()).delete('user_token');
  revalidatePath('/');
}

// --- NEW USER DATA ACTIONS ---

export async function getUserBookings() {
  try {
    const session = await getSession();
    if (!session) return [];

    const bookings = await prisma.booking.findMany({
      where: { userId: session.id },
      include: {
        product: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return bookings.map(b => ({
      ...b,
      product: {
        ...b.product,
        images: safeParseJSON(b.product.images)
      }
    }));
  } catch (error) {
    console.error('Fetch user bookings error:', error);
    return [];
  }
}

export async function getUserProfile() {
  try {
    const session = await getSession();
    if (!session) return null;

    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true
      }
    });

    return user;
  } catch (error) {
    console.error('Fetch user profile error:', error);
    return null;
  }
}

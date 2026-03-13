import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const demoProducts = [
  {
    title: 'Premium Linen White Shirt',
    description: 'A breathable, lightweight linen shirt perfect for summer. Features a classic collar and perfectly tailored fit.',
    price: 1999,
    category: 'Shirts',
    badge: 'Trending',
    sizes: '["S", "M", "L", "XL"]',
    images: '["https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=800&auto=format&fit=crop"]',
    available: true,
  },
  {
    title: 'Classic Denim Jacket',
    description: 'Timeless blue denim jacket with vintage wash details. A wardrobe essential for every season.',
    price: 3499,
    category: 'Jackets',
    badge: 'New',
    sizes: '["M", "L", "XL"]',
    images: '["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop"]',
    available: true,
  },
  {
    title: 'Embroidered Silk Kurta',
    description: 'Elegant silk kurta featuring intricate hand embroidery around the neckline. Ideal for festive occasions.',
    price: 4999,
    category: 'Ethnic Wear',
    badge: 'Limited',
    sizes: '["S", "M", "L", "XL", "XXL"]',
    images: '["https://images.unsplash.com/photo-1583391733958-d150204b6118?q=80&w=800&auto=format&fit=crop"]',
    available: true,
  },
  {
    title: 'Relaxed Fit Black Jeans',
    description: 'Comfortable relaxed fit jeans in a deep black wash. Made with premium stretch denim.',
    price: 2499,
    category: 'Jeans',
    badge: null,
    sizes: '["30", "32", "34", "36"]',
    images: '["https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop"]',
    available: true,
  },
  {
    title: 'Essential Cotton T-Shirt',
    description: 'Ultra-soft 100% Pima cotton t-shirt. The perfect everyday basic with a tailored silhouette.',
    price: 899,
    category: 'T-Shirts',
    badge: 'Bestseller',
    sizes: '["S", "M", "L", "XL"]',
    images: '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"]',
    available: true,
  },
  {
    title: 'Leather Aviator Jacket',
    description: 'Genuine leather aviator jacket with a plush shearling collar. A statement piece that lasts a lifetime.',
    price: 12999,
    category: 'Jackets',
    badge: 'Premium',
    sizes: '["M", "L"]',
    images: '["https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop"]',
    available: true,
  },
  {
    title: 'Floral Print Casual Shirt',
    description: 'Lightweight viscose shirt featuring a subtle, modern floral print. Perfect for weekends and vacations.',
    price: 1499,
    category: 'Shirts',
    badge: null,
    sizes: '["S", "M", "L", "XL"]',
    images: '["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop"]',
    available: true,
  },
  {
    title: 'Gold-Plated Minimal Cuff',
    description: 'Sleek and minimal cuff bracelet plated in 18k gold. The perfect finishing touch to any outfit.',
    price: 1299,
    category: 'Accessories',
    badge: 'New',
    sizes: '["Free Size"]',
    images: '["https://images.unsplash.com/photo-1627834241595-502a5e42a98f?q=80&w=800&auto=format&fit=crop"]',
    available: true,
  }
];

async function main() {
  console.log('Clearing existing records...');
  await prisma.product.deleteMany({});
  
  console.log('Seeding demo products...');
  for (const product of demoProducts) {
    await prisma.product.create({
      data: product
    });
  }
  
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

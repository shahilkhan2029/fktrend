import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/actions';
import Link from 'next/link';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string, q?: string, sort?: string, size?: string }
}) {
  const categoryFilter = searchParams.category;
  const searchQuery = searchParams.q?.toLowerCase();
  const sortOption = searchParams.sort || 'newest';
  const sizeFilter = searchParams.size;
  
  let products = await getProducts(categoryFilter);
  const categories = await getCategories();

  // Apply Search
  if (searchQuery) {
    products = products.filter(p => 
      p.title.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    );
  }

  // Apply Size Filter
  if (sizeFilter) {
    products = products.filter(p => p.sizes.includes(sizeFilter.toUpperCase()));
  }

  // Apply Sorting
  if (sortOption === 'price-asc') products.sort((a,b) => a.price - b.price);
  if (sortOption === 'price-desc') products.sort((a,b) => b.price - a.price);

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-zinc-900 mb-4">
            {categoryFilter ? `${categoryFilter} Collection` : 'All Products'}
          </h1>
          <p className="text-zinc-600">
            {products.length} {products.length === 1 ? 'item' : 'items'} found.
            {categoryFilter && (
              <Link href="/shop" className="ml-2 py-0.5 px-2 bg-zinc-200 hover:bg-zinc-300 rounded text-sm text-zinc-800 transition-colors">
                Clear filter
              </Link>
            )}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 sticky top-28">
              
              {/* Search */}
              <div className="mb-8">
                <h3 className="font-semibold text-zinc-900 mb-4 tracking-wide uppercase text-sm">Search</h3>
                <form className="relative">
                  <input 
                    type="text" 
                    name="q"
                    defaultValue={searchParams.q}
                    placeholder="Search products..." 
                    className="w-full pl-4 pr-10 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none text-sm transition-all"
                  />
                  <button type="submit" className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-900">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </button>
                </form>
              </div>
              
              <hr className="border-zinc-100 mb-8" />
              
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-zinc-900 mb-4 tracking-wide uppercase text-sm">Categories</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/shop" className={`text-sm ${!categoryFilter ? 'text-[var(--color-gold)] font-medium' : 'text-zinc-600 hover:text-zinc-900'} transition-colors`}>
                      All Items
                    </Link>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.name}>
                      <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} className={`text-sm ${categoryFilter === cat.name ? 'text-[var(--color-gold)] font-medium' : 'text-zinc-600 hover:text-zinc-900'} transition-colors flex justify-between`}>
                        {cat.name}
                        {categoryFilter !== cat.name && <span className="text-zinc-400 text-xs">{cat.count}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="border-zinc-100 mb-8" />
              
              {/* Size */}
              <div className="mb-8">
                <h3 className="font-semibold text-zinc-900 mb-4 tracking-wide uppercase text-sm">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', 'Free Size'].map(size => {
                    const params = new URLSearchParams();
                    if (categoryFilter) params.set('category', categoryFilter);
                    if (sortOption && sortOption !== 'newest') params.set('sort', sortOption);
                    if (searchQuery) params.set('q', searchQuery);
                    if (sizeFilter !== size) params.set('size', size);
                    const href = `/shop${params.toString() ? `?${params.toString()}` : ''}`;
                    return (
                      <Link 
                        key={size} 
                        href={href}
                        className={`w-auto min-w-[2.5rem] px-2 h-10 flex items-center justify-center border rounded text-xs font-medium transition-colors ${sizeFilter === size ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-600 hover:border-zinc-900'}`}
                      >
                        {size}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <hr className="border-zinc-100 mb-8" />
              
              {/* Sort By */}
              <div>
                <h3 className="font-semibold text-zinc-900 mb-4 tracking-wide uppercase text-sm">Sort By</h3>
                <div className="flex flex-col gap-3">
                  {['newest', 'price-asc', 'price-desc'].map(sortVal => {
                    const params = new URLSearchParams();
                    if (categoryFilter) params.set('category', categoryFilter);
                    if (sizeFilter) params.set('size', sizeFilter);
                    if (searchQuery) params.set('q', searchQuery);
                    if (sortVal !== 'newest') params.set('sort', sortVal);
                    const href = `/shop${params.toString() ? `?${params.toString()}` : ''}`;
                    const labels: Record<string, string> = {
                      'newest': 'Newest Arrivals',
                      'price-asc': 'Price: Low to High',
                      'price-desc': 'Price: High to Low'
                    };
                    return (
                      <Link key={sortVal} href={href} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${sortOption === sortVal ? 'border-zinc-900' : 'border-zinc-300 group-hover:border-zinc-500'}`}>
                          {sortOption === sortVal && <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />}
                        </div>
                        <span className="text-sm text-zinc-700">{labels[sortVal]}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:w-3/4">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    category={product.category}
                    imageUrl={product.images?.[0] || '/placeholder.png'}
                    badge={product.badge}
                    sizes={product.sizes}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-zinc-200">
                <p className="text-lg text-zinc-500 mb-4">No products match your current filters.</p>
                <Link href="/shop" className="bg-zinc-900 text-white px-6 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors">
                  Clear All Filters
                </Link>
              </div>
            )}
          </main>
          
        </div>
      </div>
    </div>
  );
}

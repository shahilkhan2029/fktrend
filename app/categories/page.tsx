import CategoryCard from '@/components/CategoryCard';
import { getCategories } from '@/lib/actions';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <span className="text-[var(--color-gold)] font-black uppercase tracking-[0.4em] mb-4 inline-block text-[10px]">The Archive</span>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-zinc-900 mb-8 tracking-tighter leading-none">Collections</h1>
          <p className="text-xl text-zinc-500 font-medium font-serif italic max-w-2xl">
            Discover our curated categories. From everyday essentials to premium ethnic wear, find the perfect piece for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} name={cat.name} image={cat.image} count={cat.count} />
          ))}
        </div>
      </div>
    </div>
  );
}

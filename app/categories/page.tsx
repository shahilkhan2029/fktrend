import CategoryCard from '@/components/CategoryCard';
import { getCategories } from '@/lib/actions';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 mb-4">Shop by Category</h1>
          <p className="text-zinc-600 text-lg">
            Discover our curated collections. From everyday essentials to premium ethnic wear.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} name={cat.name} image={cat.image} count={cat.count} />
          ))}
        </div>
      </div>
    </div>
  );
}

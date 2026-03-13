import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  image: string;
  count?: number;
}

export default function CategoryCard({ name, image, count }: CategoryCardProps) {
  return (
    <Link href={`/shop?category=${encodeURIComponent(name)}`} className="group block relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 aspect-[4/5]">
      <div className="absolute inset-0 bg-zinc-200">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      
      <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:-translate-y-1 transition-transform duration-300">{name}</h3>
          {count !== undefined && (
            <p className="text-zinc-300 text-sm font-medium opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 delay-75">
              {count} Items
            </p>
          )}
        </div>
        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-100">
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
}

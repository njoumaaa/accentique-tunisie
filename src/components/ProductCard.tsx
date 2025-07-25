
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const getCategoryDisplayName = (categories: string[]) => {
    const categoryNames = categories.map(cat => {
      switch (cat) {
        case 'gift-sets': return 'Coffret';
        case 'watches': return 'Montre';
        case 'bracelets': return 'Bracelet';
        case 'rings': return 'Bague';
        default: return cat;
      }
    });
    return categoryNames.join(' · ');
  };

  return (
    <div 
      className={`card-elegant group cursor-pointer overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[imageIndex]}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-blush-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Nouveau
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-gold-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Bestseller
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <div className={`absolute bottom-3 right-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button
              onClick={handleAddToCart}
              className="btn-gold p-3 rounded-full shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          {/* Image Dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex space-x-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === imageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {getCategoryDisplayName(product.category)}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
              <span className="text-xs text-gray-600">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviews})</span>
            </div>
          </div>
          
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-2 group-hover:text-gold-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gold-600">
                {product.price} DT
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice} DT
                </span>
              )}
            </div>
            
            {!product.inStock && (
              <span className="text-xs text-red-500 font-medium">
                Rupture de stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

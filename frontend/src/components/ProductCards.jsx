import React, { useState } from 'react';
import { Edit2, Trash2, ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import { useCartStore } from '../stores/useCartStore';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { deleteProduct } = useProductStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(product.id);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group overflow-hidden">
      {/* Image Container */}
      <figure className="relative overflow-hidden h-72 bg-gradient-to-br from-base-200 to-base-300">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
            <ShoppingCart className="w-24 h-24 text-base-content/30" />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
          <button
            className="btn btn-circle btn-primary btn-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-110"
            title="Edit Product"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-circle btn-error btn-sm transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-lg hover:scale-110"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-100/90 backdrop-blur-sm border-none hover:bg-base-100 shadow-lg z-10"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isLiked ? 'fill-error text-error scale-125' : 'text-base-content'
            }`}
          />
        </button>

        {/* Price Badge */}
        <div className="absolute top-4 left-4 badge badge-primary badge-lg font-bold shadow-xl z-10 price-tag">
          {formatPrice(product.price)}
        </div>

        {/* Stock Badge */}
        {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
          <div className="absolute bottom-4 left-4 badge badge-warning badge-sm shadow-lg z-10">
            Only {product.stock} left!
          </div>
        )}
      </figure>

      {/* Card Body */}
      <div className="card-body p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          {product.category && (
            <span className="badge badge-outline badge-sm">
              {product.category}
            </span>
          )}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-sm font-semibold">4.5</span>
          </div>
        </div>

        {/* Product Name */}
        <h2 className="card-title text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 min-h-[3.5rem]">
          {product.name}
        </h2>

        {/* Product Description */}
        <p className="text-base-content/70 text-sm line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {product.description || 'Premium quality product with excellent features and great value for money.'}
        </p>

        {/* Stock Status */}
        <div className="flex items-center gap-2 mt-2">
          {product.stock !== undefined && (
            <span
              className={`badge badge-sm ${
                product.stock > 10 ? 'badge-success' : product.stock > 0 ? 'badge-warning' : 'badge-error'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          )}
        </div>

        {/* Card Actions */}
        <div className="card-actions justify-between mt-4 gap-2">
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="btn btn-outline btn-sm flex-1 group/btn hover:btn-primary"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </button>
          <button 
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm flex-1 group/btn shadow-lg hover:shadow-xl"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-1 group-hover/btn:animate-bounce" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}

export default ProductCard;

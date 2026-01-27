import React, { useState } from 'react';
import { Edit2, Trash2, ShoppingCart, Heart } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { deleteProduct } = useProductStore();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(product._id);
    }
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
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Image Container */}
      <figure className="relative overflow-hidden h-64 bg-base-200">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <ShoppingCart className="w-20 h-20 text-base-content/30" />
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            className="btn btn-circle btn-primary btn-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            title="Edit Product"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-circle btn-error btn-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-100/80 backdrop-blur-sm border-none hover:bg-base-100"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isLiked ? 'fill-error text-error scale-110' : 'text-base-content'
            }`}
          />
        </button>

        {/* Price Badge */}
        <div className="absolute top-4 left-4 badge badge-primary badge-lg font-bold shadow-lg">
          {formatPrice(product.price)}
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-5">
        {/* Product Name */}
        <h2 className="card-title text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h2>

        {/* Product Description */}
        <p className="text-base-content/70 text-sm line-clamp-2 min-h-[2.5rem]">
          {product.description || 'No description available for this product.'}
        </p>

        {/* Product Details */}
        <div className="flex items-center gap-2 mt-2">
          {product.category && (
            <span className="badge badge-outline badge-sm">
              {product.category}
            </span>
          )}
          {product.stock !== undefined && (
            <span
              className={`badge badge-sm ${
                product.stock > 0 ? 'badge-success' : 'badge-error'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          )}
        </div>

        {/* Card Actions */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm flex-1 group/btn">
            <ShoppingCart className="w-4 h-4 mr-1 group-hover/btn:animate-bounce" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}

export default ProductCard;

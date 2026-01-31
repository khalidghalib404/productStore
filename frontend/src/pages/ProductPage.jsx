import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../stores/useProductStore';
import { ArrowLeft, ShoppingCart, Heart, Share2, Package, DollarSign, Calendar } from 'lucide-react';
import LoadingAnimation from '../components/LoadingAnimation';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, loading } = useProductStore();
  const [product, setProduct] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchProductById(id);
      if (productData) {
        setProduct(productData);
      }
    };
    loadProduct();
  }, [id, fetchProductById]);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingAnimation />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <Package className="w-24 h-24 text-base-content/30" />
          <h2 className="text-3xl font-bold text-base-content/70">Product Not Found</h2>
          <p className="text-base-content/50 text-center max-w-md">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="btn btn-ghost mb-6 gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </button>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <div className="card bg-base-100 shadow-xl overflow-hidden">
            <figure className="relative h-96 lg:h-[600px] bg-base-200">
              {!imageError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Package className="w-32 h-32 text-base-content/30" />
                </div>
              )}
            </figure>
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-6">
          {/* Product Title and Actions */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-base-content">
              {product.name}
            </h1>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="btn btn-circle btn-outline"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-300 ${
                    isLiked ? 'fill-error text-error' : ''
                  }`}
                />
              </button>
              <button className="btn btn-circle btn-outline">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="card bg-primary/10 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Price</h3>
              </div>
              <p className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-base-content/70 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          )}

          {/* Product Details */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <div className="space-y-3">
                {product.category && (
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-base-content/50" />
                    <span className="text-base-content/70">Category:</span>
                    <span className="badge badge-primary">{product.category}</span>
                  </div>
                )}
                {product.stock !== undefined && (
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-base-content/50" />
                    <span className="text-base-content/70">Stock:</span>
                    <span
                      className={`badge ${
                        product.stock > 0 ? 'badge-success' : 'badge-error'
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                    </span>
                  </div>
                )}
                {product.created_at && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-base-content/50" />
                    <span className="text-base-content/70">Added on:</span>
                    <span className="text-base-content">{formatDate(product.created_at)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn btn-circle btn-outline"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="btn btn-circle btn-outline"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-4">
            <button className="btn btn-primary flex-1 btn-lg group">
              <ShoppingCart className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Add to Cart
            </button>
            <button className="btn btn-secondary btn-lg">
              Buy Now
            </button>
          </div>

          {/* Total Price */}
          <div className="alert alert-info">
            <div className="flex justify-between w-full items-center">
              <span className="font-semibold">Total:</span>
              <span className="text-2xl font-bold">
                {formatPrice(product.price * quantity)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-lg">
                <Package className="w-12 h-12 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-base-content/70">
                  On orders over $50
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-lg">
                <Heart className="w-12 h-12 text-error mb-3" />
                <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-sm text-base-content/70">
                  100% satisfaction guaranteed
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-lg">
                <ArrowLeft className="w-12 h-12 text-success mb-3" />
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-base-content/70">
                  30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

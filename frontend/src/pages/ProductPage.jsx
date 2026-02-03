import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../stores/useProductStore';
import { useCartStore } from '../stores/useCartStore';
import { ArrowLeft, ShoppingCart, Heart, Share2, Package, DollarSign, Calendar, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import LoadingAnimation from '../components/LoadingAnimation';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, loading } = useProductStore();
  const { addToCart } = useCartStore();
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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
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
        <div className="flex flex-col items-center justify-center h-96 gap-4 animate-fadeIn">
          <Package className="w-32 h-32 text-base-content/30" />
          <h2 className="text-4xl font-bold text-base-content/70">Product Not Found</h2>
          <p className="text-base-content/50 text-center max-w-md text-lg">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary btn-lg mt-4 shadow-lg">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="btn btn-ghost mb-6 gap-2 hover:btn-primary transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fadeIn">
          {/* Product Image */}
          <div className="relative">
            <div className="card bg-base-100 shadow-2xl overflow-hidden sticky top-24">
              <figure className="relative h-96 lg:h-[600px] bg-gradient-to-br from-base-200 to-base-300">
                {!imageError ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Package className="w-32 h-32 text-base-content/30" />
                  </div>
                )}
                {/* Image Badge */}
                <div className="absolute top-4 left-4 badge badge-primary badge-lg shadow-xl">
                  Premium Quality
                </div>
              </figure>
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col gap-6">
            {/* Product Title and Actions */}
            <div className="animate-slideIn">
              {product.category && (
                <div className="badge badge-secondary badge-lg mb-3">{product.category}</div>
              )}
              <h1 className="text-5xl font-bold mb-4 text-base-content leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                  <span className="ml-2 text-base-content/70">(4.5/5 - 128 reviews)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="btn btn-circle btn-outline hover:btn-error"
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 ${
                      isLiked ? 'fill-error text-error' : ''
                    }`}
                  />
                </button>
                <button className="btn btn-circle btn-outline hover:btn-info">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="card bg-gradient-to-br from-primary/20 to-secondary/20 shadow-xl animate-scaleIn">
              <div className="card-body">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-7 h-7 text-primary" />
                  <h3 className="text-2xl font-semibold">Price</h3>
                </div>
                <p className="text-5xl font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
                <p className="text-base-content/70 mt-2">Free shipping on orders over $50</p>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="text-2xl font-semibold mb-3">Description</h3>
                  <p className="text-base-content/80 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="text-2xl font-semibold mb-4">Product Details</h3>
                <div className="space-y-4">
                  {product.stock !== undefined && (
                    <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="w-6 h-6 text-primary" />
                        <span className="font-medium">Stock Status:</span>
                      </div>
                      <span
                        className={`badge badge-lg ${
                          product.stock > 10 ? 'badge-success' : product.stock > 0 ? 'badge-warning' : 'badge-error'
                        }`}
                      >
                        {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                      </span>
                    </div>
                  )}
                  {product.created_at && (
                    <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-6 h-6 text-primary" />
                        <span className="font-medium">Added on:</span>
                      </div>
                      <span className="text-base-content">{formatDate(product.created_at)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="text-2xl font-semibold mb-4">Quantity</h3>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn btn-circle btn-lg btn-outline hover:btn-primary"
                    disabled={quantity <= 1}
                  >
                    <span className="text-2xl">−</span>
                  </button>
                  <span className="text-4xl font-bold w-20 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 999, quantity + 1))}
                    className="btn btn-circle btn-lg btn-outline hover:btn-primary"
                    disabled={quantity >= (product.stock || 999)}
                  >
                    <span className="text-2xl">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary flex-1 btn-lg group shadow-xl hover:shadow-2xl"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-6 h-6 mr-2 group-hover:animate-bounce" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button 
                onClick={handleAddToCart}
                className="btn btn-secondary btn-lg shadow-xl hover:shadow-2xl"
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
            </div>

            {/* Total Price */}
            <div className="alert alert-info shadow-lg">
              <div className="flex justify-between w-full items-center">
                <span className="font-semibold text-lg">Total:</span>
                <span className="text-3xl font-bold">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <Truck className="w-16 h-16 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
                <p className="text-sm text-base-content/70">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <Shield className="w-16 h-16 text-success mb-3" />
                <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
                <p className="text-sm text-base-content/70">
                  100% satisfaction guaranteed
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <RotateCcw className="w-16 h-16 text-warning mb-3" />
                <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
                <p className="text-sm text-base-content/70">
                  30-day return policy
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <Star className="w-16 h-16 text-accent mb-3" />
                <h3 className="font-semibold text-lg mb-2">Top Rated</h3>
                <p className="text-sm text-base-content/70">
                  4.5+ star reviews
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

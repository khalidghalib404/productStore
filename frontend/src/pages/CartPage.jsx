import React from 'react';
import { useCartStore } from '../stores/useCartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-200">
        <div className="text-center animate-fadeIn">
          <ShoppingBag className="w-32 h-32 mx-auto text-base-content/30 mb-6" />
          <h2 className="text-4xl font-bold mb-4 text-base-content">Your Cart is Empty</h2>
          <p className="text-base-content/70 mb-8 text-lg">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary btn-lg gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <button
            onClick={() => navigate('/')}
            className="btn btn-ghost gap-2 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
          <h1 className="text-4xl font-bold text-base-content mb-2">Shopping Cart</h1>
          <p className="text-base-content/70">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="card bg-base-100 shadow-xl animate-slideIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-body p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="text-xl font-bold text-base-content truncate">
                            {item.name}
                          </h3>
                          {item.category && (
                            <span className="badge badge-outline badge-sm mt-1">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error hover:text-error-content"
                          title="Remove from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
                        {item.description || 'Premium quality product'}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-base-content/70">Quantity:</span>
                          <div className="join">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="btn btn-sm join-item"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <div className="btn btn-sm join-item no-animation">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="btn btn-sm join-item"
                              disabled={item.stock && item.quantity >= item.stock}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-sm text-base-content/70">
                            {formatPrice(item.price)} each
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  clearCart();
                }
              }}
              className="btn btn-outline btn-error w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-24 animate-scaleIn">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-base-content/70">
                    <span>Subtotal</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-base-content/70">
                    <span>Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="flex justify-between text-base-content/70">
                    <span>Tax (estimated)</span>
                    <span>{formatPrice(getTotalPrice() * 0.1)}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(getTotalPrice() * 1.1)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn btn-primary btn-block gap-2 btn-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="mt-4 p-4 bg-base-200 rounded-lg">
                  <p className="text-sm text-base-content/70 text-center">
                    🔒 Secure checkout with SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useCartStore } from '../stores/useCartStore';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, ArrowLeft, Package, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    // Shipping Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setFormData(prev => ({
      ...prev,
      cardNumber: value
    }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setFormData(prev => ({
      ...prev,
      expiryDate: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);
    toast.success('Order placed successfully!');
    
    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 3000);
  };

  if (cart.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
        <div className="card bg-base-100 shadow-2xl max-w-2xl w-full animate-scaleIn">
          <div className="card-body items-center text-center p-8">
            <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="w-16 h-16 text-success-content" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-base-content">Order Confirmed!</h2>
            <p className="text-base-content/70 text-lg mb-2">
              Thank you for your purchase, {formData.fullName}!
            </p>
            <p className="text-base-content/60 mb-6">
              We've sent a confirmation email to <span className="font-semibold">{formData.email}</span>
            </p>
            
            <div className="bg-base-200 rounded-lg p-6 w-full mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base-content/70">Order Number:</span>
                <span className="font-bold text-primary">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base-content/70">Total Amount:</span>
                <span className="font-bold text-2xl text-primary">{formatPrice(getTotalPrice() * 1.1)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={() => navigate('/')}
                className="btn btn-primary flex-1 gap-2"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn btn-outline flex-1 gap-2"
              >
                <Package className="w-5 h-5" />
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <button
            onClick={() => navigate('/cart')}
            className="btn btn-ghost gap-2 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>
          <h1 className="text-4xl font-bold text-base-content mb-2">Checkout</h1>
          <p className="text-base-content/70">Complete your purchase</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="card bg-base-100 shadow-xl animate-slideIn">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-primary-content" />
                    </div>
                    <h2 className="card-title text-2xl">Shipping Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text font-semibold">Full Name *</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Email *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Phone *</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text font-semibold">Address *</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="123 Main Street, Apt 4B"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">City *</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="New York"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">State/Province *</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="NY"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">ZIP/Postal Code *</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="10001"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Country *</span>
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="AF">Afghanistan</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="card bg-base-100 shadow-xl animate-slideIn" style={{ animationDelay: '0.1s' }}>
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary-content" />
                    </div>
                    <h2 className="card-title text-2xl">Payment Information</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Card Number *</span>
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        className="input input-bordered w-full"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Cardholder Name *</span>
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">Expiry Date *</span>
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleExpiryChange}
                          className="input input-bordered w-full"
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">CVV *</span>
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="input input-bordered w-full"
                          placeholder="123"
                          maxLength="4"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info mt-4">
                    <Lock className="w-5 h-5" />
                    <span className="text-sm">Your payment information is encrypted and secure</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card bg-base-100 shadow-xl sticky top-24 animate-scaleIn">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Order Summary</h2>

                  {/* Cart Items */}
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 pb-3 border-b border-base-300">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{item.name}</p>
                          <p className="text-xs text-base-content/70">Qty: {item.quantity}</p>
                          <p className="text-sm font-bold text-primary">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-base-content/70">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-base-content/70">
                      <span>Shipping</span>
                      <span className="text-success">Free</span>
                    </div>
                    <div className="flex justify-between text-base-content/70">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="divider my-2"></div>
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block gap-2 btn-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Place Order
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-base-content/60 mt-4">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

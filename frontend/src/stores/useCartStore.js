import { create } from 'zustand';
import toast from 'react-hot-toast';

export const useCartStore = create((set, get) => ({
  // Cart state
  cart: [],
  cartItems: [],
  
  // Add item to cart
  addToCart: (product, quantity = 1) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Update quantity if item already exists
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      set({
        cart: updatedCart,
        cartItems: updatedCart
      });
      toast.success(`Updated ${product.name} quantity in cart!`);
    } else {
      // Add new item to cart
      const updatedCart = [...cart, { ...product, quantity }];
      set({
        cart: updatedCart,
        cartItems: updatedCart
      });
      toast.success(`${product.name} added to cart!`);
    }
  },
  
  // Remove item from cart
  removeFromCart: (productId) => {
    const { cart } = get();
    const item = cart.find(item => item.id === productId);
    
    const updatedCart = cart.filter(item => item.id !== productId);
    set({
      cart: updatedCart,
      cartItems: updatedCart
    });
    
    if (item) {
      toast.success(`${item.name} removed from cart!`);
    }
  },
  
  // Update item quantity
  updateQuantity: (productId, quantity) => {
    const { cart } = get();
    
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    );
    set({
      cart: updatedCart,
      cartItems: updatedCart
    });
  },
  
  // Clear cart
  clearCart: () => {
    set({ cart: [], cartItems: [] });
    toast.success('Cart cleared!');
  },
  
  // Get cart total
  getTotalPrice: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  // Get cart items count
  getCartItemsCount: () => {
    const { cart } = get();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}));

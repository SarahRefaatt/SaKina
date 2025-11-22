"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock_quantity: number;
  sku: string;
  category: string;
}

interface CartItem {
  id: number;
  cart_id?: number;
  quantity: number;
  product: Product;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set());
  const [shippingCost] = useState(9.99);
  const [taxRate] = useState(0.08);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/carts");
        if (!res.ok) return;
        const { cartItems } = await res.json();
        setCartItems(cartItems || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);
console.log('Cart items:', cartItems);
  // Safe calculation of subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    const product = item.product;
    if (product && typeof product.price === 'number') {
      return sum + product.price * item.quantity;
    }
    return sum;
  }, 0);

  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdatingItems(prev => new Set(prev).add(id));
    
    try {
      // Update local state first for immediate UI feedback
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );

      // Send update to server
      const itemToUpdate = cartItems.find(item => item.id === id);
      if (itemToUpdate) {
        console.log('Updating item on server:', itemToUpdate, 'to quantity:', newQuantity, 'with cart_id:', cartItems[0]?.cart_id);
        const res = await fetch(`/api/cartItems?id=${itemToUpdate.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            cart_id: cartItems[0]?.cart_id, // Assuming all items belong to the same cart   
            product_id: itemToUpdate.product.id,
            quantity: newQuantity 
          })
        });

        console.log('Update response:', res);
        if (!res.ok) {
          throw new Error('Failed to update quantity');
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Revert local state if server update fails
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: cartItems.find(i => i.id === id)?.quantity || 1 } : item
        )
      );
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const removeItem = async (id: number) => {
    setRemovingItems(prev => new Set(prev).add(id));
    
    try {
      // Remove from server first
      const res = await fetch(`/api/cartItems?id=${id}`, { 
        method: 'DELETE' 
      });

      if (!res.ok) {
        throw new Error('Failed to remove item');
      }

      // Only remove from local state if server deletion was successful
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout! In a real application, this would redirect to a checkout page.');
    router.push(`/order`);
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <p className="text-gray-500 mt-4">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl text-gray-200 mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you have not added any items to your cart yet.</p>
            <button 
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => window.history.back()}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Cart Items ({cartItems.length})</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => {
                  const product = item.product;
                  const isUpdating = updatingItems.has(item.id);
                  const isRemoving = removingItems.has(item.id);
                  
                  if (!product) return null;

                  return (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start gap-4">
                      <Image
                        width={160}
                        height={160}
                        src={"/assets/IMG.JPG"}
                        alt={product.name || 'Product image'}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <p className="text-lg font-semibold text-gray-600 mt-1">${product.price?.toFixed(2) || '0.00'}</p>
                        
                        <div className="mt-4 flex items-center">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={isUpdating || isRemoving || item.quantity <= 1}
                            >
                              {isUpdating ? '...' : '-'}
                            </button>
                            <span className="px-3 py-1 text-gray-800">
                              {isUpdating ? '...' : item.quantity}
                            </span>
                            <button 
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={isUpdating || isRemoving}
                            >
                              {isUpdating ? '...' : '+'}
                            </button>
                          </div>
                          
                          <button 
                            className="ml-4 text-red-600 hover:text-red-800 flex items-center disabled:opacity-50"
                            onClick={() => removeItem(item.id)}
                            disabled={isRemoving || isUpdating}
                          >
                            {isRemoving ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-1"></div>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                            {isRemoving ? 'Removing...' : 'Remove'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-lg font-bold text-gray-900">
                        ${((product.price || 0) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors mt-6 disabled:opacity-50"
                  onClick={handleCheckout}
                  disabled={updatingItems.size > 0 || removingItems.size > 0}
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/`)}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// Advanced Shopping Cart System for Food App
import React, { useState, useEffect, useContext, createContext } from 'react';

// Cart Context for global state management
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('foodCart');
    const savedHistory = localStorage.getItem('orderHistory');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedHistory) {
      setOrderHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('foodCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantity = 1, customization = {}) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        cartItem => cartItem.id === item.id && 
        JSON.stringify(cartItem.customization) === JSON.stringify(customization)
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, {
          ...item,
          quantity,
          customization,
          cartId: Date.now() + Math.random(), // Unique cart ID
          addedAt: new Date().toISOString()
        }];
      }
    });

    // Show notification
    showNotification(`${item.name} added to cart!`, 'success');
  };

  const removeFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
    showNotification('Item removed from cart', 'info');
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
    showNotification('Cart cleared', 'info');
  };

  const getCartTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const itemPrice = item.price + (item.customization?.extraCost || 0);
      return total + (itemPrice * item.quantity);
    }, 0);

    let discount = 0;
    if (appliedPromo) {
      discount = subtotal * (appliedPromo.discount / 100);
    }

    const tax = (subtotal - discount) * 0.08; // 8% tax
    const deliveryFee = subtotal > 25 ? 0 : 2.99;

    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      tax: tax.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      total: (subtotal - discount + tax + deliveryFee).toFixed(2)
    };
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const applyPromoCode = (code) => {
    const promoCodes = {
      'SAVE10': { discount: 10, description: '10% off your order' },
      'WELCOME20': { discount: 20, description: '20% off for new customers' },
      'STUDENT15': { discount: 15, description: '15% student discount' },
      'FREESHIP': { discount: 0, freeShipping: true, description: 'Free shipping' }
    };

    const promo = promoCodes[code.toUpperCase()];
    if (promo) {
      setAppliedPromo({ ...promo, code: code.toUpperCase() });
      showNotification(`Promo code applied: ${promo.description}`, 'success');
      return true;
    } else {
      showNotification('Invalid promo code', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    showNotification('Promo code removed', 'info');
  };

  const placeOrder = async (deliveryInfo, paymentInfo) => {
    try {
      const order = {
        id: `ORDER-${Date.now()}`,
        items: cartItems,
        totals: getCartTotal(),
        deliveryInfo,
        paymentInfo: { ...paymentInfo, cardNumber: '****' + paymentInfo.cardNumber.slice(-4) },
        promoCode: appliedPromo,
        orderDate: new Date().toISOString(),
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setOrderHistory(prev => [order, ...prev]);
      localStorage.setItem('orderHistory', JSON.stringify([order, ...orderHistory]));
      
      clearCart();
      showNotification('Order placed successfully! 🎉', 'success');
      
      return order;
    } catch (error) {
      showNotification('Order failed. Please try again.', 'error');
      throw error;
    }
  };

  const reorderItems = (order) => {
    order.items.forEach(item => {
      addToCart(item, item.quantity, item.customization);
    });
    showNotification('Items added to cart from previous order', 'success');
  };

  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: 'bold',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'success' ? '#10b981' : 
                      type === 'error' ? '#ef4444' : '#3b82f6'
    });

    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    orderHistory,
    promoCode,
    setPromoCode,
    appliedPromo,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    applyPromoCode,
    removePromoCode,
    placeOrder,
    reorderItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Cart Button Component
export const CartButton = () => {
  const { getCartCount, isCartOpen, setIsCartOpen } = useCart();
  const cartCount = getCartCount();

  return (
    <button 
      className="cart-button"
      onClick={() => setIsCartOpen(!isCartOpen)}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#10b981',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        fontSize: '24px',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        transform: isCartOpen ? 'scale(1.1)' : 'scale(1)'
      }}
    >
      🛒
      {cartCount > 0 && (
        <span style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          background: '#ef4444',
          color: 'white',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}>
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </button>
  );
};

// Cart Item Component
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const itemTotal = (item.price + (item.customization?.extraCost || 0)) * item.quantity;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      borderBottom: '1px solid #e5e7eb',
      gap: '12px'
    }}>
      <img 
        src={item.image} 
        alt={item.name}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '8px',
          objectFit: 'cover'
        }}
      />
      
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
          {item.name}
        </h4>
        
        {item.customization && Object.keys(item.customization).length > 0 && (
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
            {Object.entries(item.customization)
              .filter(([key, value]) => key !== 'extraCost' && value)
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ')
            }
          </div>
        )}
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '8px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f3f4f6',
            borderRadius: '6px',
            padding: '4px'
          }}>
            <button
              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '4px',
                color: '#6b7280'
              }}
            >
              −
            </button>
            
            <span style={{ minWidth: '20px', textAlign: 'center', fontSize: '14px' }}>
              {item.quantity}
            </span>
            
            <button
              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '4px',
                color: '#6b7280'
              }}
            >
              +
            </button>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontWeight: '600', color: '#10b981' }}>
              ${itemTotal.toFixed(2)}
            </span>
            
            <button
              onClick={() => removeFromCart(item.cartId)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ef4444',
                padding: '4px',
                borderRadius: '4px'
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Promo Code Component
const PromoCodeSection = () => {
  const { promoCode, setPromoCode, appliedPromo, applyPromoCode, removePromoCode } = useCart();

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      applyPromoCode(promoCode);
    }
  };

  return (
    <div style={{ padding: '15px', borderBottom: '1px solid #e5e7eb' }}>
      {appliedPromo ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#d1fae5',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #10b981'
        }}>
          <div>
            <div style={{ fontWeight: '600', color: '#065f46', fontSize: '14px' }}>
              {appliedPromo.code}
            </div>
            <div style={{ fontSize: '12px', color: '#047857' }}>
              {appliedPromo.description}
            </div>
          </div>
          <button
            onClick={removePromoCode}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ef4444',
              fontSize: '16px'
            }}
          >
            ×
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
          <button
            onClick={handleApplyPromo}
            disabled={!promoCode.trim()}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              opacity: promoCode.trim() ? 1 : 0.5
            }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

// Cart Summary Component
const CartSummary = () => {
  const { getCartTotal } = useCart();
  const totals = getCartTotal();

  return (
    <div style={{ padding: '15px' }}>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Subtotal:</span>
          <span>${totals.subtotal}</span>
        </div>
        
        {parseFloat(totals.discount) > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            color: '#10b981'
          }}>
            <span>Discount:</span>
            <span>-${totals.discount}</span>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Tax:</span>
          <span>${totals.tax}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Delivery:</span>
          <span>{parseFloat(totals.deliveryFee) === 0 ? 'FREE' : `$${totals.deliveryFee}`}</span>
        </div>
        
        <hr style={{ margin: '12px 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '18px',
          fontWeight: '700',
          color: '#10b981'
        }}>
          <span>Total:</span>
          <span>${totals.total}</span>
        </div>
      </div>
    </div>
  );
};

// Main Cart Sidebar Component
export const CartSidebar = () => {
  const { cartItems, isCartOpen, setIsCartOpen, clearCart, getCartCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);
    // Here you would integrate with a checkout flow
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsCartOpen(false);
    }, 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998
        }}
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: 'white',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '2px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
            Your Cart ({getCartCount()})
          </h2>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  background: 'none',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Clear
              </button>
            )}
            
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              ×
            </button>
          </div>
        </div>
        
        {cartItems.length === 0 ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            textAlign: 'center',
            padding: '40px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
            <h3 style={{ margin: '0 0 8px 0' }}>Your cart is empty</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Add some delicious items to get started!
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 200px)'
            }}>
              {cartItems.map(item => (
                <CartItem key={item.cartId} item={item} />
              ))}
            </div>
            
            {/* Promo Code Section */}
            <PromoCodeSection />
            
            {/* Cart Summary */}
            <CartSummary />
            
            {/* Checkout Button */}
            <div style={{ padding: '20px' }}>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                style={{
                  width: '100%',
                  background: isCheckingOut ? '#6b7280' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

// Enhanced Food Item Card with Add to Cart
export const FoodItemCard = ({ item, onAddToCart }) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [customization, setCustomization] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(item, quantity, customization);
    setShowCustomization(false);
    setCustomization({});
    setQuantity(1);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    }}
    >
      <div style={{ position: 'relative' }}>
        <img 
          src={item.image} 
          alt={item.name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover'
          }}
        />
        
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          ⭐ {item.rating}
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: 'rgba(16, 185, 129, 0.9)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {item.cookTime}
        </div>
      </div>
      
      <div style={{ padding: '16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
            {item.name}
          </h3>
          
          <span style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#10b981'
          }}>
            ${item.price}
          </span>
        </div>
        
        <p style={{
          margin: '0 0 12px 0',
          color: '#6b7280',
          fontSize: '14px',
          lineHeight: '1.4'
        }}>
          {item.description}
        </p>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '16px'
        }}>
          {item.tags?.map(tag => (
            <span
              key={tag}
              style={{
                background: '#f3f4f6',
                color: '#6b7280',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            style={{
              flex: 1,
              background: 'none',
              border: '2px solid #10b981',
              color: '#10b981',
              borderRadius: '8px',
              padding: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            Customize
          </button>
          
          <button
            onClick={handleAddToCart}
            style={{
              flex: 2,
              background: '#10b981',
              border: 'none',
              color: 'white',
              borderRadius: '8px',
              padding: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            Add to Cart
          </button>
        </div>
        
        {showCustomization && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
              Customize your order
            </h4>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                style={{
                  width: '60px',
                  padding: '6px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                Special instructions:
              </label>
              <textarea
                placeholder="Any special requests..."
                value={customization.instructions || ''}
                onChange={(e) => setCustomization(prev => ({
                  ...prev,
                  instructions: e.target.value
                }))}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  resize: 'none',
                  height: '60px',
                  fontSize: '12px'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
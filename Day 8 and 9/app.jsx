import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Sample food items data
  const [foodItems] = useState([
    {
      id: 1,
      name: 'Margherita Pizza',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      category: 'Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil'
    },
    {
      id: 2,
      name: 'Chicken Burger',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
      category: 'Burgers',
      description: 'Grilled chicken breast with lettuce, tomato, and mayo'
    },
    {
      id: 3,
      name: 'Caesar Salad',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop',
      category: 'Salads',
      description: 'Fresh romaine lettuce with caesar dressing and croutons'
    },
    {
      id: 4,
      name: 'Spaghetti Carbonara',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop',
      category: 'Pasta',
      description: 'Creamy pasta with bacon, eggs, and parmesan cheese'
    },
    {
      id: 5,
      name: 'Fish Tacos',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1565299585323-38174c6ba2b2?w=300&h=200&fit=crop',
      category: 'Mexican',
      description: 'Grilled fish with cabbage slaw and chipotle sauce'
    },
    {
      id: 6,
      name: 'Chocolate Cake',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
      category: 'Desserts',
      description: 'Rich chocolate cake with chocolate frosting'
    }
  ]);

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(foodItems.map(item => item.category))];

  // Filter items by category
  const filteredItems = selectedCategory === 'All' 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Update quantity in cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Food Item Component
  const FoodItem = ({ item }) => (
    <div className="food-item">
      <img src={item.image} alt={item.name} className="food-image" />
      <div className="food-info">
        <h3>{item.name}</h3>
        <p className="description">{item.description}</p>
        <div className="price-add">
          <span className="price">${item.price}</span>
          <button onClick={() => addToCart(item)} className="add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  // Cart Item Component
  const CartItem = ({ item }) => (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <span className="cart-item-price">${item.price}</span>
      </div>
      <div className="quantity-controls">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
      <button onClick={() => removeFromCart(item.id)} className="remove-btn">×</button>
    </div>
  );

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="logo">🍕 FoodieExpress</h1>
          <button 
            className="cart-button" 
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>
      </header>

      <div className="container">
        {/* Category Filter */}
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Food Items Grid */}
          <div className="food-grid">
            {filteredItems.map(item => (
              <FoodItem key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Sidebar */}
          {isCartOpen && (
            <div className="cart-sidebar">
              <div className="cart-header">
                <h2>Your Order</h2>
                <button onClick={() => setIsCartOpen(false)} className="close-cart">×</button>
              </div>
              
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                  
                  <div className="cart-footer">
                    <div className="total">
                      <strong>Total: ${calculateTotal()}</strong>
                    </div>
                    <button className="checkout-btn">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cart Overlay */}
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
    </div>
  );
};

export default App;

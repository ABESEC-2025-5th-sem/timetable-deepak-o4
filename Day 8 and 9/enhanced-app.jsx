// Enhanced Food App with Search and Filters
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Enhanced food items data with more categories and details
  const [allFoodItems] = useState([
    {
      id: 1,
      name: 'Margherita Pizza',
      price: 12.99,
      rating: 4.5,
      cookTime: '15-20 min',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      category: 'Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
      tags: ['vegetarian', 'classic', 'italian']
    },
    {
      id: 2,
      name: 'Chicken Burger',
      price: 8.99,
      rating: 4.2,
      cookTime: '10-15 min',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
      category: 'Burgers',
      description: 'Grilled chicken breast with lettuce, tomato, and mayo',
      tags: ['protein', 'grilled', 'popular']
    },
    {
      id: 3,
      name: 'Caesar Salad',
      price: 7.99,
      rating: 4.0,
      cookTime: '5 min',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop',
      category: 'Salads',
      description: 'Fresh romaine lettuce with caesar dressing and croutons',
      tags: ['healthy', 'fresh', 'vegetarian']
    },
    {
      id: 4,
      name: 'Spaghetti Carbonara',
      price: 14.99,
      rating: 4.8,
      cookTime: '20-25 min',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop',
      category: 'Pasta',
      description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
      tags: ['creamy', 'italian', 'premium']
    },
    {
      id: 5,
      name: 'Fish Tacos',
      price: 11.99,
      rating: 4.3,
      cookTime: '12-15 min',
      image: 'https://images.unsplash.com/photo-1565299585323-38174c6ba2b2?w=300&h=200&fit=crop',
      category: 'Mexican',
      description: 'Grilled fish with cabbage slaw and chipotle sauce',
      tags: ['seafood', 'spicy', 'mexican']
    },
    {
      id: 6,
      name: 'Chocolate Cake',
      price: 6.99,
      rating: 4.7,
      cookTime: '5 min',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
      category: 'Desserts',
      description: 'Rich chocolate cake with chocolate frosting',
      tags: ['sweet', 'chocolate', 'dessert']
    }
  ]);

  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(allFoodItems.map(item => item.category))];

  // Filter and sort items
  useEffect(() => {
    let filtered = allFoodItems;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by price range
    filtered = filtered.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);

    // Sort items
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'cookTime':
          return parseInt(a.cookTime) - parseInt(b.cookTime);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFoodItems(filtered);
  }, [selectedCategory, searchQuery, sortBy, priceRange, allFoodItems]);

  // Cart functions
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

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

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

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Food Item Component with enhanced display
  const FoodItem = ({ item }) => (
    <div className="food-item enhanced">
      <img src={item.image} alt={item.name} className="food-image" />
      <div className="food-info">
        <h3>{item.name}</h3>
        <div className="item-meta">
          <span className="rating">⭐ {item.rating}</span>
          <span className="cook-time">🕒 {item.cookTime}</span>
        </div>
        <p className="description">{item.description}</p>
        <div className="tags">
          {item.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
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
    <div className="app enhanced">
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="logo">🍕 Enhanced FoodieExpress</h1>
          <div className="header-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className="filter-btn" 
              onClick={() => setShowFilters(!showFilters)}
            >
              🔍 Filters
            </button>
            <button 
              className="cart-button" 
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="cookTime">Cook Time</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
              />
            </div>
          </div>
        )}

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

        {/* Results Info */}
        <div className="results-info">
          Showing {foodItems.length} items
          {searchQuery && ` for "${searchQuery}"`}
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Food Items Grid */}
          <div className="food-grid">
            {foodItems.map(item => (
              <FoodItem key={item.id} item={item} />
            ))}
            {foodItems.length === 0 && (
              <div className="no-results">
                <p>No items found. Try adjusting your filters.</p>
              </div>
            )}
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
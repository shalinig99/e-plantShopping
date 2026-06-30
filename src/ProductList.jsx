import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice'; // Adjust path if CartSlice is in another directory
import CartItem from './CartItem'; // Make sure to import your Cart component
import './ProductList.css'; 

function ProductList() {
  const dispatch = useDispatch();
  
  // Toggle state to switch between Plant Listing and Cart View
  const [showCart, setShowCart] = useState(false);
  
  // Access the Redux store to track items currently in the cart
  const cartItems = useSelector((state) => state.cart.items);
  
  // Local state to track which products have been added to the cart
  const [addedToCart, setAddedToCart] = useState({});

  // Mock array structure
  const plantsArray = [
    {
      category: "Air Purifying",
      plants: [
        {
          name: "Snake Plant",
          image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500",
          description: "Produces oxygen at night and improves air quality.",
          cost: 15
        },
        {
          name: "Spider Plant",
          image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=500",
          description: "Filters airborne toxins and is extremely easy to grow.",
          cost: 12
        }
      ]
    },
    {
      category: "Aromatic",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=500",
          description: "Calming scent that helps reduce stress and anxiety.",
          cost: 18
        },
        {
          name: "Rosemary",
          image: "https://images.unsplash.com/photo-1515549832467-872098e253b8?w=500",
          description: "Fragrant herb that thrives in sunny spots.",
          cost: 10
        }
      ]
    }
  ];

  // Retrieve and display the total quantity of items currently in the cart
  const calculateTotalQuantity = () => { 
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0; 
  };

  // Function to handle adding items to global Redux store and tracking locally
  const handleAddToCart = (product) => {
    dispatch(addItem(product)); 

    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true, 
    }));
  };

  // Handler for navigation clicks
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); // Show Cart View
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false); // Return to Product Grid View
  };

  return (
    <div>
      {/* Integrated Navigation Bar */}
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#4CAF50', color: 'white', alignItems: 'center' }}>
        <div className="navbar-logo" style={{ fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }} onClick={handlePlantsClick}>
          Paradise Nursery
        </div>
        <div className="navbar-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={handlePlantsClick}>Plants</span>
          <div className="cart-icon-container" style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleCartClick}>
            <span className="cart-icon" style={{ fontSize: '24px' }}>🛒</span>
            {/* Dynamic visual item badge counter */}
            {calculateTotalQuantity() > 0 && (
              <span className="cart-badge" style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {calculateTotalQuantity()}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Conditional Rendering based on state */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => ( 
            <div key={index} className="category-section">
              <h1 className="category-title">{category.category}</h1>
              <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {category.plants.map((plant, plantIndex) => ( 
                  <div className="product-card" key={plantIndex}>
                    <img 
                      className="product-image" 
                      src={plant.image} 
                      alt={plant.name} 
                    />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">${plant.cost}</div>
                    <button
                      className="product-button"
                      disabled={addedToCart[plant.name]} 
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // When showCart is true, render the Cart view and pass down a function to navigate back
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
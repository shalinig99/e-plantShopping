import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Adjust import path if needed
import './CartItem.css'; // Optional styling sheet mapping

function CartItem({ onContinueShopping }) {
  // Extract cart array elements from the global Redux state
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // 1. Calculate the cumulative total amount for all items in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      // Handles both direct numbers and strings with currency symbols (e.g., "$15.00")
      const costValue = typeof item.cost === 'string' 
        ? parseFloat(item.cost.replace('$', '')) 
        : item.cost;
      total += costValue * item.quantity;
    });
    return total;
  };

  // 2. Continuous shopping routing helper callback
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // 3. Checkout confirmation handler displaying fallback notification
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // 4. Increment plant item quantity by 1
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // 5. Decrement plant item quantity by 1, or remove entirely if dropping to 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // 6. Complete removal click listener
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 7. Calculate subtotal cost for individual plant items
  const calculateTotalCost = (item) => {
    const costValue = typeof item.cost === 'string' 
      ? parseFloat(item.cost.replace('$', '')) 
      : item.cost;
    return costValue * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {typeof item.cost === 'number' ? `$${item.cost}` : item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }} className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button checkout-btn" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
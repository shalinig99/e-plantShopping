import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Adjust path if CartSlice is inside a components folder, e.g., './components/CartSlice'

// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
    // Define the root reducer object
    reducer: {
        // 'cart' is the name of the slice in the store, managed globally by cartReducer
        cart: cartReducer,
    },
});

// Export the store for use in the app (e.g., wrapped inside <Provider store={store}> in main.jsx/index.js)
export default store;
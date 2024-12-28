import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product._id === product._id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      
      state.total = state.items.reduce((total, item) => 
        total + (item.product.price * item.quantity), 0
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.product._id !== action.payload);
      state.total = state.items.reduce((total, item) => 
        total + (item.product.price * item.quantity), 0
      );
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product._id === productId);
      if (item) {
        item.quantity = quantity;
      }
      state.total = state.items.reduce((total, item) => 
        total + (item.product.price * item.quantity), 0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

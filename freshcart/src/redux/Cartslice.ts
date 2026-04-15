import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProductDetails {
  _id: string;
  title: string;
  imageCover: string;
  category: { name: string };
}

interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: ProductDetails;
}

interface CartData {
  products: CartItem[];
  totalCartPrice: number;
  _id: string;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  numOfCartItems: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  numOfCartItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartData | null>) => {
      if (action.payload) {
        state.items = action.payload.products;
        state.totalPrice = action.payload.totalCartPrice;
        state.numOfCartItems = action.payload.products.length;
      } else {
        state.items = [];
        state.totalPrice = 0;
        state.numOfCartItems = 0;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.numOfCartItems = 0;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
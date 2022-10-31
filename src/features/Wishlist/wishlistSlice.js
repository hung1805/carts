import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// Success Toast
const succesNotify = (value) => {
  return toast.success(value, {
    theme: "colored",
  });
};
const infoNotify = (value) => {
  return toast.info(value, {
    theme: "colored",
  });
};

const initialState = [];
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    updateWishlist: {
      reducer: (state, action) => {
        const { title, id } = action.payload;
        if (state.some((item) => item.id === id))
          infoNotify(`${title} already in wishlist`);
        else {
          state.push(action.payload);
          succesNotify(`Added ${title} to wishlist`);
        }
      },
    },
    removeItemInWishlist: {
      reducer: (state, action) => {
        const { id } = action.payload;
        return state.filter((item) => item.id !== id);
      },
    },
  },
});

const { reducer: wishlistReducer } = wishlistSlice;
export default wishlistReducer;

export const { updateWishlist, removeItemInWishlist } = wishlistSlice.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  removeItem,
  addItemToCart,
  firebaseUpdateCart,
  updateQuantityOfItem,
  payment,
} from "../../configs/firebase";
import { toast } from "react-toastify";
import { roundedPrice } from "../../utils/common";

const successNotify = (notification) => {
  return toast.success(notification, {
    theme: "colored",
  });
};
const infoNotify = (notification) => {
  return toast.info(notification);
};

const errorNotify = (notification) => {
  return toast.error(notification);
};

const initialState = {
  list: [],
  checkedOut: [],
  error: "",
};

const addCartItem = createAsyncThunk(
  "cart/add-to-list",
  async ({ userId, data }, { rejectWithValue }) => {
    const response = await addItemToCart(userId, data)
      .then(() => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
);
const updateCart = createAsyncThunk(
  "cart/update-cart",
  async ({ userId, data }, { rejectWithValue }) => {
    const response = await firebaseUpdateCart(userId, data)
      .then(() => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
);

const removeItemInCart = createAsyncThunk(
  "cart/remove-item",
  async ({ userId, data }, { rejectWithValue }) => {
    const response = await removeItem(userId, data)
      .then(() => {
        return data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
);

const updateItemQuantity = createAsyncThunk(
  "cart/update-item-quantity",
  async ({ userId, list, value, index }, { rejectWithValue }) => {
    const response = await updateQuantityOfItem(userId, list, value, index)
      .then(() => {
        // console.log(count, index, list);
        return { value, index, list };
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
);

const doPayment = createAsyncThunk(
  "cart/payment",
  async ({ userId, list }, { rejectWithValue }) => {
    const response = await payment(userId, list)
      .then(() => {
        return list;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeUserCart: {
      reducer: (state, action) => {
        const { checkedOut, list } = action.payload;
        state.list = list;
        state.checkedOut = checkedOut;
      },
      prepare: (data) => {
        const { checkedOut, list } = data;
        return {
          payload: {
            checkedOut,
            list,
          },
        };
      },
    },
    clearCartWhenSignOut: {
      reducer: (state) => {
        state.list = [];
        state.checkedOut = [];
        state.error = "";
      },
    },
  },
  extraReducers: (builder) => {
    //Add Item to Cart pending
    builder.addCase(addCartItem.pending, (state, action) => {});

    // Add Item to Cart fulfilled
    builder.addCase(addCartItem.fulfilled, (state, action) => {
      state.list.push(action.payload);
      const { title, count } = action.payload;
      successNotify(`Added ${count} ${title} to cart`);
    });

    //Add Item to Cart rejected
    builder.addCase(addCartItem.rejected, (state, action) => {
      state.error = action.payload;
    });

    //Remove item from Cart pending
    builder.addCase(removeItemInCart.pending, (state, action) => {});

    //Remove Item from Cart fulfilled
    builder.addCase(removeItemInCart.fulfilled, (state, action) => {
      const newList = state.list.filter((item) => {
        return item.title !== action.payload.title;
      });
      state.list = newList;
      successNotify(`Removed ${action.payload.count} ${action.payload.title} from cart`);
    });

    //Remove Item from Cart rejected
    builder.addCase(removeItemInCart.rejected, (state, action) => {
      state.error = action.payload;
    });

    //Update Multi Item in Cart pending
    builder.addCase(updateCart.pending, (state, action) => {
      infoNotify("Updating. Please wait...");
    });

    //Update multi Item in Cart fulfilled
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.list = action.payload;
      successNotify("Updated Your Cart");
    });

    //Update Multi Item in Cart rejected
    builder.addCase(updateCart.rejected, (state, action) => {
      errorNotify("Failed to update Cart. Please try again...");
    });

    //Update Item Quantity pending
    builder.addCase(updateItemQuantity.pending, (state, action) => {});

    //Update Item Quantity fulfilled
    builder.addCase(updateItemQuantity.fulfilled, (state, action) => {
      const { value, index, list } = action.payload;
      const arr = [...list];
      const term = arr[index].count;
      arr[index] = {
        ...arr[index],
        count: value,
        totalPrice: roundedPrice(arr[index].count, value),
      };
      state.list = [...arr];
      successNotify(
        `Already have ${arr[index].title} in cart. We updated quantity from ${term} to ${value} products`
      );
    });

    //Update Item Quantity rejected
    builder.addCase(updateItemQuantity.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(doPayment.pending, (state, action) => {
      infoNotify("Doing Payment. Please wait...");
    });
    builder.addCase(doPayment.fulfilled, (state, action) => {
      state.list = [];
      state.checkedOut = action.payload.list;
      successNotify("Payment done");
    });
    builder.addCase(doPayment.rejected, (state, action) => {});
  },
});

const { reducer: cartReducer } = cartSlice;
export default cartReducer;
export const { initializeUserCart, clearCartWhenSignOut } = cartSlice.actions;
export { addCartItem, removeItemInCart, updateCart, updateItemQuantity, doPayment };

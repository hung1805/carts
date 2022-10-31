import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import storage from "redux-persist/lib/storage";

//Firebase
import {
  signin,
  signout,
  createUserData,
  signup,
  createUserCart,
  signInWithGG,
  signInWithFB,
  updatePass,
  updateUserName,
  firebaseUpdateUserProfile,
} from "configs/firebase";

// Success Toast
const succesNotify = (value) => {
  return toast.success(value, {
    theme: "colored",
  });
};
const infoNotify = (value) => {
  return toast.info(value, { theme: "colored" });
};

//Error Toast
const errorNotify = (value) => {
  return toast.error(value, {
    theme: "colored",
  });
};

//Redux auth initialization
const initialState = {
  isLoading: false,
  user: {
    name: "",
    id: "",
    email: "",
    password: "",
    photoURL: null,
    role: "unknown",
    accessToken: "",
    expirationTime: 0,
    refreshToken: "",
  },
  errorMsg: null,
};

//Login
const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    const response = await signin(email, password)
      .then(({ user }) => {
        return { user, password };
      })
      .catch((error) => {
        return { code: error.code, message: error.message };
      });
    if (response.code) {
      return rejectWithValue(response);
    }
    return response;
  }
);

//Logout
const logout = createAsyncThunk("user/logout", async () => {
  const response = await signout()
    .then(() => {})
    .catch((error) => {
      return { code: error.code, message: error.message };
    });
  return response;
});

//Register
const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    const response = await signup(name, email, password)
      .then(({ user }) => {
        return { user, password };
      })
      .catch((error) => {
        return { code: error.code, message: error.message };
      });
    console.log(response);
    if (response.code) {
      return rejectWithValue(response.message);
    }
    createUserData(response.uid, name, email);
    createUserCart(response.uid);
    return response;
  }
);

//Sign In with Google
const signInWithGoogle = createAsyncThunk("user/sign-in-google", async () => {
  const response = await signInWithGG()
    .then((result) => {
      const { user } = result;
      const { displayName, email, photoURL, uid } = user;
      const { accessToken, expirationTime, refreshToken } = user.stsTokenManager;
      createUserData(uid, displayName, email, photoURL);
      createUserCart(uid);
      return {
        accessToken,
        displayName,
        email,
        photoURL,
        uid,
        expirationTime,
        refreshToken,
      };
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
});

//Sign in with Facebook
const signInWithFacebook = createAsyncThunk("user/sign-in-facebook", async () => {
  const response = await signInWithFB()
    .then((result) => {
      const { user } = result;
      const { displayName, email, photoURL, uid } = user;
      const { accessToken, expirationTime, refreshToken } = user.stsTokenManager;
      createUserData(uid, displayName, email, photoURL);
      createUserCart(uid);
      return {
        accessToken,
        displayName,
        email,
        photoURL,
        uid,
        expirationTime,
        refreshToken,
      };
    })
    .catch((error) => {
      return error;
    });
  return response;
});

//Update User Password
const updatePassword = createAsyncThunk(
  "user/update-password",
  async ({ user, newPass }, { rejectWithValue }) => {
    const response = await updatePass(user, newPass)
      .then(() => {
        return newPass;
      })
      .catch((error) => {
        return error;
      });
    if (response.error) return rejectWithValue(response);
    return response;
  }
);

//Update User Name
const changeUserName = createAsyncThunk(
  "user/update-name",
  async ({ userId, name }, { rejectWithValue }) => {
    const response = await updateUserName(userId, name)
      .then(() => {
        return name;
      })
      .catch((error) => {
        return error;
      });
    if (response.error) return rejectWithValue(response);
    return response;
  }
);

//Update User Profile
const updateUserProfile = createAsyncThunk(
  "user/update-profile",
  async ({ user, name }) => {
    const response = await firebaseUpdateUserProfile(user, name)
      .then(() => {
        return name;
      })
      .catch((error) => {
        return error;
      });
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserData: {
      reducer: (state, action) => {
        const { name, role, photoURL } = action.payload;
        state.user.name = name;
        state.user.role = role;
        state.user.photoURL = photoURL;
        succesNotify(`Welcome ${name}`);
      },
      prepare: (data) => {
        const { name, role, photoURL } = data;
        return {
          payload: {
            name,
            role,
            photoURL,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    //Login Pending
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    //Login Fulfilled
    builder.addCase(login.fulfilled, (state, action) => {
      const { user, password } = action.payload;
      const { uid, email, photoURL } = user;
      const { refreshToken, accessToken, expirationTime } = user.stsTokenManager;
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          email,
          id: uid,
          password,
          accessToken,
          refreshToken,
          expirationTime,
          photoURL,
        },
      };
    });

    //Login Rejected
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.payload.message;
      errorNotify(action.payload.message);
    });

    //Logout Pending
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });

    //Logout Success
    builder.addCase(logout.fulfilled, (state) => {
      storage.removeItem("persist:root");
      return initialState;
    });

    //Logout Rejected
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.payload;
    });

    //Register Pending
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });

    //Register Fulfilled
    builder.addCase(register.fulfilled, (state, action) => {
      const { user, password } = action.payload;
      const { email, uid } = user;
      const { accessToken, expirationTime, refreshToken } = user.stsTokenManager;
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          email,
          password,
          id: uid,
          accessToken,
          expirationTime,
          refreshToken,
        },
      };
    });

    //Register Rejected
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.payload;
      errorNotify(action.payload);
    });

    //Login with GG pending
    builder.addCase(signInWithGoogle.pending, (state, action) => {
      state.isLoading = true;
    });

    //Login with GG fulfilled
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      const {
        accessToken,
        displayName,
        email,
        photoURL,
        uid,
        expirationTime,
        refreshToken,
      } = action.payload;
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          name: displayName,
          email,
          id: uid,
          accessToken,
          expirationTime,
          refreshToken,
          photoURL,
          role: "user",
        },
      };
    });

    //Login with GG rejected
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });

    //Login with Facebook pending
    builder.addCase(signInWithFacebook.pending, (state, action) => {
      state.isLoading = true;
    });

    //Login with Facebook fulfilled
    builder.addCase(signInWithFacebook.fulfilled, (state, action) => {
      const {
        accessToken,
        displayName,
        email,
        photoURL,
        uid,
        expirationTime,
        refreshToken,
      } = action.payload;
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          name: displayName,
          email,
          id: uid,
          accessToken,
          expirationTime,
          refreshToken,
          photoURL,
          role: "user",
        },
      };
    });

    //Login Facebook Rejected
    builder.addCase(signInWithFacebook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });

    //Update User Password pending
    builder.addCase(updatePassword.pending, (state, action) => {
      infoNotify("Updating your Password. Please wait...");
    });

    //Update Password fulfilled
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.user.password = action.payload;
      succesNotify(
        "Changed Password Successfully. Next time you can login with new passsword."
      );
    });

    //Update Password Rejected
    builder.addCase(updatePassword.rejected, (state, action) => {
      errorNotify(action.payload);
    });

    //Update Name Pending
    builder.addCase(changeUserName.pending, (state, action) => {
      state.isLoading = true;
    });

    //Update Name Fulfilled
    builder.addCase(changeUserName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user.name = action.payload;
      succesNotify("Your name has been changed successfully");
    });

    //Update Profile Pending
    builder.addCase(updateUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });

    //Update User Profile in Firebase Sign in  Fulfilled
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.user.name = action.payload;
      // succesNotify("Your name has been changed successfully");
    });
  },
});
const { reducer: authReducer } = authSlice;
export default authReducer;
export {
  login,
  logout,
  register,
  signInWithGoogle,
  signInWithFacebook,
  updatePassword,
  changeUserName,
  updateUserProfile,
};
export const { updateUserData } = authSlice.actions;

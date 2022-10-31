import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "@firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updatePassword,
  updateProfile,
} from "@firebase/auth";
import { initializeApp } from "@firebase/app";
import { roundedPrice } from "../utils/common";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const ggProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

//Sign in with Email ans Password
const signin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//Sign In with Google
const signInWithGG = async () => {
  return await signInWithPopup(auth, ggProvider);
};

//Sign In with Facebook
const signInWithFB = async () => {
  return await signInWithPopup(auth, fbProvider);
};

//Sign up with Email and Password
const signup = async (name, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//SignOut
const signout = async () => {
  return await signOut(auth);
};

//Create User Data in Firestore
const createUserData = async (userId, userName, email, photoURL = null) => {
  await setDoc(doc(db, "users", userId), {
    name: userName,
    email: email,
    role: "user",
    photoURL,
  });
};

//Add Item to Cart in Firestore
const addItemToCart = async (userId, data) => {
  const listRef = doc(db, "carts", userId);
  return await updateDoc(listRef, {
    list: arrayUnion(data),
  });
};

//Update quantity of Item in Cart
const updateQuantityOfItem = async (userId, cartList, value, index) => {
  const docRef = doc(db, "carts", userId);
  const arr = [...cartList];
  arr[index] = {
    ...arr[index],
    count: value,
    totalPrice: parseFloat(roundedPrice(arr[index].price, value)),
  };
  return await updateDoc(docRef, {
    list: [...arr],
  });
};

//Update User Cart
const firebaseUpdateCart = async (userId, data) => {
  const listRef = doc(db, "carts", userId);
  return await updateDoc(listRef, {
    list: data,
  });
};

//Remove item from Cart
const removeItem = async (userId, data) => {
  // console.log(data);
  const listRef = doc(db, "carts", userId);
  return await updateDoc(listRef, {
    list: arrayRemove(data),
  });
};

//Payment
const payment = async (userId, data) => {
  const listRef = doc(db, "carts", userId);
  return await updateDoc(listRef, {
    list: [],
    checkedOut: data,
  });
};

//Create Cart Data in Firestore
const createUserCart = async (userId) => {
  return await setDoc(doc(db, "carts", userId), {
    list: [],
    checkedOut: [],
  });
};

//Get User Data from Firestore
const getUserData = async (userId) => {
  const docSnap = await getDoc(doc(db, "users", userId));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return { message: "No data" };
  }
};

//Get User Cart from Firestore
const getUserCart = async (userId) => {
  const docSnap = await getDoc(doc(db, "carts", userId));
  if (docSnap.exists()) {
    return docSnap.data();
  } else
    return {
      message: "No data",
    };
};

//Update User Password
const updatePass = async (user, newPassword) => {
  return await updatePassword(user, newPassword);
};

//Update User Name
const updateUserName = async (userId, name) => {
  const docRef = doc(db, "users", userId);
  return await updateDoc(docRef, {
    name,
  });
};

//Update Profile
const firebaseUpdateUserProfile = async (user, name) => {
  return updateProfile(user, {
    displayName: name,
  });
};

export {
  auth,
  db,
  signin,
  signup,
  signout,
  payment,
  updateProfile,
  createUserData,
  createUserCart,
  getUserData,
  getUserCart,
  addItemToCart,
  removeItem,
  firebaseUpdateCart,
  updateQuantityOfItem,
  signInWithGG,
  signInWithFB,
  updatePass,
  updateUserName,
  firebaseUpdateUserProfile,
};

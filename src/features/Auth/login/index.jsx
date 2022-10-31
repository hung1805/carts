import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login, signInWithGoogle, signInWithFacebook } from "../authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      navigate(-1);
    }
  }, [userId, navigate]);

  //Formik initialValues
  const initialValues = {
    email: "",
    password: "",
    errorMsg: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email("Invalid Email!").required("Email is required!"),
    password: Yup.string()
      .trim()
      .required("Password is required!")
      .min(6, "Password must more than 6 characters"),
  });
  const handleSignInWithGoogle = async () => {
    await dispatch(signInWithGoogle());
  };
  const handleSignInWithFacebook = async () => {
    await dispatch(signInWithFacebook());
  };
  return (
    <div className="max-w-md rounded-md bg-white mx-auto my-10 py-8 px-16">
      <h2 className="text-custom_orange text-5xl font-semibold text-center mb-6">
        Login
      </h2>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await dispatch(login({ ...values }));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <Field
              type="email"
              name="email"
              className=" w-full bg-custom_background border-2 border-custom_background focus:border-custom_grey outline-none focus:border-2 px-4 rounded-md shadow-sm py-2"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="block my-3 text-xs text-custom_red"
            />
            <label htmlFor="password" className="block mb-2 mt-4">
              Password
            </label>
            <Field
              type="password"
              name="password"
              className=" w-full bg-custom_background border-2 border-custom_background focus:border-custom_grey outline-none focus:border-2 px-4 rounded-md shadow-sm py-2"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="block mt-3 text-xs text-custom_red"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 mt-6 rounded-md text-white uppercase bg-custom_orange "
            >
              Sign In
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-xs text-custom_blue mt-3 cursor-pointer hover:underline">
        Forgot your Password?
      </p>
      <p className="text-center py-1">Or</p>
      <button
        className="text-center w-full cursor-pointer py-2 bg-custom_orange text-white rounded-md"
        onClick={() => handleSignInWithGoogle()}
      >
        Sign In with
        <FontAwesomeIcon icon={faGoogle} className="ml-1" />
      </button>
      <button
        className="text-center w-full cursor-pointer mt-4 py-2 bg-custom_orange text-white rounded-md"
        onClick={() => handleSignInWithFacebook()}
      >
        Sign In with
        <FontAwesomeIcon icon={faFacebookF} className="ml-1 text-custom_blue " />
      </button>
      <Link
        to="/register"
        className="w-full flex items-center justify-center mt-3 text-sm text-custom_grey hover:underline hover:text-custom_blue"
      >
        Don't have an Account? Sign Up Now
      </Link>
    </div>
  );
};

export default Login;

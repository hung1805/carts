import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.user.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated, navigate]);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
    errorMsg: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Name is required!")
      .min(2, "Name must more than 2 characters")
      .max(50, "Name must less than 50 characters"),
    email: Yup.string().trim().email("Invalid Email!").required("Email is required!"),
    password: Yup.string()
      .trim()
      .required("Password is required!")
      .min(6, "Password must more than 6 characters"),
    cf_password: Yup.string()
      .trim()
      .required("Confirm Password is required!")
      .min(6, "Password must more than 6 characters")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  return (
    <div className="max-w-md rounded-md bg-white mx-auto my-10 py-8 px-16">
      <h2 className="text-custom_orange text-5xl font-semibold text-center mb-6">
        Register
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={async (values) => {
          await dispatch(
            register({
              name: values.name,
              email: values.email,
              password: values.password,
            })
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <Field
              type="name"
              name="name"
              className=" w-full bg-custom_background border-2 border-custom_background focus:border-custom_grey outline-none focus:border-2 px-4 rounded-md shadow-sm py-2"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="block my-3 text-xs text-custom_red"
            />
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
            <label htmlFor="cf_password" className="block mb-2 mt-4">
              Confirm Password
            </label>
            <Field
              type="password"
              name="cf_password"
              className=" w-full bg-custom_background border-2 border-custom_background focus:border-custom_grey outline-none focus:border-2 px-4 rounded-md shadow-sm py-2"
            />
            <ErrorMessage
              name="cf_password"
              component="p"
              className="block mt-3 text-xs text-custom_red"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 mt-6 rounded-md text-white uppercase bg-custom_orange outline-none"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <Link
        to="/login"
        className="w-full flex items-center justify-center mt-3 text-sm text-custom_grey hover:underline hover:text-custom_blue"
      >
        Has an Account? Sign In Now
      </Link>
    </div>
  );
};

export default Register;

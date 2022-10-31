import { updatePassword } from "features/Auth/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const ChangePass = (props) => {
  const { user } = props;
  const [error, setError] = useState("");
  const password = useSelector((state) => state.auth.user.password);
  const dispatch = useDispatch();

  const initialValues = {
    oldPass: "",
    newPass: "",
    cfPass: "",
  };

  const validationSchema = Yup.object().shape({
    oldPass: Yup.string().trim().required("Old Password is required"),
    newPass: Yup.string()
      .trim()
      .required("New Password is required")
      .min(6, "Must more than 6 characters"),
    cfPass: Yup.string()
      .trim()
      .required("Confirm Password is required")
      .min(6, "Must more than 6 characters")
      .oneOf([Yup.ref("newPass"), null], "New passwords and Confirm password must match"),
  });

  const handleDispatchChangePassword = async (user, values) => {
    const { oldPass, newPass } = values;
    if (password && password !== oldPass) {
      setError("Wrong Old Password. Please try a diffent Password");
    } else {
      await dispatch(updatePassword({ user, newPass }));
    }
  };
  if (!password) {
    return (
      <p className="mt-6 ml-20 text-custom_red text-xl">
        You can't change password because you signed in with Google or Facebook account
      </p>
    );
  }
  return (
    <div className="py-6 px-20">
      <h4 className="text-xl text-custom_blue uppercase font-semibold mb-4">
        Change Password
      </h4>
      {error && <p className="text-custom_red font-medium text-base ml-4 ">{error}</p>}
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleDispatchChangePassword(user, values);
        }}
      >
        <Form>
          <label className="block mb-2 font-medium" htmlFor="oldPass">
            Old Password:
          </label>
          <Field
            name="oldPass"
            type="password"
            className="w-full rounded-md py-2 px-4 bg-custom_background outline-none"
            placeholder="Enter Your Old Password"
          />
          <ErrorMessage
            name="oldPass"
            component="p"
            className="block my-3 text-xs text-custom_red"
          />

          <label className="block mb-2 font-medium mt-4" htmlFor="new-password">
            New Password:
          </label>
          <Field
            type="password"
            name="newPass"
            className="w-full rounded-md py-2 px-4 bg-custom_background outline-none"
            placeholder="Enter Your New Password"
          />
          <ErrorMessage
            name="newPass"
            component="p"
            className="block my-3 text-xs text-custom_red"
          />
          <label className="block mb-2 font-medium mt-4" htmlFor="cf-password">
            Confirm New Password:
          </label>
          <Field
            name="cfPass"
            type="password"
            className="w-full rounded-md py-2 px-4 bg-custom_background outline-none"
            placeholder="Enter New Password Again"
          />
          <ErrorMessage
            name="cfPass"
            component="p"
            className="block my-3 text-xs text-custom_red"
          />
          <button type="submit" className="third-btn mt-6">
            Change Password
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePass;

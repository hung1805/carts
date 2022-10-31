import { changeUserName, updateUserProfile } from "features/Auth/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const ChangeUserName = (props) => {
  const { user } = props;
  const userName = useSelector((state) => state.auth.user.name);
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .not([userName], "New name must not be the same with old one :)"),
  });
  const initialValues = {
    name: "",
  };

  const handleChangeName = async (user, userId, values) => {
    const { name } = values;

    await dispatch(changeUserName({ userId, name }));
    await dispatch(updateUserProfile({ user, name }));
  };
  return (
    <div className="py-6 px-20">
      <h4 className="text-xl text-custom_blue uppercase font-semibold mb-4">
        Change Display Name
      </h4>
      <p className="font-medium">
        Current Name: <span className="text-custom_orange"> {userName}</span>
      </p>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleChangeName(user, userId, values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="name" className="block mb-2 font-medium mt-4">
              New Name:
            </label>
            <Field
              placeholder="Enter your Name"
              type="text"
              name="name"
              className="w-full rounded-md py-2 px-4 bg-custom_background outline-none"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="block my-3 text-xs text-custom_red"
            />
            <button type="submit" className="third-btn mt-6" onSubmit={handleChangeName}>
              Change Name
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeUserName;

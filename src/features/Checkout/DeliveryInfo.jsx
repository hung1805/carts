import { doPayment } from "features/Cart/cartSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const DeliveryInfo = () => {
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.cart.list);

  // Formik Initialization
  const initialValues = {
    deliveryEmail: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    zipcode: "",
    note: "",
    cardInfo: "",
    nameOnCard: "",
    country: "",
  };

  //Validation Schema

  const validationSchema = Yup.object().shape({
    deliveryEmail: Yup.string().email("Invalid Email").required("Email is required"),
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string()
      .required("Zipcode is required")
      .matches(/^[0-9]+$/, "ZipCode must only contain number"),
    note: Yup.string(),
    cardInfo: Yup.string()
      .required("Card Info is required")
      .matches(/^[0-9]+$/, "Card must only contain number")
      .length(16, "Card Number must 16 characters"),
    nameOnCard: Yup.string().required("This field is required"),
    country: Yup.string()
      .required("Country is required")
      .matches(/^[A-Za-z]+$/, "Country Name must not have number"),
  });

  const handlePayment = async (userId, list) => {
    await dispatch(doPayment({ userId, list }));
  };

  return (
    <div className="p-8 md:w-full lg:w-3/5">
      <div className="mb-6">
        <h3 className="text-2xl font-medium inline-flex">
          <div className="w-8 max-h-12 mr-2 bg-custom_lightblue flex items-center justify-center rounded-full">
            *
          </div>
          Delivery Infomation
        </h3>
      </div>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={() => handlePayment(userId, list)}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <label htmlFor="firstname" className="block mb-1 font-medium">
              First Name
            </label>
            <Field
              placeholder="First Name"
              type="text"
              name="firstname"
              className="w-full rounded-md border-2 border-custom_grey outline-none focus:border-black py-2 pl-4"
            />
            <ErrorMessage
              name="firstname"
              component="p"
              className="block mt-2 mb-1 text-xs text-custom_red"
            />

            <label htmlFor="lastname" className="font-medium block my-1">
              Last Name
            </label>
            <Field
              placeholder="Last Name"
              type="text"
              name="lastname"
              className="w-full rounded-md border-2 border-custom_grey outline-none focus:border-black py-2 pl-4"
            />
            <ErrorMessage
              name="lastname"
              component="p"
              className="block mt-2 mb-1 text-xs text-custom_red"
            />

            <label htmlFor="deliveryEmail" className="font-medium block my-1">
              Email
            </label>
            <Field
              type="email"
              name="deliveryEmail"
              className="w-full rounded-md border-2 border-custom_grey outline-none focus:border-black py-2 pl-4"
            />
            <ErrorMessage
              name="deliveryEmail"
              component="p"
              className="block mt-2 mb-1 text-xs text-custom_red"
            />

            <label htmlFor="address" className="font-medium block my-1">
              Address
            </label>
            <Field
              placeholder="Your Address"
              type="text"
              name="address"
              className="w-full rounded-md border-2 border-custom_grey outline-none focus:border-black py-2 pl-4"
            />
            <ErrorMessage
              name="address"
              component="p"
              className="block mt-2 mb-1 text-xs text-custom_red"
            />
            <div className="mt-2 w-full flex">
              <div className="w-1/2 pr-2">
                <label htmlFor="city" className="font-medium block my-1">
                  City
                </label>
                <Field
                  placeholder="Eg: New York"
                  type="text"
                  name="city"
                  className="w-full rounded-md border-2 border-custom_grey outline-none focus:border-black py-2 pl-4"
                />
                <ErrorMessage
                  name="city"
                  component="p"
                  className="block mt-2 mb-1 text-xs text-custom_red"
                />
              </div>
              <div className="w-1/2 pl-4">
                <label htmlFor="zipcode" className="font-medium block my-1">
                  Zip Code
                </label>
                <Field
                  placeholder="Eg: 123456"
                  type="text"
                  name="zipcode"
                  className="w-full rounded-md border-2 border-custom_grey outline-none focus:border-black py-2 pl-4"
                />
                <ErrorMessage
                  name="zipcode"
                  component="p"
                  className="block mt-2 mb-1 text-xs text-custom_red"
                />
              </div>
            </div>
            <label htmlFor="country" className="font-medium block my-1">
              Country
            </label>
            <Field
              placeholder="1234123412341234"
              type="text"
              name="country"
              className="w-full rounded-md border-2 border-custom_grey outline-none focus:border-black py-2 pl-4"
            />
            <ErrorMessage
              name="country"
              component="p"
              className="block mt-2 mb-1 text-xs text-custom_red"
            />
            <label htmlFor="cardInfo" className="font-medium block my-1">
              Card Info
            </label>
            <Field
              placeholder="1234123412341234"
              type="text"
              name="cardInfo"
              className="w-full rounded-md border-2 border-custom_grey outline-none focus:border-black py-2 pl-4"
            />
            <ErrorMessage
              name="cardInfo"
              component="p"
              className="block mt-2 mb-1 text-xs text-custom_red"
            />
            <label htmlFor="nameOnCard" className="font-medium block my-1">
              Name on Card
            </label>
            <Field
              placeholder="1234123412341234"
              type="text"
              name="nameOnCard"
              className="w-full rounded-md border-2 border-custom_grey outline-none focus:border-black py-2 pl-4"
            />
            <ErrorMessage
              name="nameOnCard"
              component="p"
              className="block mt-2 mb-1 text-xs text-custom_red"
            />

            <label htmlFor="note" className="font-medium block my-1">
              Notes(Optional)
            </label>
            <Field
              placeholder="Notes for Delivery"
              rows="3"
              component="textarea"
              type="text"
              name="note"
              className="w-full rounded-md border-2 border-custom_grey outline-none focus:border-black py-2 pl-4"
            />
            <ErrorMessage
              name="note"
              component="p"
              className="block mt-2 mb-1 text-xs text-custom_red"
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-custom_blue px-12 py-2 rounded-md text-white uppercase mt-6"
            >
              Pay
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeliveryInfo;

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Signup.css";
import frontPageImg from "../Images/frontPageImg";
import { signup } from "../Redux/Actions/Action";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "yup-phone";
import CustomErrorMsg from "./CustomErrorMsg";
const SUPPORTED_FORMAT = ["image/jpg", "image/png", "image/gif", "image/jpeg"];
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imgRef = useRef();
  const submitForm = (values) => {
    dispatch(signup(values));
    navigate("/");
    console.log(JSON.stringify(values, null, 2));
    console.log(values.image);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="signup_h1">SignUp</h1>
            {/* start formik form */}
            <Formik
              initialValues={{
                image: null,
                name: "",
                email: "",
                phoneNo: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .required("Name is Required")
                  .max(15, "Must be less than 15 character")
                  .min(8, "Must be Greater than 8 Characters"),
                email: Yup.string()
                  .email("Invalid Email")
                  .max(15, "Email too large")
                  .required("Email is Required"),
                phoneNo: Yup.string()
                  .required("Number is Required")
                  .phone("IN", true, "Invalid Phone Number"),
                password: Yup.string()
                  .required("Password is Required")
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Password must be contain atleast 8 Characters, atleast One Uppercase, atleast One Lowercase, atleast One Number and atleast one special case Character"
                  ),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), ""], "password did't match")
                  .required("Confirm Password is Required"),
                image: Yup.mixed()
                  .nullable()
                  .required("Photo is Required")
                  .test(
                    "fileSize",
                    "Image should be less than 2MB",
                    (value) =>
                      !value || (value && value.size <= 2 * Math.pow(1024, 2))
                  )
                  .test(
                    "fileType",
                    "File type should be '.jpg', '.jpeg', '.png' and '.gif'",
                    (value) =>
                      !value ||
                      (value && SUPPORTED_FORMAT.includes(value?.type))
                  ),
              })}
              onSubmit={submitForm}
            >
              <Form>
                <div className="upload_image">
                  <Field>
                    {({ form }) => {
                      const { setFieldValue } = form;
                      return (
                        <>
                          <input
                            type="file"
                            ref={imgRef}
                            hidden
                            onChange={(event) =>
                              setFieldValue("image", event.target.files[0])
                            }
                          />
                          <div className="text_photo">
                            <p onClick={() => imgRef.current.click()}>
                              Photo<i className="fa fa-plus"></i>
                            </p>
                            <CustomErrorMsg name="image" />
                          </div>
                        </>
                      );
                    }}
                  </Field>
                </div>

                <div className="each_input_field">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <Field
                    className="form-control input_field"
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                  />

                  <CustomErrorMsg name="name" />
                </div>
                <div className="each_input_field">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="form-control input_field"
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                  />
                  <CustomErrorMsg name="email" />
                </div>
                <div className="each_input_field">
                  <label className="form-label" htmlFor="phoneNo">
                    PhoneNo
                  </label>
                  <Field
                    className="form-control input_field"
                    type="phone"
                    placeholder="Enter Your PhoneNo"
                    name="phoneNo"
                  />
                  <CustomErrorMsg name="phoneNo" />
                </div>
                <div className="each_input_field">
                  <label className="form-label" htmlFor="pwd">
                    Password
                  </label>
                  <Field
                    className="form-control input_field"
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                  />
                  <CustomErrorMsg name="password" />
                </div>
                <div className="each_input_field">
                  <label className="form-label" htmlFor="cpwd">
                    Confirm Password
                  </label>
                  <Field
                    className="form-control input_field"
                    type="password"
                    placeholder="Enter Your Password Again"
                    name="confirmPassword"
                  />
                  <CustomErrorMsg name="confirmPassword" />
                </div>
                <button type="submit" className="btn btn-primary submit_btn">
                  Submit
                </button>
                <button type="reset" className="btn btn-danger reset_btn">
                  Reset
                </button>
              </Form>
            </Formik>
            {/* end formik form */}
          </div>
          <div className="col">
            <img src={frontPageImg} className="front_page_image" alt="img" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;

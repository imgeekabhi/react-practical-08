import React from "react";
import { ErrorMessage } from "formik";
const CustomErrorMsg = ({ name }) => {
  return (
    <div className="text-danger">
      <ErrorMessage name={name} />
    </div>
  );
};

export default CustomErrorMsg;

import "../Components/Home.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/Action";
function Home() {
  const state = useSelector((state) => state.Reducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = state;
  const [img, setImg] = useState();
  const fileReader = new FileReader();
  fileReader.readAsDataURL(user.image);
  fileReader.onload = () => {
    setImg(fileReader.result);
    console.log(fileReader);
  };
  const logoutUser = () => {
    dispatch(logout());
    navigate("/signup");
  };
  return (
    <>
      <div className="container contain ">
        <div className="logout_btn">
          <button
            type="button"
            onClick={() => logoutUser()}
            className="btn btn-outline-danger "
          >
            Logout
          </button>
        </div>

        <div className="card">
          <div className="top_bar">
            <h2>Home Page</h2>
          </div>
          <div className="alert alert-success alert-dismissible d-flex align-items-center fade show">
            <i className="bi-check-circle-fill"></i>
            Thanks for Signing up
            <strong className="mx-2">{user.name},</strong> We're glad you're
            here...
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
          </div>
          <div className="user_info">
            <div className="avatar">
              <img src={img} alt="img" />
            </div>
            <h5>
              Name : <span>{user.name}</span>
            </h5>
            <h5>
              E-mail : <span>{user.email}</span>
            </h5>
            <h5>
              Contact No. : <span>{user.phoneNo}</span>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;

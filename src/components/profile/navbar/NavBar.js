import React, { Component } from "react";
import { Row } from "react-bootstrap";
import logo from "../../../assets/Instagram-Logo.png";
import { IoHomeOutline } from "react-icons/io5";
import { FiSend, FiHeart } from "react-icons/fi";
import { AiOutlineCompass } from "react-icons/ai";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import "./NavBar.css";
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  fetchMewithThunk: () =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const me = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_ME",
          payload: me,
        });
        console.log("me", me);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: me,
        });
      }
    }),
    fetchSingleUserwithThunk: (id) =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/"+ id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const user = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_SINGLE_USER",
          payload: user,
        });
        
        console.log("single_user", user);
        
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: user,
        });
      }
    }),
 

});
class NavBar extends Component {
  render(){
console.log(this.props.me)
  return (
    <>
      <Row>
        <div id="navbar">
          <div id="navbar-left">
            <img id="logo" src={logo} alt="ig-logo" />
          </div>
          <div id="navbar-center">
            <input id="search-input" placeholder="search" type="text" />
          </div>
          <div id="navbar-right">

            <Link to="/feed">
              <IoHomeOutline
                style={{ width: "22px", height: "25px", color: "black" }}
              />
            </Link>
            <FiSend style={{ width: "22px", height: "25px", color: "black" }} />
            <Link to="/discover">
              <AiOutlineCompass
                id="compass-icon"
                style={{ width: "22px", height: "25px", color: "black" }}
              />
            </Link>
            <FiHeart
              id="heart-icon"
              style={{ width: "22px", height: "25px" }}
            />


            <Link to={`/profile/${this.props.me.me._id}`}  onClick={()=>{ window.location.pathname.split('/')[1] === "profile" && window.location.pathname.split('/')[2] !== this.props.me.me._id &&  this.props.fetchSingleUserwithThunk(this.props.me.me._id)}}
             >
              <img
             
             
                id="profile-pic-nav"
                src={ !this.props.me.me.profilePicUrl ? "https://via.placeholder.com/150": this.props.me.me.profilePicUrl}
                alt="profile-pic"
              />
            </Link>
          </div>
        </div>
      </Row>
      <div id="border-bottom"></div>
    </>
  );
}
};

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)
;

import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./instagram.png";
import { GrFacebook } from "react-icons/gr";
import "./register.css";
import downloadAppStore from "../assets/downloadAPPstore.png";
class Register extends Component {
  state = {
    email: "",
    password: "",
    token: "",
    refreshToken: "",
    fullname:"",
    username:""
  };

  
  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  changeUserName = (e) => {
    this.setState({ username: e.target.value });
  };
  changeFullName = (e) => {
    this.setState({ fullname: e.target.value });
  };
  addTokens = (data) => {
    this.setState({ token: data.token });
    this.setState({ token: data.refreshToken });
  };
  register = async () => {
    try{  this.setState({ loading: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName:this.state.fullname,
        userName:this.state.username,
        password: this.state.password,
        email: this.state.email,
      }),
    };
    const url=process.env.REACT_APP_URL

    
    let response= await fetch(url + "/users/register", requestOptions)
    if (response.ok){window.location.replace("/")}
    else{console.log(response)}}
    catch(e){console.log(e)}
  
      
  };
  render() {
    return (
      <>
        <Row className="d-flex justify-content-center mt-5">
          <Col sm={3} className>
            <Container className="registerContainer2">
              <Row className="d-flex justify-content-center ">
                <img
                  className="containerPhoto"
                  src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png"
                />
              </Row>
              <p className="bigText text-align-center ml-3">
                Register to see photos and videos from your friends{" "}
              </p>
              <Row className=" d-flex justify-content-center mb-4">
              
                <button className="loginBtn" >
                  <GrFacebook className="mr-1 mb-1" />
                  <a href = {process.env.REACT_APP_URL +"/users/googleLogin"} className="text-white"> Log In with Google</a>
                </button>
              </Row>
              <hr />
              <Row className=" d-flex justify-content-center mb-2">
                <input
                  autocomplete="off"
                  type="email"
                  className="input"
                  placeholder="Mobile number or email"
                  onChange={(e) => this.changeEmail(e)}
                ></input>
              </Row>
              <Row className=" d-flex justify-content-center mb-2">
                <input
                  autocomplete="off"
                  type="name"
                  className="input"
                  placeholder="Full name"
                  onChange={(e) => this.changeFullName(e)}
                ></input>
              </Row>
              <Row className=" d-flex justify-content-center mb-2">
                <input
                  autocomplete="off"
                  type="username"
                  className="input"
                  placeholder="username"
                  onChange={(e) => this.changeUserName(e)}
                ></input>
              </Row>
              <Row className=" d-flex justify-content-center mb-2">
                <input
                  autocomplete="off"
                  type="password"
                  className="input"
                  placeholder="password"
                  onChange={(e) => this.changePassword(e)}
                ></input>
              </Row>

              <Row className=" d-flex justify-content-center mb-4">
                <button className="loginBtn" onClick={this.register}>
                  Register
                </button>
              </Row>

              <Row className=" d-flex justify-content-center mb-3">
                <p className="blue"> Forgotten password?</p>
              </Row>
              <p className="bigText2">
                When you register, you agree to our Terms. Learn how we collect,
                use and share your data in our Data Policy, and how we use
                cookies and similar technologies in our{" "}
                <strong
                  onClick={() =>
                    (window.location =
                      "https://help.instagram.com/1896641480634370?ref=ig")
                  }
                >
                  Cookie Policy
                </strong>
                .{" "}
              </p>
            </Container>
            <Container className="registerContainer3 mt-3">
              <Row className=" d-flex justify-content-center mt-4">
                <p className="registrationText"> Already have an account?</p>
                <p
                  className="blue ml-2"
                  onClick={() => (window.location = "/login")}
                >
                  Log In
                </p>
              </Row>
            </Container>
            <Row className=" d-flex justify-content-center mt-2">
              <p className="downloadText">Download the app</p>
            </Row>
            <Row className=" d-flex justify-content-center buttons">
              <img className="downloadBtn1" src={downloadAppStore} />
              <img
                className="downloadBtn"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
              />
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}
export default Register;

import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import downloadAppStore from "../assets/downloadAPPstore.png";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../assets/Instagram-Logo.png";
import {FcGoogle as GrFacebook } from "react-icons/fc";
import "./login.css";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    token: "",
    refreshToken: "",
  };

  componentDidMount = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get("accessToken"));
    if (!urlParams.has("accessToken")) {
    } else {
      const token = urlParams.get("accessToken");
      console.log(token);
      localStorage.setItem("token", token);
      window.location.replace("/feed");
    }
  };

  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  loginWithGoogle = async () => {
    const url = process.env.REACT_APP_URL;
    await fetch(url + "/users/googleLogin")
      .then((response) => response.json())
      .then((data) => console.log("response of oauth", data));
  };
  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  // addTokens = (data) => {
  //   this.setState({ token: data.accessToken });
  //   this.setState({ refreshToken: data.refreshToken });
  // };
  login = async () => {
    const url = process.env.REACT_APP_URL;
    this.setState({ loading: true });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        password: this.state.password,
        email: this.state.email,
      },
    };
    const res = await axios(url + "/users/login", requestOptions);

    if (res.status === 200) {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      window.location.replace("/feed");
      console.log("res", res);
    } else {
      console.log(res);
    }
  };
  render() {
    return (
      <>
        <Row className="d-flex justify-content-center mt-5">
          <Col sm={3} m={0} className ="imageLoginCol"/>
          <Col sm={3} className="imageLoginCol">
            <img src={logo} className="loginImage" alt="img" />
          </Col>
          <Col sm={3} s={12}className>
            <Container className="loginContainer">
              <Row className="d-flex justify-content-center ">
                <img
                  className="containerPhoto"
                  src={logo} 
                  alt="img"
                />
              </Row>
              <Row className=" d-flex justify-content-center mb-2">
                <input
                  autocomplete="off"
                  type="email"
                  className="emailInput"
                  placeholder="email"
                  onChange={(e) => this.changeEmail(e)}
                ></input>
              </Row>
              <Row className=" d-flex justify-content-center mb-4">
                <input
                  autocomplete="off"
                  type="password"
                  className="passwordInput"
                  placeholder="password"
                  onChange={(e) => this.changePassword(e)}
                ></input>
                <button className="btn">
                  <h className="search">
                    <p className="btnText">Show</p>
                  </h>
                </button>
              </Row>
              <Row className=" d-flex justify-content-center mb-4">
                <button className="loginBtn" onClick={this.login}>
                  Log In
                </button>
              </Row>
              <hr />
              <Row className=" d-flex justify-content-center mt-4 googleLogin">
                <GrFacebook className="blue mr-2 mt-1" />{" "}
                <a
                  href={process.env.REACT_APP_URL + "/users/googleLogin"}
                  className="blue"
                >
                  {" "}
                  Log In with Google
                </a>
              </Row>
              <Row className=" d-flex justify-content-center mb-3">
                <p className="blue forgotten"> Forgotten password?</p>
              </Row>
            </Container>
            <Container className="registerContainer mt-3">
              <Row className=" d-flex justify-content-center mt-4">
                <p
                  className="registrationText"
                  onClick={() => (window.location = "/register")}
                >
                  {" "}
                  Do not have an account?
                </p>
                <a
                  className="blue ml-2"
                  onClick={() => (window.location = "/register")}
                >
                  Register
                </a>
              </Row>
            </Container>
            <Row className=" d-flex justify-content-center mt-2">
              <p className="downloadText">Download the app</p>
            </Row>
            <Row className="d-flex justify-content-center buttons ">
              <img className="downloadBtn1" src={downloadAppStore} />
              <img
                className="downloadBtn"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png"
                alt="img"
              />
            </Row>
          </Col>
          <Col sm={3} m={0} className ="imageLoginCol"/>
        </Row>
      </>
    );
  }
}
export default Login;

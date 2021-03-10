import React, { Component } from "react";
import { connect } from "react-redux";
import { AiOutlineSetting } from "react-icons/ai";
import EditModal from "./EditModal";
import "./Header.css";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { GrAttachment } from "react-icons/gr";

import {browserHistory} from 'react-router';
import { withRouter } from 'react-router-dom';

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
      const response = await fetch(url + "/users/" + id, {
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

class Header extends Component {


  state = {
    showModal: false,
    changeImage: false,
    image: "",
    showAddPostModal: false,
    textForPost: "",
    imageForPost:""
  };
  showPostModal = () => {
    if (this.state.showAddPostModal === true) {
      this.setState({ showAddPostModal: false });
    } else {
      this.setState({ showAddPostModal: true });
    }
  };
  handleShow = () => {
    this.setState({ showModal: true });
  };
  changePostText = (e) => {
    this.setState({ textForPost: e.target.value });
  };
  postProfileImage = async (postId) => {
    try {
      let post = new FormData();
      await post.append("image", this.state.image);
      console.log(this.state.image)
      if (post) {
        let response = await fetch(
          process.env.REACT_APP_URL +
            "/users/imageUpload/" +
            this.props.me.me._id,
          {
            method: "POST",
            body: post,
            headers: new Headers({
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            }),
          }
        );
        if (response.ok) {
          this.setState({image:""})
          this.props.fetchMewithThunk();
          this.props.fetchSingleUserwithThunk(this.props.id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  addPost = async () => {
    const url = process.env.REACT_APP_URL;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        text: this.state.textForPost,
        user: this.props.me.me._id,
      },
    };
    const res = await axios(url + "/posts", requestOptions);

    if (res.status === 200) {
   
    
    } else {
         //HERE WE ADD THE IMAGE TO THE POST
      try {
        console.log(this.state.imageForPost)
        let post = new FormData();
        await post.append("image", this.state.image);
        if (post) {
          let response = await fetch(
            process.env.REACT_APP_URL +
              "/posts/imageUpload/" +
              res.data,
            {
              method: "POST",
              body: post,
              headers: new Headers({
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
              }),
            }
          );
          if (response.ok) {
            this.setState({image:""})
            this.props.fetchMewithThunk();
            this.props.fetchSingleUserwithThunk(this.props.id);
          }
        }
      } catch (error) {
        console.log("Error uploading image!",error);
      }
    }
  };

  handleClose = (showMode) => {
    this.setState({ showModal: showMode });
  };
  componentDidMount = () => {
    this.props.fetchMewithThunk();

    //this.props.fetchSingleUserwithThunk(this.props.id);
    this.props.fetchSingleUserwithThunk( window.location.pathname.split('/')[2])
    if( window.location.pathname.split('/')[2] == this.props.me.me._id) {console.log(true)}
    console.log("TOKEN ------>",localStorage.getItem("token"));
  };
  openChangeImage = () => {
    if (this.state.changeImage === true) {
      this.setState({ changeImage: false });
     
      this.postProfileImage();
    } else {
      this.setState({ changeImage: true });
    }
  };
  render() {
    console.log("inside of heade", this.props.me);
    const{single_user}=this.props.users

    return (
      <>
        <Modal show={this.state.showAddPostModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Row className="d-flex justify-content-center">Add a Post </Row>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
            <input
              type="text"
              id="fname"
              name="fname"
              className="postCaption"
              onChange={(e) => this.changePostText(e)}
              
            />
               <div
              className="feed-btn-wrapper"
            >
              <Form.Label htmlFor="postImage">
                <GrAttachment className="attachIcon" />
              </Form.Label>
              <Form.Control
                type="file"
                className="visually-hidden"
                id="postImage"
                accept="image/*"
                onChange={(e) => this.setState({ image: e.target.files[0] })}
              />
            </div>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={() => this.showPostModal()}>
              Close
            </button>
            <button variant="primary" onClick={() => this.addPost()}>
              Add Post{" "}
            </button>
          </Modal.Footer>
        </Modal>
        <div id="profile-infos">
          <div id="profile-left">
            <img
              id="profilePicHead"


             // src={
             //   this.props.me.me.profilePicUrl
             //     ? this.props.me.me.profilePicUrl
             //     : "https://via.placeholder.com/150"
             // }

              src={single_user.profilePicUrl ? single_user.profilePicUrl:"https://via.placeholder.com/150" }


              alt="profile-pic"
              onClick={() => this.openChangeImage()}
            />
            <div
              className={this.state.changeImage ? "feed-btn-wrapper" : "d-none"}
            >
              <Form.Label htmlFor="postImage">
                <GrAttachment className="mt-5 " />
              </Form.Label>
              <Form.Control
                type="file"
                className="visually-hidden"
                id="postImage"
                accept="image/*"
                onChange={(e) => this.setState({ image: e.target.files[0] })}
              />
            </div>
          </div>

          <div id="profile-right">
            <div id="profile-top">
              <div id="username-wrapper">
                <div id="user-name">
                  <h6>{single_user.fullName}</h6>
                </div>
              </div>
              {this.props.me.me._id === this.props.users.single_user._id && 
              <div id="edit-tools">
                <div id="edit-profile">
                  <button onClick={this.handleShow}>Edit profile</button>
                </div>
                <AiOutlineSetting className="ml-3 settings-btn" />
              </div>
              }
            </div>
            <div id="profile-center" className="my-4">
              <div id="posts-left">


                <strong>
                  {single_user.posts && single_user.posts.length}

                </strong>{" "}
                posts
              </div>
              <div id="followers-center">
                <strong>

                  {single_user.follows && single_user.follows.length}
                </strong>{" "}
                followers


              </div>
              <div id="following-right">
                <strong>
                  {this.props.me.myfollowedOnes &&
                    this.props.me.myfollowedOnes.length}
                </strong>{" "}
                following
              </div>
            </div>
            <div id="profile-bottom">

              <h6>{single_user.userName}</h6>
              <p>Bio bla bla bla...</p>

            </div>
          </div>
        </div>
        <h onClick={() => this.showPostModal()}>Add a post</h>
        <hr></hr>
        {this.state.showModal ? (
          <EditModal
            // handleShow={this.handleShow}
            handleClose={this.handleClose}
            show={this.state.showModal}
          />
        ) : null}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

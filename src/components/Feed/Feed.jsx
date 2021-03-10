
import React, { Component } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiSend, FiHeart } from "react-icons/fi";
import { RiBookmarkLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { VscSmiley } from "react-icons/vsc";
import { connect } from "react-redux";
import PostModal from "../profile/posts/Modal";
import { Link } from "react-router-dom"

import { Row, Col, Container, Card, Image, Form } from "react-bootstrap";
import "./feed.css";

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
  fetchMyFollowedOneswithThunk: () =>
    dispatch(async (dispatch) => {
      const url = process.env.REACT_APP_URL;
      const token = localStorage.getItem("token");
      const response = await fetch(url + "/posts/fromFollowed", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const myFollowedOnes = await response.json();
      console.log("The posts from people who I follow ", myFollowedOnes);

      if (response.ok) {
        dispatch({
          type: "SET_USERS_I_FOLLOWED",
          payload: myFollowedOnes,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: myFollowedOnes,
        });
      }
    }),

  fetchUserswithThunk: () =>
    dispatch(async (dispatch) => {
      const url = process.env.REACT_APP_URL;

      const token = localStorage.getItem("token");
      const response = await fetch(url + "/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const users = await response.json();
      console.log("users", users);

      if (response.ok) {
        dispatch({
          type: "SET_USERS",
          payload: users,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: users,
        });
      }
    }),

  fetchPostsNotFollowewithThunk: () =>
    dispatch(async (dispatch) => {
      const url = process.env.REACT_APP_URL;

      const token = localStorage.getItem("token");
      const response = await fetch(url + "/posts/fromNotFollowed", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const posts = await response.json();
      console.log("postswhonotfollowed", posts);

      if (response.ok) {
        dispatch({
          type: "SET_POSTS_NOT_FOLLOWED",
          payload: posts,
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: posts,
        });
      }
    }),
  addToSaved: (post) => {
    dispatch((dispatch) => {
      dispatch({
        type: "ADD_TO_SAVED",
        payload: post,
      });
    });
  },
  removeFromSaved: (post) => {
    dispatch((dispatch) => {
      dispatch({
        type: "REMOVE_FROM_SAVED",
        payload: post,
      });
    });
  },
});

class Feed extends Component {

	constructor(props) {
		super(props)
		this.hideModal = this.hideModal.bind(this)
	}
	componentDidMount = () => {
		this.props.fetchMewithThunk()
		this.props.fetchUserswithThunk()
		this.props.fetchMyFollowedOneswithThunk()
		this.props.fetchPostsNotFollowewithThunk()
	}

  state = {
    truncate: true,
    showModal: false,


		comment: {
			text: "",
		},
	}

	fetchComments = async (id) => {
		const token = localStorage.getItem("token")


    try {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/comments/${id}`,
        {
          method: "POST",
          body: JSON.stringify(this.state.comment),
          headers: new Headers({
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          }),
        }
      );


			if (response.ok) {
				console.log("res of post", response)
        this.props.fetchMyFollowedOneswithThunk() 

        this.setState({
          comment: {
            text: "",
          },
          errMessage: "",
        });
      } else {
        console.log("an error occurred");
        let error = await response.json();
        console.log(error);
        this.setState({
          errMessage: error.message,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e); // Error
      this.setState({
        errMessage: e.message,
        loading: false,
      });
    }
  };

  updateField = (e) => {
    let comment = { ...this.state.comment };
    let currentid = e.currentTarget.id;

    comment[currentid] = e.currentTarget.value; // e.currentTarget.value is the keystroke


		this.setState({ comment: comment })
	}
	submitForm = (id) => {
		this.setState({ loading: true })
		this.fetchComments(id)
	}
	hideModal = () => {
		console.log("hideModal")
		this.setState({ showModal: false })
	}
	render() {
		const { posts, name, surname, userName, email, follows } = this.props.me.me
		const { myfollowedOnes } = this.props.me
		console.log("myfollowedOnes", myfollowedOnes)
		return (
			<>
				               
				<Container className="general-font">
					                                     
					{myfollowedOnes &&
						myfollowedOnes.length > 0 &&
						myfollowedOnes.map((
							post // console.log("one post from I follow",post)
						) => (
							<Row className="cols-12 post">
								                       
								<Col>
									                           
									<Card>
										                               
										<Card.Header
											className="d-flex m-0"
											style={{ backgroundColor: "#FFFFFF" }}
										>
											<Image
												src={post.user.profilePicUrl}
												roundedCircle
												className="profilePic mr-3"
											/>
                      	<Link to={`/profile/${post.user._id}`}>
											<p className="p-0 mt-2 general-font font-weight-bold a-tags">
												{" "}
												{post.user.userName}
											</p>
                      </Link>
											<a className=" ml-auto a-tags ">
												{" "}
												<BsThreeDots />
											</a>
										</Card.Header>
										<div className=" image">
											<Card.Img
												variant="top"
												src={post.imageUrl}
												className="img img-responsive full-width"
											/>
										</div>
										<Card.Body>
											<div className="d-flex icons ">
												<FiHeart className="  mr-3" />
												<FaRegComment className=" mr-3" />
												<FiSend className=" mr-3" />
												<RiBookmarkLine className=" ml-auto" />
											</div>
											<Card.Title>
												<Image
													src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80"
													roundedCircle
													className="profilePic-mini mr-1"
												/>
												<p className="d-inline general-font">
													<span>
														<a className="a-tags font-weight-bold">somebody</a>
													</span>{" "}
													&{" "}
													<span>
														<a className="a-tags font-weight-bold">
															260 people
														</a>
													</span>{" "}
													liked this
												</p>
											</Card.Title>
											<Card.Text>
												<Link to={`/profile/${post.user._id}`}>
													<p className="p-0 m-0  mr-2 d-inline general-font font-weight-bold a-tags">
														{" "}
														{post.user.userName}
													</p>
												</Link>
												<p
													className={
														"m-0 p-0  " +
														(this.state.truncate === false
															? ""
															: "text-truncate")
													}
												>
													{post.text}
												</p>
												{this.state.truncate === true && (
													<span>
														<a
															className="a-tags text-muted"
															onClick={() => this.setState({ truncate: false })}
														>
															see more
														</a>
													</span>
												)}
												<br />

                        {post.comments && post.comments.length > 0 && (
                          <>
                            <span>
                              <a
                                className="a-tags text-muted"
                                onClick={() =>
                                  this.setState({ showModal: post._id })
                                }
                              >
                                see all the {post.comments.length} comments .
                              </a>
                            </span>
                          </>
                        )}
                        {post.comments.slice(0, 2).map((comment) => (
                          <div>
                            <p className="p-0 m-0  mr-2 d-inline general-font font-weight-bold">
                              {" "}
                              {comment.user}
                            </p>
                            <p className="m-0 p-0  ">{comment.text}</p>
                          </div>
                        ))}


												<p
													className="text-muted mt-2 mb-0"
													style={{ fontSize: "10px" }}
												>
													{" "}
													22 MINS AGO
												</p>
											</Card.Text>
										</Card.Body>
										<Card.Footer
											className="d-flex m-0"
											style={{ backgroundColor: "#FFFFFF" }}
										>
											<Form className="cursor ">
												<Form.Row>
													<Col xs={1}>
														<VscSmiley className="mr-3 icons mt-2" />
													</Col>
													<Col xs={8}>
														<Form.Control
															id="text"
															type="text"
															placeholder="Add comment..."
															className="rq-form-element  "
															value={this.state.comment.text}
															onChange={this.updateField}
														/>
													</Col>
													<Col xs={3}>
														<p
															onClick={() => this.submitForm(post._id)}
															className="mb-1 mt-2 ml-auto d-inline"
														>
															<span>
																<a
																	className="a-tags font-weight-bold  "
																	style={{ color: "#0095F6" }}
																>
																	Share{" "}
																</a>
															</span>{" "}
														</p>
													</Col>
												</Form.Row>
											</Form>
										</Card.Footer>
									</Card>
								</Col>
							</Row>
						))}
					//
					{this.state.showModal && (
						<div id="modal-background">
							<PostModal
								showModal={this.state.showModal}
								closeModal={() => this.hideModal()}
							/>
						</div>
					)}
				</Container>
				           
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

import React, { useState, useEffect } from "react"
// redux
import { connect } from "react-redux"
// icons
import { BsGrid3X3, BsBookmark } from "react-icons/bs"
// components
import PostModal from "./Modal"
import Saved from "./../savedPosts/Saved"
import { Row, Col, Form, Button,Modal } from "react-bootstrap";
// styles
import "./Posts.css"

const mapStateToProps = (state) => state

const Posts = (props) => {

	const [isPost, setIsPost] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const myposts = props.users.single_user.posts
	
	return (
		<>
    
			<div id="posts-section">
				<div id="posts-navigation">
					<button onClick={() => setIsPost(true)} className="post-btn">
						<BsGrid3X3
							className="mt-1"
							style={{ width: "15px", height: "15px" }}
						/>
						<p className="my-auto ml-2 ">POST</p>
					</button>
					<button onClick={() => setIsPost(false)} className="saved-btn">
						<BsBookmark
							className="mt-1"
							style={{ width: "15px", height: "15px" }}
						/>
						<p className="my-auto ml-2">SAVED POSTS</p>
					</button>
				</div>
				{isPost ? (
					<div id="posts-grid" className="container">
						<div id="post-items" className="row no-gutters">
							{myposts &&
								myposts.length > 0 &&
								myposts.map(
									(post) =>
										post.imageUrl &&
										post.imageUrl !== "" && (
                      <>
											<div className="col col-sm-12 col-md-6 col-lg-4 post">
												<img
													onClick={() => setShowModal(post._id)}
													src={post.imageUrl}
													alt="post-img"
                          className = "profilePostImage"
												/>
											</div>
                    
                      </>
										)
								)}
               
						</div>
					</div>
				) : (
					<Saved />
				)}
			</div>
			{showModal && (
				<div id="modal-background">
					<PostModal
						showModal={showModal}
						closeModal={() => setShowModal(false)}
					/>
				</div>
			)}
     
		</>
	)
}

export default connect(mapStateToProps)(Posts)

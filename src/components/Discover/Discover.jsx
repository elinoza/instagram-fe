import React, { Component } from "react"
// icons
import { BsGrid3X3, BsBookmark } from "react-icons/bs"
// components
import PostModal from "../profile/posts/Modal"

// styles
import "./discover.css"
import { Row, Col, Container, Card, Image, Form } from "react-bootstrap"
import { connect } from "react-redux"

const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => ({
	fetchPostsNotFollowewithThunk: () =>
		dispatch(async (dispatch) => {
			const url = process.env.REACT_APP_URL

			const token = localStorage.getItem("token")
			const response = await fetch(url + "/posts/fromNotFollowed", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})

			const posts = await response.json()
			console.log("postswhonotfollowed", posts)

			if (response.ok) {
				dispatch({
					type: "SET_POSTS_NOT_FOLLOWED",
					payload: posts,
				})
			} else {
				dispatch({
					type: "SET_ERROR",
					payload: posts,
				})
			}
		}),
})

class Discover extends Component {
	constructor(props) {
		super(props)
		this.hideModal = this.hideModal.bind(this)
	}

	hideModal = () => {
		console.log("hideModal")
		this.setState({ showModal: false })
	}

	state = {
		showModal: false,
	}
	componentDidMount = () => {
		this.props.fetchPostsNotFollowewithThunk()
	}
	render() {
		const { posts } = this.props.posts
		console.log("posts from discover", posts)
		return (
			<>
				<Row>
					{posts &&
						posts.length > 0 &&
						posts.map(
							(post) =>
								post.imageUrl && (
									<Col xs={12} md={3}>
										<img
											onClick={() => this.setState({ showModal: post._id })}
											src={post.imageUrl}
											alt="post-img"
											width="100%"
											className=" discover-img"
										/>
									</Col>
								)
						)}
				</Row>

				{this.state.showModal && (
					<div id="modal-background">
						<PostModal
							showModal={this.state.showModal}
							closeModal={() => this.hideModal()}
						/>
					</div>
				)}
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover)

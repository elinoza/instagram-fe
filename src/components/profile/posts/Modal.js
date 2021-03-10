import React, { useCallback, useEffect, useState } from "react"
// icons
import { GrClose, GrEmoji } from "react-icons/gr"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { FiSend, FiHeart } from "react-icons/fi"
import { FaRegComment, FaHeart } from "react-icons/fa"
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"
//import { connect } from "react-redux"
import { useSelector, useDispatch } from "react-redux"
import Follow from "../../follow"
// css
import "./Modal.css"

const PostModal = ({ showModal, closeModal }) => {
	const [post, setPost] = useState({})
	const [input, setInput] = useState("")
	const [reload, setReload] = useState(false)
	const token = localStorage.getItem("token")
	const url = process.env.REACT_APP_URL
	const me = useSelector((state) => state.me.me)
	const refreshMe = useDispatch()
	//	console.log(state)
	const fetchData = async () => {
		let response = await fetch(url + "/posts/" + showModal, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
		response = await response.json()
		//console.log(response)
		setPost(response)
	}

	const postComment = async () => {
		const comment = { text: input }
		try {
			let response = await fetch(
				`${process.env.REACT_APP_URL}/comments/${showModal}`,
				{
					method: "POST",
					body: JSON.stringify(comment),
					headers: new Headers({
						"Content-Type": "application/json",

						Authorization: `Bearer ${token}`,
					}),
				}
			)

			if (response.ok) {
				console.log("res of post", response)
				setInput("")
				setReload(true)
			} else {
				console.log("an error occurred")
				let error = await response.json()
				console.log(error)
				/*	this.setState({
					errMessage: error.message,
					loading: false,
				})*/
			}
		} catch (e) {
			console.log(e) // Error
			/*	this.setState({
				errMessage: e.message,
				loading: false,
			})*/
		}
	}

	const like = async (action) => {
		const comment = { text: input }
		try {
			let response = await fetch(
				`${process.env.REACT_APP_URL}/posts/${action}/${showModal}`,
				{
					method: "POST",
					body: JSON.stringify(comment),
					headers: new Headers({
						"Content-Type": "application/json",

						Authorization: `Bearer ${token}`,
					}),
				}
			)

			if (response.ok) {
				console.log("res of post", response)
				setInput("")
				setReload(true)
			} else {
				console.log("an error occurred")
				let error = await response.json()
				console.log(error)
			}
		} catch (e) {
			console.log(e)
		}
	}

	const follow = async (action) => {
		const comment = { text: input }
		try {
			let response = await fetch(
				`${process.env.REACT_APP_URL}/users/${action}/${post.user._id}`,
				{
					method: "POST",
					body: JSON.stringify(comment),
					headers: new Headers({
						"Content-Type": "application/json",

						Authorization: `Bearer ${token}`,
					}),
				}
			)

			if (response.ok) {
				response = await response.json()
				console.log("res of post", me)
				setReload(true)
				//refreshMe({ type: "SET_ME", payload: })
			} else {
				console.log("an error occurred")
				let error = await response.json()
				console.log(error)
			}
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(async () => {
		console.log("componentDidMount and got post _ID ", showModal)
		console.log("close modal function", closeModal)
		fetchData()
		console.log(post)
	}, [])

	useEffect(async () => {
		//console.log("componentDidMount and got post _ID ", showModal)
		if (reload) {
			fetchData()
			setReload(false)
		}
	}, [reload])
	// to allow user close the modal with ESC button
	const onKeyPress = useCallback(
		(e) => {
			if (e.key === "Escape" && showModal) {
				closeModal(true)
			}
		},
		[showModal, closeModal]
	)

	useEffect(() => {
		document.addEventListener("keydown", onKeyPress)
		return () => document.removeEventListener("keydown", onKeyPress)
	}, [onKeyPress])

	return (
		<>
			{showModal && (
				<div id="modal-container">
					<div id="modal-content">
						<div id="modal-left">
							<img
								className="w-100 mh-100"
								src={post.imageUrl}
								alt="modal-img"
							/>
						</div>
						<div id="modal-right">
							<div id="modal-top">
								<div id="modal-top-left">
									<img
										id="profile-pic-nav"
										src={
											post.user && post.user.imageUrl
												? post.user.imageUrl
												: "https://via.placeholder.com/150"
										}
										alt="profile-pic"
									/>
									<h6 className="ml-4">
										<strong>{post.user && post.user.userName}</strong>
									</h6>
									<span className="ml-1">{post.text}</span>
								</div>

								<div id="modal-top-right">
									<BiDotsHorizontalRounded style={{ cursor: "pointer" }} />
								</div>
							</div>
							<hr />
							{post.comments &&
								post.comments.map((comment) => (
									<div id="modal-center">
										<div id="modal-center-left">
											<img
												id="profile-pic-nav"
												src={
													comment.user.profilePicUrl
														? comment.user.profilePicUrl
														: "https://via.placeholder.com/150"
												}
												alt="profile-pic"
											/>
										</div>
										<div id="modal-center-right">
											<span className="ml-4 mr-1">
												<strong>{comment.user.fullName}</strong>
											</span>
											<span>{comment.text}</span>
										</div>
									</div>
								))}

							<hr />
							<div id="modal-bottom">
								<div id="modal-icons-bottom">
									<div id="icons-left">
										<div className="mx-1">
											{post.likes && !post.likes.includes(me._id) && (
												<FiHeart
													style={{ fontSize: "24px" }}
													onClick={() => like("like")}
												/>
											)}
											{post.likes && post.likes.includes(me._id) && (
												<FaHeart
													style={{ fontSize: "24px" }}
													onClick={() => like("dislike")}
												/>
											)}
										</div>
										<div className="mx-1">
											<FaRegComment style={{ fontSize: "24px" }} />
										</div>
										<div className="mx-1">
											<FiSend style={{ fontSize: "24px" }} />
										</div>
									</div>
									<div>
										<BsBookmark
											style={{ fontSize: "24px" }}
											onClick={() => follow("follow")}
										/>
									</div>
								</div>
							</div>
							<div id="modal-insert-comment">
								<div id="emoji">
									<GrEmoji style={{ fontSize: "24px" }} />
								</div>
								<div id="input-text-comment">
									<input
										type="text"
										placeholder="Add your comment.."
										value={input}
										onChange={(e) => setInput(e.target.value)}
									/>
								</div>
								<div id="pubblish-btn">
									<button onClick={() => postComment()}>Pubblish</button>
								</div>
							</div>
						</div>
					</div>
					<button onClick={closeModal} id="close-modal">
						<GrClose style={{ height: "30px", width: "30px" }} />
					</button>
				</div>
			)}
		</>
	)
}

export default PostModal

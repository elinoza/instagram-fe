import React, { Component } from "react"
import { connect } from "react-redux"

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
	fetchMewithThunk: () =>
		dispatch(async (dispatch) => {
			const token = localStorage.getItem("token")
			const url = process.env.REACT_APP_URL
			const response = await fetch(url + "/users/me", {
				headers: {
					Authorization: "Bearer " + token,
				},
			})

			const me = await response.json()

			if (response.ok) {
				dispatch({
					type: "SET_ME",
					payload: me,
				})
				console.log("me", me)
			} else {
				dispatch({
					type: "SET_ERROR",
					payload: me,
				})
			}
		}),
})
class Follow extends Component {
	componentDidUpdate = () => {
		if (this.state.reload) {
			this.props.fetchMewithThunk()
			this.setState({ reload: false })
		}
		/*this.props.fetchUserswithThunk()
		this.props.fetchMyFollowedOneswithThunk()
		this.props.fetchPostsNotFollowewithThunk()*/
	}

	state = {
		truncate: true,
		reload: false,
	}

	follow = async (action) => {
		const token = localStorage.getItem("token")
		console.log("token ", token, " type of token", typeof token)
		try {
			let response = await fetch(
				`${process.env.REACT_APP_URL}/users/${action}/${this.props.user._id}`,
				{
					method: "POST",
					headers: new Headers({
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					}),
				}
			)

			if (response.ok) {
				//response = await response.json()
				//console.log("res of post", me)
				this.setState({ reload: true })
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

	render() {
		//const { posts, name, surname, userName, email, follows } = this.props.me.me
		//const { myfollowedOnes } = this.props.me
		//console.log("myfollowedOnes", myfollowedOnes)
		const me = this.props.me.me
		const followedIDs = me.follows && me.follows.map((f) => f._id)
		console.log("me.follows", followedIDs)
		console.log("passed user ", this.props.user ? this.props.user._id : "")
		console.log(
			me.follows &&
				me.follows.includes(this.props.user ? this.props.user._id : "")
				? "i follow this one"
				: "i dont follow this one"
		)
		return (
			<>
				{me.follows &&
					!followedIDs.includes(this.props.user ? this.props.user._id : "") && (
						<a
							className="a-tags font-weight-bold "
							style={{ color: "#0095F6", fontSize: "12px" }}
							onClick={() => this.follow("follow")}
						>
							Follow{" "}
						</a>
					)}
				{me.follows &&
					followedIDs.includes(this.props.user ? this.props.user._id : "") && (
						<a
							className="a-tags font-weight-bold "
							style={{ color: "#0095F6", fontSize: "12px" }}
							onClick={() => this.follow("unfollow")}
						>
							Unfollow{" "}
						</a>
					)}
				           
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Follow)

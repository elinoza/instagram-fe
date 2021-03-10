import React, { Component } from "react"
import {} from "react-icons/bs"
import { Container, Image } from "react-bootstrap"
import Footer from "./Footer"
import "./feed.css"
import Follow from "../follow"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
const mapStateToProps = (state) => state
class SideBar extends Component {
	render() {
		const { users } = this.props
		const { fullName, userName,profilePicUrl} = this.props.me.me
		console.log(this.props.users)

		return (
			<Container fluid>
				<div className="d-flex">
					<Image
						src={profilePicUrl}
						roundedCircle
						className="profilePic-story mr-2"
					/>
					<div>
						<p className="p-0  general-font font-weight-bold d-inline">
							{" "}
							{userName}
						</p>
						<p className="p-0  general-font  text-muted "> {fullName} </p>
					</div>
					<p className="mb-1 mt-2 ml-auto d-inline ">
						<span>
							<a
								className="a-tags font-weight-bold "
								style={{ color: "#0095F6", fontSize: "12px" }}
							>
								Switch to{" "}
							</a>
						</span>{" "}
					</p>
				</div>
				<div className="d-flex">
					<p className="general-font mt-1  text-muted d-inline">
						{" "}
						Recommendations for you
					</p>

					<p className=" ml-auto d-inline ">
						<span>
							<a
								className="a-tags font-weight-bold "
								style={{ fontSize: "12px" }}
							>
								See All{" "}
							</a>
						</span>{" "}
					</p>
				</div>
				<div>
					{users.users &&
						users.users.length > 0 &&
						users.users.slice(-5, users.users.length).map((user) => (
							<div className="d-flex">
								<Image
									src={user.profilePicUrl}
									roundedCircle
									className="profilePic mr-2"
								/>
								<div>
								<Link to={`/profile/${user._id}`} >
									<p className="p-0  general-font font-weight-bold d-inline a-tags">
										{" "}
										{user.userName}
									</p>
									</Link>
									<p
										className="p-0    text-muted "
										style={{ fontSize: "12px" }}
									>
										{" "}
										New in Instagram
									</p>
								</div>
								<p className="mb-1 mt-2 ml-auto d-inline ">
									<span>
										<Follow user={user} />
									</span>{" "}
								</p>
							</div>
						))}
				</div>

				<Footer />
			</Container>
		)
	}
}
export default connect(mapStateToProps)(SideBar)

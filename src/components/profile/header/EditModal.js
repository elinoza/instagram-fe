import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import "./EditModal.css";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  editUser: (values) =>
    dispatch(async (dispatch) => {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/me", {
        method: "PUT",

        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }),

        body: JSON.stringify(values),
      });

      let me = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_ME",
          payload: me,
        });
      } else {
        console.log("ERROR");
      }
    }),
});

class EditModal extends Component {
  state = {
    values: {
      userName: "",
      fullName: "",
    },
  };


  updateField = (e) => {
    let values = { ...this.state.values };
    let currentid = e.currentTarget.id;


    values[currentid] = e.currentTarget.value;

    this.setState({ values: values });
  };

  handleClose = () => this.props.handleClose(false);

  render() {
    console.log(this.props.me.me)
    //const{single_user}=this.props.users
    // console.log(this.props.me.me.fullName);
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit your profile </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>Full Name:</p>
              <input
                onChange={this.updateField}
                id="fullName"
                type="text"
                value={this.state.values.fullName}
                className=""
              />
              <p className="mt-3">Nickname: </p>
              <input
                onChange={this.updateField}
                id="userName"
                type="text"
                value={this.state.values.userName}
                className=""
              />
              <p className="mt-3 mb-0">Bio: </p>
              <textarea className="mt-4" cols="35" rows="10"></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={this.handleClose}>
              Close
            </button>
            <button
              variant="primary"
              onClick={() => this.props.editUser(this.state.values)}
            >
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);

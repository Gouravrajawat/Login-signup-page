import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Redirect, withRouter } from "react-router-dom";
import axios from 'axios'

 class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Firstname: "setfirstname",
      LastName: "setlastName",
      Email: "setemail",
      Password: "setPassword",
      SignUp: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onsubmitForm = this.onsubmitForm.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onsubmitForm = (e) => {
    e.preventDefault();
    const { firstname, lastName, email, password } = this.state;
    if (
      firstname !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      var newUser = 
        {
          firstname: firstname,
          lastname: lastName,
          email: email,
          password: password,
        };
      axios
        .post("http://localhost:8080/api/signup", {
          newUser
        })
        .then((res) => {
          if (res.status === 201) {
            console.log(res.data);

            this.setState({
              signUp: true,
            });

          } else console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div
        style={{ backgroundColor: "grey", width: "100%" }}
        className="justify-content-md-center"
      >
        {this.state.signUp && <Redirect to="/loginpage" />}

        <Form onSubmit={this.onsubmitForm} style={{ width: "70%" }}>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              type="text"
              placeholder="FirstName"
              name="firstname"
              value={this.state.firstname}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              type="text"
              placeholder="LastName"
              name="lastName"
              value={this.state.lastName}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </Form.Group>
          <Button type="submit">SignUp</Button>
          <br />
          <Button type="primary" onClick = {() => this.props.history.push('/loginpage')}>Already have an account </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(SignUp);
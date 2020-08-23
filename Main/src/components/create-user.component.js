import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {


  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeVPassword = this.onChangeVPassword.bind(this);
    this.onChangeUserType = this.onChangeUserType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      vPassword: "",
      userType: ""
    }
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onChangeVPassword(e) {
    // if (e.target.value != document.getElementById("passwordInput").value){
    //   e.className = "form-control is-invalid"
    // }
    this.setState({
      vPassword: e.target.value
    })
  }
  onChangeUserType(e) {
    this.setState({
      userType: e.target.value
    })
  }

  async onSubmit(e) {
    e.preventDefault();

    const user = {
      email : this.state.email,
      username: this.state.username, 
      password: this.state.password, 
      passwordCheck: this.state.vPassword, 
      userType: this.state.userType
    }

    console.log(user);

    const res = await axios.post('http://localhost:5000/users/register', user)
    console.log(res.data);

    this.setState({
      username: "",
      email: "",
      password: "",
      vPassword: "",
      userType: ""
    })
  }

  render() {
    return (
      <div>
        <h3>Register</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email </label>
            <input type="text"
              id="emailInput"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              placeholder="example@EMAIL.com"
            />
          </div>
          <div className="form-group">
            <label>Username </label>
            <input type="text"
              id="usernameInput"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password </label>
            <input type="password"
              id="passwordInput"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
            <br />
            <input type="password"
              required
              className="form-control"
              value={this.state.vPassword}
              onChange={this.onChangeVPassword}
              placeholder="Please verify your password"
            />
          </div>
          <div className="form-group">
            <label>User Account Type </label>
            <div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadio1" name="customRadio" value="patient" className="custom-control-input"  onChange = {this.onChangeUserType}/>
                <label className="custom-control-label" htmlFor="customRadio1">Patient User</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadio2" name="customRadio" value="doctor" className="custom-control-input"  onChange = {this.onChangeUserType}/>
                <label className="custom-control-label" htmlFor="customRadio2">Doctor User</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

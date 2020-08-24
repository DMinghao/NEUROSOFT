import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from 'axios';

export default function CreateUsers() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [userType, setUserType] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  // onChangeEmail(e) {
  const submit = async (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      alert("pasword must match")
    }
    else {
      try {

        const user = {
          email: email,
          firstname: firstname,
          lastname: lastname,
          password: password,
          userType: userType
        }

        await axios.post('http://localhost:5000/users/register', user)
        const loginRes = await axios.post("http://localhost:5000/users/login", {
          email,
          password,
        });
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
      } catch (err) {
        alert(err.message)
      }
    }
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={submit}
      // onInput={()=>{document.getElementById("passwordCheckInput").setCustomValidity(document.getElementById("passwordCheckInput").value != document.getElementById("passwordInput").value ? "Passwords do not match." : "")}}
      >
        <div className="form-group">
          <div className="form-group">
            <label>First Name </label>
            <input type="text"
              required
              id="firstnameInput"
              className="form-control"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name </label>
            <input type="text"
              required
              id="lastnameInput"
              className="form-control"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <label>Email </label>
          <input type="text"
            id="emailInput"
            required
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@EMAIL.com"
          />
        </div>
        <div className="form-group">
          <label>Password </label>
          <input type="password"
            id="passwordInput"
            required
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <div id="message">
            <small>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</small><br />
          </div>
          <br />
          <input type="password"
            id="passwordCheckInput"
            required
            className="form-control"
            onChange={(e) => {
              if (e.target.value !== document.getElementById("passwordInput").value) {
                e.target.className = "form-control is-invalid"
              } else e.target.className = "form-control is-valid"
              setPasswordCheck(e.target.value)
            }}
            placeholder="Please verify your password"
          />
        </div>
        <div className="form-group">
          <label>User Account Type </label>
          <div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" id="customRadio1" name="customRadio" value="patient" className="custom-control-input" onChange={(e) => setUserType(e.target.value)} />
              <label className="custom-control-label" htmlFor="customRadio1">Patient User</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" id="customRadio2" name="customRadio" value="doctor" className="custom-control-input" onChange={(e) => setUserType(e.target.value)} />
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

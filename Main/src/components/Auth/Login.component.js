import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();


    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login",
                loginUser
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            if(loginRes.data.user.userType === "patient") history.push("/padash");
            if(loginRes.data.user.userType === "doctor") history.push("/docdash");
        } catch (err) {
            // err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="login-email">Email </label>
                    <input id="login-email"
                        type="email"
                        required
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@EMAIL.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password </label>
                    <input type="password"
                        id="login-password"
                        required
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
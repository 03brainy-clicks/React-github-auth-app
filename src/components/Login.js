import React, { useState, useContext } from "react";

// firebase
import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

// toast
import { toast } from "react-toastify";

// usercontext
import UserContext from "../context/UserContext";

// Navigate for redirect
import { Navigate, Link } from "react-router-dom";

function Login() {
  // using context
  const context = useContext(UserContext);

  // creating states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signin function
  const handleSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        context.setUser({ email: res.user.email, uid: res.user.uid });
        toast("Sign-in Successful", {
          type: "success",
        }).catch((error) => {
          toast(error.message, { type: "error" });
        });
      });
  };

  // onsubmit function for signin
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      handleSignin();
      setEmail("");
      setPassword("");
    } else {
      toast("Empty email or password", {
        type: "warning",
      });
    }
  };

  if (context.user?.uid) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="container login d-flex align-items-center">
        <div className="login-card col-md-6 mx-auto  p-5">
          <div className="text-center">
            <img
              src="https://netstorage.ringcentral.com/appext/logo/kNku72HNQPWCo-uLCKS4Hw~hb6NetsWTE6NN4qP-sN3wg/48b7f51b-845b-47da-867c-fb1a0ff7993f.png"
              alt=""
              width="65px"
              className="github-image"
            />
            <br />
            <h5>Sign-In</h5>
          </div>
          <div className="form">
            <div className="my-3">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                className="mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                className="mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p>
              Don't have any account?
              <span id="linker">
                <Link to="/signup"> Create an account</Link>
              </span>
            </p>
            <div className="mt-4 text-center ">
              <button
                className="login-button py-1  px-5 text-center"
                onClick={handleSubmit}
              >
                Signin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

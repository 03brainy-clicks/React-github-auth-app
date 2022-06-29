import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// image
import menu from "../menu.png";

//firebase
import firebase from "firebase/compat/app";

// context
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

function Header() {
  // menu toggler
  const [isNav, setIsNav] = useState(false);
  const navToggler = () => {
    setIsNav(!isNav);
  };

  // context
  const context = useContext(UserContext);

  const handleLogout = () => {
    firebase.auth().signOut();
    toast("Signout Successful", {
      type: "success",
    });
    context.setUser();
  };

  return (
    <div className="container-fluid navigation fixed py-2">
      <div className="row">
        <div className="col-lg-1 col-md-3 col-6">
          <Link to="/">GitHub App</Link>
        </div>
        <div className="col-6 d-md-none text-end ">
          <img src={menu} alt="" onClick={navToggler} />
        </div>
        {isNav ? (
          <div>
            <ul className="my-4  text-center">
              <li onClick={navToggler}>
                <Link to="/">Home</Link>
              </li>
              {context.user?.uid ? (
                <>
                  <li>{context.user?.email}</li>
                  <li onClick={(navToggler, handleLogout)}>
                    <Link to="/login">Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={navToggler}>
                    <Link to="/login">Login</Link>
                  </li>
                  <li onClick={navToggler}>
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="col-lg-1 col-md-2 d-md-block d-none">
          <Link to="/">Home</Link>
        </div>
        <div className="col-lg-1 col-md-2 text-white d-md-block d-none">
          {context.user?.email}
        </div>

        {context.user?.email ? (
          <div
            className="col-lg-1 col-md-2 ms-auto d-md-block d-none"
            onClick={handleLogout}
          >
            <Link to="/login">Logout</Link>
          </div>
        ) : (
          <>
            <div className="col-lg-1 col-md-2 ms-auto d-md-block d-none">
              <Link to="/signup">Sign-Up</Link>
            </div>
            <div className="col-lg-1 col-md-2 d-md-block d-none">
              <Link to="/login">Login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;

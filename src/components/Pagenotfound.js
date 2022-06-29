import React from "react";
import { Link } from "react-router-dom";
import pnf from "../pnf.png";

function Pagenotfound() {
  return (
    <div className="text-center m-5 ">
      <img src={pnf} alt="" width="100%" className="pnf" />
      <h1 className=" text-white mt-3">PAGE NOT FOUND</h1>
      <p className="btn btn-outline-success text-success">
        <Link to="/">Back To Home</Link>
      </p>
    </div>
  );
}

export default Pagenotfound;

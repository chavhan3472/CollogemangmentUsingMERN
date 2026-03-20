import React, { useContext, useEffect, useState } from "react";
import Ct from "./Context";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
function Login() {
  let [login_data, updLogin_data] = useState({
    user_id: "",
    user_password: "",
  });
  let [msg, updmsg] = useState("🔐 Login to College Management System");
  let navigate = useNavigate();
  let obj = useContext(Ct);
  login_data;
  let login_fun = (e) => {
    updLogin_data({ ...login_data, [e.target.name]: e.target.value });
  };

  let submit_logininfo = () => {
    axios
      .post(
        "https://collogemangmentusingmern-3.onrender.com/userlogin",
        login_data,
      )
      .then((res) => {
        console.log(res.data.role);
        obj.updfun(res.data);
        if (res.data.token == undefined) {
          window.alert("Please Enter Valid Deatails");
          navigate("/");
          updmsg(res.data.msg);
        } else {
          console.log(res.data);
          obj.updfun(res.data);
          console.log(obj);
          Cookies.set("login_data", JSON.stringify(res.data), { expires: 3 });
          if (res.data.role === "user") {
            navigate("/studentdashbord");
          } else if (res.data.role === "teacher") {
            navigate("/teacherdashboard");
          } else if (res.data.role === "admin") {
            navigate("/admindashboard");
          } else {
            navigate("/");
            console.error("role not found");
          }
        }
      });
  };
  return (
    <div className="logimaindiv">
      <div className="ticker">
        <p>
          🔐 Login using College ID / Email / Phone | ⚠️ Facing issues? Contact
          Administrative Office
        </p>
      </div>
      <h1 className="loginmsgh1">{msg}</h1>
      <div className="loginparentdiv">
        <input
          type="text"
          placeholder="Enter Your UserId"
          name="user_id"
          value={login_data.user_id}
          onChange={login_fun}
        />
        <input
          type="text"
          placeholder="Enter Your Password"
          name="user_password"
          value={login_data.user_password}
          onChange={login_fun}
        />
        <button onClick={submit_logininfo}>Login</button>
      </div>
    </div>
  );
}
export default Login;

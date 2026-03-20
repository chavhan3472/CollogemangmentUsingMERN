import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Ct from "./Context";
import { useEffect } from "react";
import Cookies from "js-cookie";
function Nav() {
  let obj = useContext(Ct);
  let navigate = useNavigate();
  useEffect(() => {
    let get_cookies = Cookies.get("login_data");
    if (get_cookies === undefined) {
      navigate("/");
    } else {
      obj.updfun(JSON.parse(get_cookies));
    }
  }, []);
  return (
    <nav className="navbar">
      {obj.state.token === "" ? (
        <>
          <Link to="/" className="navbarlink">
            Home
          </Link>
          <Link to="/login" className="navbarlink">
            Login
          </Link>
          <Link to="/register" className="navbarlink">
            Register
          </Link>
        </>
      ) : (
        <>
          {obj.state.role === "user" ? (
            <>
              <Link to="/studentdashbord" className="navbarlink">
                Welcome {obj.state.name}
              </Link>
              <Link to="/examform" className="navbarlink">
                Exam Form
              </Link>
              <Link to="/acdmicprofile" className="navbarlink">
                Academic Profile
              </Link>
              <Link to="/studenfinalresult" className="navbarlink">
                Result Portal
              </Link>
              <Link to="/logout" className="navbarlink">
                Logout
              </Link>
            </>
          ) : obj.state.role === "admin" ? (
            <>
              <Link to="/admindashboard" className="navbarlink">
                Welcome {obj.state.name}
              </Link>
              <Link to="/pendingform" className="navbarlink">
                Pending Form
              </Link>
              <Link to="/completedform" className="navbarlink">
                Completed Form
              </Link>
              <Link to="/allforms" className="navbarlink">
                All Student
              </Link>
              <Link to="/adminfinalresult" className="navbarlink">
                Post Result
              </Link>
              <Link to="/logout" className="navbarlink">
                Logout
              </Link>
            </>
          ) : obj.state.role === "teacher" ? (
            <>
              <Link to="/teacherdashboard" className="navbarlink">
                Welcome {obj.state.name}
              </Link>
              <Link to="/updatestudentprofile" className="navbarlink">
                Update Profile
              </Link>
              <Link to="/updatestudentdata" className="navbarlink">
                Student Data
              </Link>
              <Link to="/logout" className="navbarlink">
                Logout
              </Link>
            </>
          ) : null}
        </>
      )}
    </nav>
  );
}
export default Nav;

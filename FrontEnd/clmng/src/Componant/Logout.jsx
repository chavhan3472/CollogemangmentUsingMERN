import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Ct from "./Context";

function Logout() {
  const navigate = useNavigate();
  const obj = useContext(Ct);

  useEffect(() => {
    obj.updfun({
      token: "",
      user_name: "",
      role: "",
      user_password: "",
      user_id: "",
    });
    Cookies.remove("login_data");
    navigate("/");
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging out... 🔐</h2>
    </div>
  );
}

export default Logout;

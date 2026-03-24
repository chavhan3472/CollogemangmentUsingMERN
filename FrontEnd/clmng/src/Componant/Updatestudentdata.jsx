import React, { useContext, useEffect, useState } from "react";
import Ct from "./Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
function Updatestudentdata() {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let obj = useContext(Ct);

  useEffect(() => {
    let cookie = Cookies.get("login_data");

    if (!cookie) {
      navigate("/");
      return;
    }

    let user = JSON.parse(cookie);
    obj.updfun(user);

    // 🔐 Only teacher access
    if (user.role !== "teacher") {
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:5002/showadmin") // same API
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        console.log("Error fetching data");
      });
  }, []);

  return (
    <div className="Pendingexam">
      <div className="tableContainer">
        <h2>📚 Student List</h2>

        <table className="adminTable">
          <thead>
            <tr>
              <th>College Pin</th>
              <th>Student Name</th>
              <th>Roll No</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.user_id}</td>
                  <td>{item.user_name}</td>
                  <td>{item.student_rollno}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Students Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Updatestudentdata;

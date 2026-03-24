import React, { useContext, useEffect, useState } from "react";
import Ct from "./Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
function Allform() {
  let navigate = useNavigate();
  let [data, updData] = useState([]);
  let obj = useContext(Ct);
  useEffect(() => {
    let get_cookies = Cookies.get("login_data");
    if (!get_cookies) {
      navigate("/");
    } else {
      obj.updfun(JSON.parse(get_cookies));
      axios
        .get("http://localhost:5002/showadmin")
        .then((res) => {
          updData(res.data);
        })
        .catch(() => {
          console.log("Failed To Getting The Data");
        });
    }
  }, []);
  console.log(data);
  return (
    <div className="Pendingexam">
      <div className="tableContainer">
        <table className="adminTable">
          <thead>
            <tr>
              <th>CollegePin</th>
              <th>StudentName</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Class</th>
              <th>ClassRollNo</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.user_id}</td>
                  <td>{item.user_name}</td>
                  <td>{item.user_phno}</td>
                  <td>{item.student_department}</td>
                  <td>{item.student_class}</td>
                  <td>{item.student_rollno}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Allform;

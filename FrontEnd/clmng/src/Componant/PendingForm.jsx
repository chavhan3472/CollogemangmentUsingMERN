import React, { useContext, useEffect, useState } from "react";
import Ct from "./Context";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
function PendingForm() {
  let [data, updData] = useState([]);
  let exam_form = [];
  let navigate = useNavigate();
  let obj = useContext(Ct);
  useEffect(() => {
    let get_cookies = Cookies.get("login_data");
    console.log(get_cookies, "This The Cookies");
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
          console.log(res.data.msg);
        });
    }
  }, []);
  data.forEach((item) => {
    if (item.exam_form === "incomplete") {
      exam_form.push(item);
    }
  });

  return (
    <div className="Pendingexam">
      <div className="tableContainer">
        <table className="adminTable">
          <thead>
            <tr>
              <th>StudentName</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Class</th>
            </tr>
          </thead>

          <tbody>
            {exam_form.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.user_name}</td>
                  <td>{item.user_phno}</td>
                  <td>{item.student_department}</td>
                  <td>{item.student_class}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PendingForm;

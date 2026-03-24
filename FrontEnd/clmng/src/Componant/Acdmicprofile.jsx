import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Ct from "./Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
function Acdmicprofile() {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);
  let [msg, setMsg] = useState("");
  let obj = useContext(Ct);
  let navigate = useNavigate();

  useEffect(() => {
    let cookie = Cookies.get("login_data");

    if (!cookie) {
      navigate("/");
      return;
    }

    let user = JSON.parse(cookie);
    obj.updfun(user);

    axios
      .get(`http://localhost:5002/sendaccprofile/${user.user_id}`)
      .then((res) => {
        console.log(res.data, "This The Data");
        if (!res.data || res.data.msg) {
          setMsg("No Academic Profile Found");
        } else {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setMsg("Error fetching data");
        setLoading(false);
      });
  }, []);
  let tickerMsg = "";

  if (msg) {
    tickerMsg =
      "⚠️ Academic profile not found | Please contact your teacher to update your academic records";
  } else {
    tickerMsg =
      "📚 Academic profile loaded successfully | Check your marks & attendance carefully";
  }
  return (
    <div className="profile-container">
      <div className="ticker">
        <p>{tickerMsg}</p>
      </div>

      <h1 className="title">🎓 Academic Profile</h1>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : msg ? (
        <div className="error">{msg}</div>
      ) : (
        <div className="card">
          {/* Student Info */}
          <div className="student-info">
            <h2>{data.student_name}</h2>
            <p>
              <strong>Roll No:</strong> {data.student_rollno}
            </p>
            <p>
              <strong>Semester:</strong> {data.semester}
            </p>
          </div>

          {/* Subjects Table */}
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Mid Marks</th>
                <th>Attendance</th>
              </tr>
            </thead>

            <tbody>
              {data.subjects?.map((sub, index) => (
                <tr key={index}>
                  <td>{sub.subject_name}</td>
                  <td>{sub.mid_sem_marks}</td>
                  <td>
                    <span className={sub.attendance >= 75 ? "good" : "low"}>
                      {sub.attendance}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default Acdmicprofile;

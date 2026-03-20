import React, { useContext, useEffect, useState } from "react";
import Ct from "./Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
function AdminDashboard() {
  let [students, setStudents] = useState([]);
  let [teachers, setTeachers] = useState([]);
  let [pendingExams, setPendingExams] = useState([]);
  let obj = useContext(Ct);
  let navigate = useNavigate();

  useEffect(() => {
    let cookies = Cookies.get("login_data");
    if (!cookies) {
      navigate("/");
    } else if (cookies.role === "teacher") {
      navigate("/teacherdashboard");
    } else {
      let user = JSON.parse(cookies);
      obj.updfun(user);
      axios.get("http://localhost:5002/showadmin").then((res) => {
        setStudents(res.data);
        setPendingExams(res.data.filter((s) => s.exam_form === "incomplete"));
      });
      // Fetch teachers
      // axios.get("http://localhost:5002/showteachers").then((res) => {
      //   console.log(res.data.role === "teacher");
      //   setTeachers(res.data);
      // });
    }
  }, []);
  let decresult = () => {
    navigate("/adminfinalresult");
  };

  return (
    <div className="admindashContainer">
      <div className="ticker">
        <p>
          ⚠️ {pendingExams.length} students have NOT submitted exam form | 📢
          Admin should verify student data regularly | 🎓 Ensure all academic
          profiles are updated | 🧾 Declare results only after verification | 🏫
          Maintain accurate records for smooth process
        </p>
      </div>
      <h2>Welcome</h2>

      {/* Quick Stats */}
      <div className="quickStats">
        <div className="statCard">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>
        <div className="statCard">
          <h3>Total Teachers</h3>
          <p>{teachers.length}</p>
        </div>
        <div className="statCard">
          <h3>Pending Exam Forms</h3>
          <p>{pendingExams.length}</p>
        </div>
      </div>

      <div className="notifications">
        <h3>Notifications</h3>
        <ul>
          <li>{pendingExams.length} students have not submitted exam form.</li>
          <li>
            {students.length - pendingExams.length} students have completed exam
            form.
          </li>
          <li>{teachers.length} teachers are active.</li>
        </ul>
      </div>
      <div className="quickActions">
        <button onClick={decresult}>Declare Final Result</button>
      </div>
    </div>
  );
}

export default AdminDashboard;

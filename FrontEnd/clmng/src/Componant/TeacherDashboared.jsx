// import React, { useContext, useEffect } from "react";
// import Ct from "./Context";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// function TeacherDashboared() {
//   let obj = useContext(Ct);
//   //   console.log("This The Object", obj);
//   let navigate = useNavigate();
//   useEffect(() => {
//     let get_cookies = Cookies.get("login_data");
//     if (!get_cookies) {
//       navigate("/");
//     } else {
//       obj.updfun(JSON.parse(get_cookies));
//       //   navigate("/teacherdashboard");
//     }
//   }, []);
//   console.log("This The Object", obj);
//   console.log(obj.state.role, "Htere Is The Role ");
//   return <div>This The Teacher Dashboard</div>;
// }

// export default TeacherDashboared;

import React, { useContext, useEffect, useState } from "react";
import Ct from "./Context";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../App.css";

function TeacherDashboared() {
  let obj = useContext(Ct);
  let navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [filled, setFilled] = useState(0);
  const [notFilled, setNotFilled] = useState(0);

  useEffect(() => {
    let get_cookies = Cookies.get("login_data");

    if (!get_cookies) {
      navigate("/");
    } else {
      obj.updfun(JSON.parse(get_cookies));
    }

    axios
      .get("http://localhost:5002/showadmin")
      .then((res) => {
        const data = res.data;

        setStudents(data);
        setTotal(data.length);

        const filledCount = data.filter(
          (s) => s.exam_form === "complete",
        ).length;

        const notFilledCount = data.filter(
          (s) => s.exam_form === "incomplete",
        ).length;

        setFilled(filledCount);
        setNotFilled(notFilledCount);
      })
      .catch((err) => console.log(err));
  }, []);

  const pendingStudents = students.filter(
    (item) => item.exam_form === "incomplete",
  );

  return (
    <div className="TeacherMainContainer">
      <div className="ticker">
        <p>
          ⚠️ {notFilled} students have NOT filled the exam form | 📢 Please
          update student academic profiles regularly | 📚 Ensure all records are
          correct
        </p>
      </div>
      {/* Welcome */}
      <p className="TeacherSubText">Teacher Dashboard</p>

      {/* Stats */}
      <div className="TeacherStatsContainer">
        <div className="TeacherCard">
          <h3>Total Students</h3>
          <p>{total}</p>
        </div>

        {/* <div className="TeacherCard">
          <h3>Exam Form Filled</h3>
          <p>{filled}</p>
        </div> */}

        <div className="TeacherCard">
          <h3>Not Filled</h3>
          <p>{notFilled}</p>
        </div>
      </div>

      {/* Alert */}
      <div className="TeacherAlert">
        ⚠️ {notFilled} students have NOT filled the exam form
      </div>

      {/* Actions */}
      <div className="TeacherActionContainer">
        <div
          className="TeacherActionCard"
          onClick={() => navigate("/updatestudentprofile")}
        >
          <h3>Update Academic Profile</h3>
          <p>Update marks & subjects</p>
        </div>

        <div
          className="TeacherActionCard"
          onClick={() => navigate("/updatestudentdata")}
        >
          <h3>View Student Data</h3>
          <p>Check all student details</p>
        </div>
      </div>

      {/* Pending Students Table */}
      <div className="TeacherTableContainer">
        <h3>Students Who Have NOT Filled Exam Form</h3>

        {pendingStudents.length === 0 ? (
          <p>All students have filled the exam form ✅</p>
        ) : (
          <table className="TeacherTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Department</th>
                <th>Roll No</th>
              </tr>
            </thead>

            <tbody>
              {pendingStudents.map((item, index) => (
                <tr key={index}>
                  <td>{item.user_name}</td>
                  <td>{item.student_class}</td>
                  <td>{item.student_department}</td>
                  <td>{item.student_rollno}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboared;

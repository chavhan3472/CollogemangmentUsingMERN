import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Ct from "./Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Studentdash() {
  const obj = useContext(Ct);
  const navigate = useNavigate();
  const [student, setStudent] = useState(null); // single object
  const [msg, setMsg] = useState("Student Information");

  useEffect(() => {
    const get_cookies = Cookies.get("login_data");

    if (!get_cookies) {
      navigate("/");
    } else {
      const cookieData = JSON.parse(get_cookies);
      obj.updfun(cookieData);
      axios
        .get(
          `https://collogemangmentusingmern-3.onrender.com/search/${cookieData.user_id}`,
        )
        .then((res) => {
          if (res.data.role === "user") {
            setStudent(res.data);
          } else {
            navigate("/admindashboard");
          }
        })
        .catch((err) => {
          console.error("Axios Error:", err);
          setMsg("Failed to load student data");
        });
    }
  }, []);

  if (!student) return <h2>{msg}</h2>;
  let tickerMsg = "";

  if (student.exam_form === "incomplete" || student.exam_fee === "incomplete") {
    tickerMsg =
      "⚠️ Your Exam Form or Fees is Pending | Please complete it as soon as possible to avoid issues";
  } else {
    tickerMsg =
      "✅ Your Exam Form & Fees are successfully completed | Best of luck for exams 🎓";
  }

  return (
    <div className="studentdashmaindiv">
      <div className="ticker">
        <p>{tickerMsg}</p>
      </div>
      <h2 className="dashboardHeading">{msg}</h2>
      <div className="studentCard">
        <p>
          <strong>Student Name:</strong> {student.user_name}
        </p>
        <p>
          <strong>Student Email:</strong> {student.user_email}
        </p>
        <p>
          <strong>Student Phone:</strong> {student.user_phno}
        </p>
        <p>
          <strong> Student Class:</strong> {student.student_class}
        </p>
        <p>
          <strong> Student RollNo:</strong> {student.student_rollno}
        </p>
        <p>
          <strong> Student DOB:</strong> {student.student_dob}
        </p>
        <p>
          <strong>Student Department:</strong> {student.student_department}
        </p>
        <p>
          <strong>Exam Form Status:</strong> {student.exam_form}
        </p>
        <p>
          <strong>Exam Fee Status:</strong> {student.exam_fee}
        </p>
        <p>
          <strong>CollegePIN:</strong> {student.user_id}
        </p>
      </div>
    </div>
  );
}

export default Studentdash;

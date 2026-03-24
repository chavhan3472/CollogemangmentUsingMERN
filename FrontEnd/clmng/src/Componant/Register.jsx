import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
function Register() {
  let navigate = useNavigate();
  let [data, updData] = useState({
    user_name: "",
    user_email: "",
    user_phno: "",
    user_password: "",
    student_class: "",
    student_rollno: "",
    student_dob: "",
    student_department: "",
  });
  let [msg, updmsg] = useState("🎓 Register for College Management System");
  let student_info = (e) => {
    updData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  let submit_data = () => {
    if (
      !data.user_name ||
      !data.user_email ||
      !data.user_phno ||
      !data.user_password ||
      !data.student_class ||
      !data.student_rollno ||
      !data.student_dob ||
      !data.student_department
    ) {
      updmsg("⚠️ All fields are required!");
    }
    axios
      .post("http://localhost:5002/userregis", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("RRRR", res);

        if (res.data.msg === "Account Created Sucessfully") {
          updmsg(" Registartion Sucessfull| Redirecting to Login...");
          updData({
            user_name: "",
            user_email: "",
            user_phno: "",
            user_password: "",
            student_class: "",
            student_rollno: "",
            student_dob: "",
            student_department: "",
          });
        } else {
          updmsg(res.data.msg);
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        updmsg("❌ Registration Failed. Please try again.");
      });
  };
  return (
    <div className="registartionmaindiv">
      <div className="ticker">
        <p>
          📢 Enter Class & Roll No provided by your teacher | 📩 Your College ID
          will be sent to your Email after registration
        </p>
      </div>
      <h1 className="registartionh1tag">{msg}</h1>
      <div className="registartionchileddiv">
        <input
          type="text"
          placeholder="Enter Your Name"
          name="user_name"
          value={data.user_name}
          onChange={student_info}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          name="user_email"
          value={data.user_email}
          onChange={student_info}
        />
        <input
          type="text"
          placeholder="Enter Your Phono"
          name="user_phno"
          value={data.user_phno}
          onChange={student_info}
        />
        <input
          type="text"
          placeholder="Create Your Password"
          name="user_password"
          value={data.user_password}
          onChange={student_info}
        />
        <input
          type="text"
          placeholder="Enter Your Class"
          name="student_class"
          value={data.student_class}
          onChange={student_info}
        />
        <input
          type="text"
          placeholder="Enter Your Class Roll Number"
          name="student_rollno"
          value={data.student_rollno}
          onChange={student_info}
        />
        <input
          type="Date"
          placeholder="Enter Your Date OF Birth"
          name="student_dob"
          value={data.student_dob}
          onChange={student_info}
        />
        <input
          type="Text"
          placeholder="Enter Your Department"
          name="student_department"
          value={data.student_department}
          onChange={student_info}
        />
        <button onClick={submit_data}>Register</button>
      </div>
    </div>
  );
}

export default Register;

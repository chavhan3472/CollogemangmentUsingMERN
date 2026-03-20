import React, { useContext, useEffect, useState } from "react";
import Ct from "./Context";
import Cookies from "js-cookie";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ExamForm() {
  let navigate = useNavigate();
  let [msg, updMsg] = useState("Exam Registartion");
  let obj = useContext(Ct);
  let [data, updData] = useState({
    select_semster: "",
    select_studenttype: "",
    user_id: "",
    user_name: "",
    student_class: "",
    student_classRoll: "",
  });
  let exam_form = (e) => {
    updData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    let get_cookies = Cookies.get("login_data");
    if (!get_cookies) {
      navigate("/");
    } else {
      obj.updfun(JSON.parse(get_cookies));
    }
  }, []);
  let submit_examform = () => {
    console.log(updData, "Submit Called");
    axios
      .post(
        `https://collogemangmentusingmern-3.onrender.com/examregister/${data.user_id}`,
        data,
      )
      .then((res) => {
        if (res.data.msg === "Exam Form Submited") {
          navigate("/studentdashbord");
        } else {
          updMsg(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        updMsg(res.data.msg);
      });
  };
  console.log(obj.state, "This Is The Updated State");
  console.log(obj, "This The Exam Form obj");
  return (
    <div className="exammaindiv">
      <div className="ticker">
        <p>
          ⚠️ Use your College ID to fill the exam form | 🔍 Verify all details
          before submission | 🚫 Incorrect details may lead to rejection | 🎫
          Hall Ticket will NOT be issued if any error is found | ❗ College will
          NOT be responsible
        </p>
      </div>
      <div className="examchiled div">
        <h2>{msg}</h2>
        <input
          type="text"
          placeholder="Enter Your Semester"
          name="select_semster"
          value={data.select_semster}
          onChange={exam_form}
        />
        <input
          type="text"
          placeholder="Enter Student Backlock/Regular"
          name="select_studenttype"
          value={data.select_studenttype}
          onChange={exam_form}
        />
        <input
          type="text"
          placeholder="Enter Your UserId"
          name="user_id"
          value={data.user_id}
          onChange={exam_form}
        />
        <input
          type="text"
          placeholder="Enter Your Name"
          name="user_name"
          value={data.user_name}
          onChange={exam_form}
        />
        <input
          type="text"
          placeholder="Enter Your Class"
          name="student_class"
          value={data.student_class}
          onChange={exam_form}
        />
        <input
          type="text"
          placeholder="Enter Your ClassRollNo"
          name="student_classRoll"
          value={data.student_classRoll}
          onChange={exam_form}
        />
        <button onClick={submit_examform}>Submit Exam</button>
      </div>
    </div>
  );
}

export default ExamForm;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Ct from "./Context";
import "../App.css";

function Updatestudentprofile() {
  const navigate = useNavigate();
  const obj = useContext(Ct);

  const [data, setData] = useState({
    colloge_pin: "",
    student_name: "",
    student_rollno: "",
    semester: "",
    subjects: [
      {
        subject_name: "",
        mid_sem_marks: "",
        attendance: "",
      },
    ],
  });

  // 🔐 Protected Route
  useEffect(() => {
    let get_cookies = Cookies.get("login_data");

    if (!get_cookies) {
      navigate("/");
    } else {
      let user = JSON.parse(get_cookies);
      obj.updfun(user);

      if (user.role !== "teacher") {
        alert("Access Denied ❌");
        navigate("/");
      }
    }
  }, []);

  // Normal Input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Subject Input
  const handleSubjectChange = (index, e) => {
    const newSubjects = [...data.subjects];
    newSubjects[index][e.target.name] = e.target.value;
    setData({ ...data, subjects: newSubjects });
  };

  const addSubject = () => {
    setData({
      ...data,
      subjects: [
        ...data.subjects,
        { subject_name: "", mid_sem_marks: "", attendance: "" },
      ],
    });
  };

  // Submit
  const submitData = () => {
    console.log(data, "This The Final Data");
    axios
      .post(
        "https://collogemangmentusingmern-3.onrender.com/studentacprofile",
        data,
      )
      .then(() => {
        alert("Academic Profile Updated ✅");
        setData({
          colloge_pin: "",
          student_name: "",
          student_rollno: "",
          semester: "",
          subjects: [
            {
              subject_name: "",
              mid_sem_marks: "",
              attendance: "",
            },
          ],
        });
      })
      .catch(() => {
        alert("Error ❌");
      });
  };

  return (
    <div className="teacher-container">
      <div className="ticker">
        <p>
          ⚠️ Before submitting student data, please verify all details carefully
          | 📚 Ensure correct College Pin, Name & Roll Number
        </p>
      </div>
      <h2>Teacher Panel - Update Student Profile</h2>

      <input
        type="number"
        name="colloge_pin"
        placeholder="Student ID"
        onChange={handleChange}
        value={data.colloge_pin}
      />
      <input
        type="text"
        name="student_name"
        placeholder="Student Name"
        onChange={handleChange}
        value={data.student_name}
      />
      <input
        type="text"
        name="student_rollno"
        placeholder="Roll No"
        onChange={handleChange}
        value={data.student_rollno}
      />
      <input
        type="text"
        name="semester"
        placeholder="Semester"
        onChange={handleChange}
        value={data.semester}
      />

      <h3>Subjects</h3>

      {data.subjects.map((sub, index) => (
        <div className="subject-box" key={index}>
          <input
            type="text"
            name="subject_name"
            placeholder="Subject Name"
            onChange={(e) => handleSubjectChange(index, e)}
            value={sub.subject_name}
          />
          <input
            type="number"
            name="mid_sem_marks"
            placeholder="Marks"
            onChange={(e) => handleSubjectChange(index, e)}
            value={sub.mid_sem_marks}
          />
          <input
            type="number"
            name="attendance"
            placeholder="Attendance %"
            onChange={(e) => handleSubjectChange(index, e)}
            value={sub.attendance}
          />
        </div>
      ))}

      <button className="add-btn" onClick={addSubject}>
        ➕ Add Subject
      </button>
      <button className="submit-btn" onClick={submitData}>
        Submit
      </button>
    </div>
  );
}

export default Updatestudentprofile;

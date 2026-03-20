import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Ct from "./Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function AdminDeclareResult() {
  let navigate = useNavigate();
  let obj = useContext(Ct);
  useEffect(() => {
    let get_cookies = Cookies.get("login_data");
    if (!get_cookies) {
      navigate("/");
    } else {
      obj.updfun(JSON.parse(get_cookies));
    }
  }, []);
  const [formData, setFormData] = useState({
    student_college_pin: "",
    student_name: "",
    semester: "",
    CGPA: "",
    subjects: [{ subject_name: "", marks_obtained: "", total_marks: "" }],
    grade: "",
    final_result_type: "",
  });

  const handleChange = (e, index, field) => {
    if (field === "subjects") {
      const subjects = [...formData.subjects];
      subjects[index][e.target.name] = e.target.value;
      setFormData({ ...formData, subjects });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        { subject_name: "", marks_obtained: "", total_marks: "" },
      ],
    });
  };

  const removeSubject = (index) => {
    const subjects = [...formData.subjects];
    subjects.splice(index, 1);
    setFormData({ ...formData, subjects });
  };

  const submitResult = () => {
    // validation
    if (
      !formData.student_college_pin ||
      !formData.student_name ||
      !formData.semester
    ) {
      return alert("Fill all required fields");
    }

    axios
      .post("http://localhost:5002/admin/finalresult", formData)
      .then((res) => {
        alert("Result declared successfully");
        setFormData({
          student_college_pin: "",
          student_name: "",
          semester: "",
          CGPA: "",
          subjects: [{ subject_name: "", marks_obtained: "", total_marks: "" }],
          grade: "",
          final_result_type: "",
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to declare result");
      });
  };

  return (
    <div className="Pendingexam">
      <div className="ticker">
        <p>
          ⚠️ Admin must verify all student data before declaring result | 📢
          Incorrect marks or CGPA may affect student career | ❗ Once result is
          declared, admin will be responsible for errors | 🧾 Double-check
          subject marks, grade & result status before submission
        </p>
      </div>
      <h2 className="finalResultHeading">Declare Final Result</h2>

      <div className="finalResultInputDiv">
        <input
          type="number"
          name="student_college_pin"
          placeholder="Student College PIN"
          value={formData.student_college_pin}
          onChange={handleChange}
          className="finalResultInput"
        />
        <input
          type="text"
          name="student_name"
          placeholder="Student Name"
          value={formData.student_name}
          onChange={handleChange}
          className="finalResultInput"
        />
        <input
          type="text"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          className="finalResultInput"
        />
        <input
          type="text"
          name="CGPA"
          placeholder="CGPA"
          value={formData.CGPA}
          onChange={handleChange}
          className="finalResultInput"
        />
      </div>

      <div className="subjectsContainer">
        <h3>Subjects</h3>
        {formData.subjects.map((sub, index) => (
          <div key={index} className="subjectRow">
            <input
              type="text"
              name="subject_name"
              placeholder="Subject Name"
              value={sub.subject_name}
              onChange={(e) => handleChange(e, index, "subjects")}
              className="finalResultInput"
            />
            <input
              type="number"
              name="marks_obtained"
              placeholder="Marks Obtained"
              value={sub.marks_obtained}
              onChange={(e) => handleChange(e, index, "subjects")}
              className="finalResultInput"
            />
            <input
              type="number"
              name="total_marks"
              placeholder="Total Marks"
              value={sub.total_marks}
              onChange={(e) => handleChange(e, index, "subjects")}
              className="finalResultInput"
            />
            {/* <input
              type="text"
              name="grade"
              placeholder="Enter The Grade"
              value={formData.grade}
              onChange={(e) => handleChange(e, index, "subjects")}
              className="finalResultInput"
            />
            <input
              type="text"
              name="final_result_type"
              placeholder="Enter Result Type Pass/Fail"
              value={formData.grade}
              onChange={handleChange}
              className="finalResultInput"
            /> */}
            <input
              type="text"
              name="grade"
              placeholder="Enter The Grade"
              value={formData.grade}
              onChange={handleChange}
              className="finalResultInput"
            />
            <input
              type="text"
              name="final_result_type"
              placeholder="Enter Result Type Pass/Fail"
              value={formData.final_result_type}
              onChange={handleChange}
              className="finalResultInput"
            />
            {index > 0 && (
              <button
                className="removeSubjectButton"
                onClick={() => removeSubject(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button className="addSubjectButton" onClick={addSubject}>
          Add Subject
        </button>
      </div>

      <button className="finalResultButton" onClick={submitResult}>
        Declare Result
      </button>
    </div>
  );
}

export default AdminDeclareResult;

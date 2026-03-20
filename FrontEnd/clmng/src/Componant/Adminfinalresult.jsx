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

  // ✅ FINAL STATE (Schema Match)
  const [formData, setFormData] = useState({
    student_college_pin: "",
    student_name: "",
    semester: "",
    CGPA: "",
    subjects: [{ subject_name: "", total_marks: "", grade: "" }],
    grade: "",
    final_result_type: "",
  });

  // ✅ HANDLE CHANGE
  const handleChange = (e, index, field) => {
    const { name, value } = e.target;

    if (field === "subjects") {
      const subjects = [...formData.subjects];
      subjects[index][name] = value;
      setFormData({ ...formData, subjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ ADD SUBJECT
  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        { subject_name: "", total_marks: "", grade: "" },
      ],
    });
  };

  // ✅ REMOVE SUBJECT
  const removeSubject = (index) => {
    const subjects = [...formData.subjects];
    subjects.splice(index, 1);
    setFormData({ ...formData, subjects });
  };

  // ✅ SUBMIT
  const submitResult = () => {
    if (
      !formData.student_college_pin ||
      !formData.student_name ||
      !formData.semester
    ) {
      return alert("Fill all required fields");
    }

    const finalData = {
      ...formData,
      student_college_pin: Number(formData.student_college_pin),
      CGPA: Number(formData.CGPA),
      subjects: formData.subjects.map((sub) => ({
        subject_name: sub.subject_name,
        total_marks: Number(sub.total_marks),
        grade: sub.grade,
      })),
    };

    console.log(finalData); // debug

    axios
      .post("http://localhost:5002/admin/finalresult", finalData)
      .then((res) => {
        alert("Result declared successfully");

        // reset form
        setFormData({
          student_college_pin: "",
          student_name: "",
          semester: "",
          CGPA: "",
          subjects: [{ subject_name: "", total_marks: "", grade: "" }],
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
          Incorrect marks may affect student career | ❗ Double-check data
        </p>
      </div>

      <h2 className="finalResultHeading">Declare Final Result</h2>

      {/* BASIC DETAILS */}
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
          type="number"
          name="CGPA"
          placeholder="CGPA"
          value={formData.CGPA}
          onChange={handleChange}
          className="finalResultInput"
        />

        <input
          type="text"
          name="grade"
          placeholder="Overall Grade"
          value={formData.grade}
          onChange={handleChange}
          className="finalResultInput"
        />

        <input
          type="text"
          name="final_result_type"
          placeholder="Result Type (Pass/Fail)"
          value={formData.final_result_type}
          onChange={handleChange}
          className="finalResultInput"
        />
      </div>

      {/* SUBJECTS */}
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
              name="total_marks"
              placeholder="Marks"
              value={sub.total_marks}
              onChange={(e) => handleChange(e, index, "subjects")}
              className="finalResultInput"
            />

            <input
              type="text"
              name="grade"
              placeholder="Grade (A/B/C)"
              value={sub.grade}
              onChange={(e) => handleChange(e, index, "subjects")}
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

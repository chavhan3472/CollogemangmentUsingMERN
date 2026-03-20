import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Ct from "./Context";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function StudentFinalResult() {
  let obj = useContext(Ct);
  let navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    let get_cookies = Cookies.get("login_data");
    if (!get_cookies) {
      navigate("/");
    } else {
      obj.updfun(JSON.parse(get_cookies));
    }
  }, []);
  // const [userId, setUserId] = useState("");
  // const [result, setResult] = useState(null);

  const fetchResult = () => {
    if (!userId) return alert("Enter your User ID / College PIN");

    axios
      .get(`http://localhost:5002/finalresult/${userId}`)
      .then((res) => {
        if (!res.data) {
          alert("Result not found or not declared yet");
        } else {
          setResult(res.data);
        }
      })
      .catch((err) => console.log("Error fetching result", err));
  };

  return (
    <div className="FinalResultContainer">
      <div className="ticker">
        <p>
          📢 Use your College PIN to check result | ⚠️ Verify your result
          carefully | ❗ If any issue occurs contact Administrative Department |
          🎓 Results are subject to verification
        </p>
      </div>
      <h2 className="FinalResultTitle">Check Your Final Result</h2>

      {/* Input Section */}
      <div className="FinalResultInputSection">
        <input
          type="number"
          placeholder="Enter Your User ID / College PIN"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="FinalResultInputBox"
        />
        <button onClick={fetchResult} className="FinalResultButton">
          Show Result
        </button>
      </div>

      {/* Result Table */}
      {result && (
        <div className="FinalResultTableWrapper">
          <table className="FinalResultTable">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Semester</th>
                <th>CGPA</th>
                <th>Subjects & Marks</th>
                <th>GREADE</th>
                <th>Result Status</th>
                <th>Result Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.student_name}</td>
                <td>{result.semester}</td>
                <td>{result.CGPA}</td>

                <td>
                  {result.subjects.map((sub, index) => (
                    <div key={index}>
                      {sub.subject_name} : {sub.marks_obtained}
                      {sub.total_marks}
                    </div>
                  ))}
                  <td>{result.grade}</td>
                </td>
                <td>{result.final_result_status}</td>
                <td>{result.final_result_type}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentFinalResult;

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
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let get_cookies = Cookies.get("login_data");
    if (!get_cookies) {
      navigate("/");
    } else {
      obj.updfun(JSON.parse(get_cookies));
    }
  }, []);

  const fetchResult = () => {
    if (!userId) return alert("Enter your User ID / College PIN");

    axios
      .get(
        `https://collogemangmentusingmern-3.onrender.com/finalresult/${userId}`,
      )
      .then((res) => {
        setResult(res.data);
        console.log("Fetched Result:", res.data);
        setErrorMsg(""); // clear error
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setErrorMsg(err.response.data.msg); // backend msg
          setResult(null);
        } else {
          setErrorMsg("Server Error");
        }
      });
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

      {/* 🔴 Error Message */}
      {errorMsg && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>
      )}

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
                <th>Grade</th>
                <th>Result Status</th>
                <th>Result Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.student_name}</td>
                <td>{result.semester}</td>
                <td>{result.CGPA}</td>

                {/* ✅ Correct Field Mapping */}
                <td>
                  {result.subjects.map((sub, index) => (
                    <div key={index}>
                      {sub.subject_name} : {sub.total_marks}
                    </div>
                  ))}
                </td>

                {/* ✅ Correct Table Structure */}
                <td>{result.grade}</td>
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

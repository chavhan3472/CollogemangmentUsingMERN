import React, { useEffect, useState } from "react";
import Nav from "./Componant/Nav";
import Home from "./Componant/Home";
import Login from "./Componant/Login";
import Register from "./Componant/Register";
import Studentdash from "./Componant/Studentdash";
import Admindash from "./Componant/Admindash";
import PendingForm from "./Componant/PendingForm";
import CompletedForm from "./Componant/CompletedForm";
import Allform from "./Componant/Allform";
import ExamForm from "./Componant/ExamForm";
import Acdmicprofile from "./Componant/Acdmicprofile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ct from "./Componant/Context";
import Cookies from "js-cookie";
import StudentFinalResult from "./Componant/StudentFinalresult";
import Adminfinalresult from "./Componant/Adminfinalresult";
import TeacherDashboared from "./Componant/TeacherDashboared";
import Updatestudentprofile from "./Componant/Updatestudentprofile";
import Updatestudentdata from "./Componant/Updatestudentdata";
import Logout from "./Componant/Logout";
function App() {
  let [state, updState] = useState({
    token: "",
    user_name: "",
    role: "",
    user_password: "",
    user_id: "",
  });
  let updfun = (obj) => {
    updState({ ...state, ...obj });
  };
  useEffect(() => {
    let get_cookies = Cookies.get("login_data");
    if (get_cookies != undefined) {
      updfun(JSON.parse(get_cookies));
    }
  }, []);
  let obj = { state: state, updfun: updfun };
  return (
    <BrowserRouter>
      <Ct.Provider value={obj}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/studentdashbord" element={<Studentdash />} />
          <Route path="/admindashboard" element={<Admindash />} />
          <Route path="/pendingform" element={<PendingForm />} />
          <Route path="/completedform" element={<CompletedForm />} />
          <Route path="/allforms" element={<Allform />} />
          <Route path="/examform" element={<ExamForm />} />
          <Route path="/acdmicprofile" element={<Acdmicprofile />} />
          <Route path="/studenfinalresult" element={<StudentFinalResult />} />
          <Route path="/adminfinalresult" element={<Adminfinalresult />} />
          <Route path="/teacherdashboard" element={<TeacherDashboared />} />
          <Route
            path="/updatestudentprofile"
            element={<Updatestudentprofile />}
          />
          <Route path="/updatestudentdata" element={<Updatestudentdata />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Ct.Provider>
    </BrowserRouter>
  );
}

export default App;

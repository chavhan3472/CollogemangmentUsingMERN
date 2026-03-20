// import react, { useContext, useEffect } from "react";
// import "../App.css";
// import Ct from "./Context";
// import Cookies from "js-cookie";
// import { Navigate, useNavigate } from "react-router-dom";
// function Home() {
//   let obj = useContext(Ct);
//   let navigate = useNavigate();
//   useEffect(() => {
//     let cookieData = Cookies.get("login_data");

//     let cookies = null;

//     if (cookieData) {
//       cookies = JSON.parse(cookieData);
//       obj.updfun(cookieData);
//       console.log(obj, "This The Obj");
//     }

//     if (!cookies) {
//       navigate("/");
//     } else if (obj.role === "teacher") {
//       navigate("/teacherdashboard");
//     } else if (obj.role === "admin") {
//       navigate("/admindashboard");
//     }
//   }, []);
//   console.log(obj, "This The Second Object");
//   return (
//     <div className="homediv">
//       <h1 className="homedivheading">Welcome TO College Mangment System</h1>
//     </div>
//   );
// }

// export default Home;

// import React, { useContext, useEffect, useState } from "react";
// import "../App.css";
// import Ct from "./Context";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   let obj = useContext(Ct);
//   let navigate = useNavigate();

//   // 🔥 Real College Images
//   const images = [
//     "https://images.unsplash.com/photo-1576495199011-eb94736d05d6", // campus
//     "https://images.unsplash.com/photo-1588072432836-e10032774350", // classroom
//     "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b", // placement
//     "https://images.unsplash.com/photo-1596495577886-d920f1fb7238", // Indian classroom
//     "https://images.unsplash.com/photo-1588072432836-e10032774350", // lecture hall
//     "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", // campus
//     "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b", // students
//     "https://images.unsplash.com/photo-1562774053-701939374585", // college building
//     "https://images.unsplash.com/photo-1519455953755-af066f52f1a6", // annual event vibe
//   ];

//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     let interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 2500);

//     return () => clearInterval(interval);
//   }, []);

//   // 🔐 Auth
//   useEffect(() => {
//     let cookieData = Cookies.get("login_data");

//     if (cookieData) {
//       let user = JSON.parse(cookieData);
//       obj.updfun(user);

//       if (user.role === "teacher") navigate("/teacherdashboard");
//       else if (user.role === "admin") navigate("/admindashboard");
//     }
//   }, []);

//   return (
//     <div className="home-container">
//       {/* 🔥 Moving Notification */}
//       <div className="ticker">
//         <p>
//           🎓 Admissions Open | 📚 Exams Starting Soon | 💼 100+ Companies
//           Visiting for Placements | 🏆 Annual Fest Coming Soon
//         </p>
//       </div>

//       {/* 🔥 Image Slider */}
//       <div className="slider">
//         <img src={images[current]} alt="college" />
//         <div className="overlay">
//           <h1>Welcome To Our College</h1>
//           <p>Building Future Leaders 🚀</p>
//         </div>
//       </div>

//       {/* 🔥 Placement Section */}
//       <div className="placement-section">
//         <h2>💼 Placements</h2>

//         <div className="placement-cards">
//           <div className="card">
//             <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df" />
//             <h3>Top Companies</h3>
//             <p>TCS, Infosys, Wipro, Google, Microsoft</p>
//           </div>

//           <div className="card">
//             <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" />
//             <h3>Training</h3>
//             <p>Mock Interviews & Skill Development Programs</p>
//           </div>

//           <div className="card">
//             <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" />
//             <h3>Success Rate</h3>
//             <p>90% Students Placed Every Year</p>
//           </div>
//         </div>
//       </div>

//       {/* 🔥 About Section */}
//       <div className="info-section">
//         <h2>🏫 About College</h2>
//         <p>
//           Our college provides world-class education with modern labs,
//           experienced faculty, and strong placement support. We focus on both
//           academics and real-world skills.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Home;
import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import Ct from "./Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  let obj = useContext(Ct);
  let navigate = useNavigate();

  // 🔥 FINAL SLIDES (Your Images + Perfect Order)
  const slides = [
    {
      img: "https://media.istockphoto.com/id/477633485/photo/team-of-successful-university-graduates-raising-their-convocation-caps.jpg?s=612x612&w=0&k=20&c=Cg9aAKKOFJkukureA3hzdnXin42O-GCBP60b4h5CLic=",
      title: "🎓 Convocation Ceremony",
      desc: "Celebrating Success & Achievements",
    },
    {
      img: "https://www.dcindia.in/uploads/activities/1582362597DSC08583.JPG",
      title: "🎉 Annual Function",
      desc: "Cultural Events & Student Performances",
    },
    {
      img: "https://images.unsplash.com/photo-1588072432836-e10032774350",
      title: "📚 Classroom Learning",
      desc: "Interactive & Practical Education",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdHr7GfNMvvFC9Q0MNY22jd7xcyLhezmdreg&s",
      title: "💼 Placements",
      desc: "Top Companies Hiring Our Students",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔐 Auth
  useEffect(() => {
    let cookieData = Cookies.get("login_data");

    if (cookieData) {
      let user = JSON.parse(cookieData);
      obj.updfun(user);

      if (user.role === "teacher") navigate("/teacherdashboard");
      else if (user.role === "admin") navigate("/admindashboard");
    }
  }, []);

  return (
    <div className="home-container">
      {/* 🔥 Moving Notification */}
      <div className="ticker">
        <p>
          🎓 Admissions Open | 📚 Exams Starting Soon | 💼 100+ Companies
          Visiting | 🏆 Annual Fest Coming Soon
        </p>
      </div>

      {/* 🔥 Slider */}
      <div className="slider">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.img}
            className={index === current ? "active" : ""}
            alt="college"
          />
        ))}

        <div className="overlay">
          <h1>{slides[current].title}</h1>
          <p>{slides[current].desc}</p>
        </div>
      </div>

      {/* 🔥 Campus Life */}
      <div className="campus-section">
        <h2>🎉 Campus Life</h2>

        <div className="campus-grid">
          <div>
            <img src="https://www.dcindia.in/uploads/activities/1582362597DSC08583.JPG" />
            <p>Annual Function</p>
          </div>

          <div>
            <img src="https://images.unsplash.com/photo-1588072432836-e10032774350" />
            <p>Classroom</p>
          </div>

          <div>
            <img src="https://media.istockphoto.com/id/477633485/photo/team-of-successful-university-graduates-raising-their-convocation-caps.jpg?s=612x612&w=0&k=20&c=Cg9aAKKOFJkukureA3hzdnXin42O-GCBP60b4h5CLic=" />
            <p>Convocation</p>
          </div>

          <div>
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1" />
            <p>Campus</p>
          </div>
        </div>
      </div>

      {/* 🔥 Placement */}
      <div className="placement-section">
        <h2>💼 Placements</h2>

        <div className="placement-cards">
          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdHr7GfNMvvFC9Q0MNY22jd7xcyLhezmdreg&s" />
            <h3>Campus Interviews</h3>
            <p>Top companies visit every year</p>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" />
            <h3>Training</h3>
            <p>Mock interviews & skill development</p>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df" />
            <h3>Success Rate</h3>
            <p>90% students placed</p>
          </div>
        </div>
      </div>

      {/* 🔥 About */}
      <div className="info-section">
        <h2>🏫 About College</h2>
        <p>
          Our college provides quality education with modern labs, experienced
          faculty, and excellent placement support. We focus on overall student
          development.
        </p>
      </div>
    </div>
  );
}

export default Home;

import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import Ct from "./Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  let obj = useContext(Ct);
  let navigate = useNavigate();
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
      {/*  Moving Notification */}
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

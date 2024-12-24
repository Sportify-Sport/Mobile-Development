import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "./Profile";

export default function Root(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const adminUser = {
    birthDate: "2024-12-11",
    city: "Kafr Qara",
    email: "admin@gmail.com",
    firstName: "Admin",
    image: "imageURL_or_placeholder",
    lastName: "User",
    number: "103",
    password: "ad12343211ad",
    street: "ח",
    username: "admin",
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }

    const storedData = sessionStorage.getItem("currentUser");
    if (storedData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginRedirect = () => {
    navigate("/Login");
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <p>יש להתחבר למערכת</p>
          <button onClick={handleLoginRedirect}>התחבר</button>
        </div>
      ) : (
        <div>
          <Profile />
        </div>
      )}
    </div>
  );
}

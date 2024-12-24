import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "./Profile";

export default function Root(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const adminUser = {
    birthDate: "2000-12-11",
    city: "Netanya",
    email: "admin@gmail.com",
    firstName: "Admin",
    image: "https://png.pngtree.com/png-vector/20190629/ourmid/pngtree-office-work-user-icon-avatar-png-image_1527655.jpg",
    lastName: "User",
    number: "9",
    password: "ad12343211ad",
    street: "שוהם",
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

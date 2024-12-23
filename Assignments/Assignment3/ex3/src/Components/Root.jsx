import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "./Profile";

export default function Root(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem("profileData");
    if (storedData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginRedirect = () => {
    navigate("/Login");
  };

  return (
    // <div>
    //   {!isLoggedIn ? (
    //     <div>
    //       <p>יש להתחבר למערכת</p>
    //       <button onClick={handleLoginRedirect}>התחבר</button>
    //     </div>
    //   ) : (
        <div>
          <Profile /> {/* If logged in, show the Profile component */}
        </div>
    //   )}
    // </div>
  );
}

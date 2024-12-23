import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook to navigate to different pages
import "./Login.css"; // Add your previous styles here

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // To navigate after successful login

  // Check if a user is already logged in from sessionStorage when component mounts
  useEffect(() => {
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      alert("You already signed in! You need to logout before trying to log in to another account.");
  
      navigate("/"); 
    }
  }, [navigate]);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // Handle form submission
  const handleLogin = () => {
    // Check if both email and password fields are filled
    if (!email || !password) {
      setErrorMessage("Both fields are required!");
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find a user with matching email and password
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    // If user exists, save to sessionStorage and navigate to profile page
    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user)); // Save current user in sessionStorage
      setErrorMessage(""); // Clear error message

      alert("Login successful!"); // Notify the user of successful login

      // Navigate to the profile page (you can replace "/" with your actual route)
      navigate("/");
    } else {
      setErrorMessage("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      <div className="form-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button onClick={handleLogin} className="login-button">Login</button>
        <span>Don't have a user? <a onClick={handleRegisterClick} className="link"> Register now!</a></span>
      </div>
    </div>
  );
}

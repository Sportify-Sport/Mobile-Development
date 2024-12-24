import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("Both fields are required!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => (u.email === email && u.password === password) || (u.username === email && u.password === password)
    );

    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      setErrorMessage("");

      alert("Login successful!");

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

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
      alert("כבר התחברת! עליך להתנתק לפני שתוכל לנסות להתחבר לחשבון אחר.");
  
      navigate("/"); 
    }
  }, [navigate]);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("שני השדות נדרשים!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => (u.email === email && u.password === password) || (u.username === email && u.password === password)
    );

    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      setErrorMessage("");

      alert("ההתחברות בוצעה בהצלחה!");

      navigate("/");
    } else {
      setErrorMessage("דואל או סיסמה שגויים. אנא נסה שוב. ");
    }
  };

  return (
    <div className="login-container">
      <h2>הרשמה</h2>
      
      <div className="form-container">
        <label htmlFor="email">דוא"ל</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="הכנס את הדואל שלך"
        />

        <label htmlFor="password">סיסמה</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="הכנס את הסיסמה שלך"
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button onClick={handleLogin} className="login-button">התחבר</button>
        <span>אין לך משתמש? <a onClick={handleRegisterClick} className="link"> הירשם עכשיו!</a></span>
      </div>
    </div>
  );
}

import React, { useState } from "react";

const EditUserForm = ({ userData, editUser }) => {
  const [formData, setFormData] = useState({ ...userData });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // If the field is password, validate it
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    // Regular expression to check password validity
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
    
    if (!password.match(passwordRegex)) {
      setPasswordError(
        "Password must be between 7 and 12 characters, include at least one uppercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError) {
      editUser(formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">שם משתמש</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">סיסמה חדשה</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
          />
          {passwordError && <div className="text-danger">{passwordError}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">אימות סיסמה</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">שם מלא</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">תאריך לידה</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">כתובת</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">אימייל (לא ניתן לעריכה)</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={!!passwordError}>
          עדכון
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
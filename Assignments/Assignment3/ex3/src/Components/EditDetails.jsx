import React, { useState } from "react";

const EditDetails = ({ userData, editUser, mode }) => {
  console.log("userData",userData);
  const [formData, setFormData] = useState({ ...userData });
  const [passwordInput, setPasswordInput] = useState(""); 
  const [counter, setCounter] = useState(0); 
  const [errors, setErrors] = useState({
    passwordError: "",
    confirmPasswordError: "",
    dobError: "",
    imageError: "",
  });
  const [citySuggestions, setCitySuggestions] = useState([]);

  const citiesList = [
    { hebrew: "תל אביב", english: "Tel Aviv" },
    { hebrew: "ירושלים", english: "Jerusalem" },
    { hebrew: "חיפה", english: "Haifa" },
    { hebrew: "נתניה", english: "Netanya" },
    { hebrew: "אשדוד", english: "Ashdod" },
    { hebrew: "רמת גן", english: "Ramat Gan" },
    { hebrew: "הרצליה", english: "Herzliya" },
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const fileType = file.type.toLowerCase();
        if (fileType === "image/jpeg" || fileType === "image/jpg") {
          const imageUrl = URL.createObjectURL(file);
          setFormData((prevData) => ({ ...prevData, image: imageUrl }));
          setErrors((prevErrors) => ({ ...prevErrors, imageError: "" }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            imageError: "Please upload a valid image (jpg/jpeg).",
          }));
          e.target.value = null;
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))

      if (name === "password") {    setPasswordInput(value); 
        validatePassword(value); 
        return;}
      if (name === "confirmPassword") validateConfirmPassword(value, formData.password);
      if (name === "birthDate") validateBirthDate(value);
      if (name === "city") handleCitySuggestions(value);
      if (name === "number") validateNumber(value);
      if (name === "street") validateStreet(value);
    }
  };


  const validateStreet = (value) => {
    if (!/^[\u0590-\u05FF\s]+$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        streetError: "Street name must be in Hebrew letters.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        streetError: "",
      }));
    }
  };

  const validateNumber = (value) => {
    if (!/^[1-9]\d*$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        numberError: "Must be a positive number greater than 0.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        numberError: "",
      }));
    }
  };
  

  const validatePassword = (password) => {
    if (password !== "") {
      if (password === formData.password) {
        setCounter(1); 
      } else {
        setCounter(0); 
      }

      if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/.test(password)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordError:
            "Password must be between 7 and 12 characters, include at least one uppercase letter, one number, and one special character.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordError: "",
        }));
      }
    }
  };



  const validateConfirmPassword = (confirmPassword, password) => {
  if (confirmPassword && confirmPassword !== password) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPasswordError: "Passwords do not match.",
    }));
  } else {
    setErrors((prevErrors) => ({ ...prevErrors, confirmPasswordError: "" }));
  }
};

  const handleCitySuggestions = (value) => {
    const filteredCities = citiesList.filter(
      (city) =>
        city.english.toLowerCase().includes(value.toLowerCase()) ||
        city.hebrew.includes(value)
    );
    setCitySuggestions(filteredCities);
    setFormData((prevData) => ({ ...prevData, city: value }));
  };

  const handleCitySelect = (city) => {
    setFormData((prevData) => ({ ...prevData, city: city.english }));
    setCitySuggestions([]);
  };

  const validateBirthDate = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }

    if (age < 18 || age > 120) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dobError: "Age must be between 18 and 120 years.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, dobError: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isPasswordChange = !!formData.password; 
    
    if (
      (!isPasswordChange || (!errors.passwordError && !errors.confirmPasswordError)) &&
      !errors.dobError && 
      !errors.imageError && 
      !errors.numberError
    ) {
      editUser(formData,counter);
    }
  };

  const isFormValid = !errors.passwordError && !errors.confirmPasswordError && !errors.dobError && !errors.imageError &&!errors.numberError;

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
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">תמונה</label>
          <input
            type="file"
            className="form-control"
            name="image"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleChange}
          />
          {errors.imageError && <div className="text-danger">{errors.imageError}</div>}
          {formData.image && (
            <div>
              <img
                src={formData.image}
                alt="Profile Preview"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">עיר</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
          {citySuggestions.length > 0 && (
            <ul className="list-group">
              {citySuggestions.map((city, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  onClick={() => handleCitySelect(city)}
                >
                  {city.english} ({city.hebrew})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">רחוב</label>
          <input
            type="text"
            className="form-control"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
                    {errors.streetError && <div className="text-danger mt-2">{errors.streetError}</div>} {/* Ensure proper margin */}
        </div>

        <div className="mb-3">
          <label className="form-label">מספר</label>
          <input
            type="text"
            className="form-control"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
          {errors.numberError && <div className="text-danger mt-2">{errors.numberError}</div>} {/* Ensure proper margin */}
        </div>

        {mode === 1 && (
          <>
              <div className="mb-3">
              <label className="form-label">סיסמה חדשה</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
              {errors.passwordError && <div className="text-danger">{errors.passwordError}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">אימות סיסמה</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                onChange={handleChange}
              />
              {errors.confirmPasswordError && <div className="text-danger">{errors.confirmPasswordError}</div>}
            </div>
          </>
        )}

        <div className="mb-3">
          <label className="form-label">תאריך לידה</label>
          <input
            type="date"
            className="form-control"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.dobError && <div className="text-danger">{errors.dobError}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
        >
          עדכון
        </button>
      </form>
    </div>
  );
};

export default EditDetails;


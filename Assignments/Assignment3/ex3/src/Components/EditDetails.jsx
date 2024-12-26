import React, { useState } from "react";

const EditDetails = ({ userData, editUser, mode }) => {
  console.log("userData", userData);
  const [formData, setFormData] = useState({ ...userData });
  const [passwordInput, setPasswordInput] = useState("");
  const [counter, setCounter] = useState(0);
  const [errors, setErrors] = useState({
    passwordError: "",
    confirmPasswordError: "",
    dobError: "",
    imageError: "",
    cityError: "",
  });
  const [citySuggestions, setCitySuggestions] = useState([]);

  const citiesList = [
    { hebrew: "תל אביב", english: "Tel Aviv" },
    { hebrew: "ירושלים", english: "Jerusalem" },
    { hebrew: "חיפה", english: "Haifa" },
    { hebrew: "באר שבע", english: "Be'er Sheva" },
    { hebrew: "נתניה", english: "Netanya" },
    { hebrew: "אשדוד", english: "Ashdod" },
    { hebrew: "רמת גן", english: "Ramat Gan" },
    { hebrew: "עכו", english: "Acre" },
    { hebrew: "הוד השרון", english: "Hod Hasharon" },
    { hebrew: "הרצליה", english: "Herzliya" },
    { hebrew: "חולון", english: "Holon" },
    { hebrew: "כפר סבא", english: "Kfar Saba" },
    { hebrew: "מודיעין", english: "Modiin" },
    { hebrew: "אשקלון", english: "Ashkelon" },
    { hebrew: "פתח תקווה", english: "Petah Tikva" },
    { hebrew: "חדרה", english: "Hadera" },
    { hebrew: "רחובות", english: "Rehovot" },
    { hebrew: "טבריה", english: "Tiberias" },
    { hebrew: "כפר קרע", english: "Kafr Qara" },
    { hebrew: "גת", english: "Jatt" },
    { hebrew: "עפולה", english: "Afula" },
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
            imageError: " אנא העלה תמונה תקינה (jpg/jpeg).",
          }));
          e.target.value = null;
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    if (name === "password") {
      setPasswordInput(value);
      validatePassword(value);
    }

    if (name === "confirmPassword") {
      validateConfirmPassword(value, formData.password);
    }
    if (name === "firstName") {
      validateFirstName(value, formData.firstName);
    }
    if (name === "lastName") {
      validateLastName(value, formData.lastName);
    }

    if (name === "birthDate") {
      validateBirthDate(value);
    }

    if (name === "city") {
      handleCitySuggestions(value);
    }

    if (name === "number") {
      validateNumber(value);
    }

    if (name === "street") {
      validateStreet(value);
    }

    if (name === "image" && !e.target.files) {
      validateImage(value);
    }
  };

  const validateStreet = (value) => {
    if (!/^[\u0590-\u05FF\s]+$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        streetError: "שם הרחוב חייב להיות באותיות עבריות.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        streetError: "",
      }));
    }
  };

  const validateFirstName = (value) => {
    if (!/^[a-zA-Z\u0590-\u05FF\s]+$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstNameError: "רק אותיות (אנגלית או עברית) מותרות.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstNameError: "",
      }));
    }
  };

  const validateLastName = (value) => {
    if (!/^[a-zA-Z\u0590-\u05FF\s]+$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastNameError: "רק אותיות (אנגלית או עברית) מותרות.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastNameError: "",
      }));
    }
  };

  const validateNumber = (value) => {
    if (!/^[1-9]\d*$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        numberError: "חייב להיות מספר חיובי גדול מ-0.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        numberError: "",
      }));
    }
  };

  const validateImage = (value) => {
    if (
      value &&
      !(
        /\.(jpg|jpeg)$/i.test(value) ||
        /^https?:\/\/.*\.(jpg|jpeg)$/i.test(value)
      )
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        imageError: "סוג התמונה חייב להיות jpg או jpeg!",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        imageError: "",
      }));
    }
  };

  const validatePassword = (password) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{7,12}$/.test(
        password
      ) &&
      password !== ""
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError:
          "הסיסמה חייבת להיות בין 7 ל-12 תווים, לכלול לפחות אות אחת רישית, מספר אחד, ותו מיוחד אחד.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "",
      }));
    }
    if (currentUser && password === currentUser.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "הסיסמה כבר בשימוש.",
      }));
    }
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword && confirmPassword !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError: "הסיסמאות אינן תואמות.",
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

    const cityExists = citiesList.some(
      (city) =>
        city.english.toLowerCase() === value.toLowerCase() ||
        city.hebrew === value
    );


    if (!cityExists) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cityError: "העיר חייבת להיות עיר תקנית בישראל.",
      }));
    } else {
      setErrors((prevErrors) => {
        const { cityError, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleCitySelect = (city) => {
    setFormData((prevData) => ({ ...prevData, city: city.english }));
    setCitySuggestions([]);
    setErrors((prevErrors) => {
      const { cityError, ...rest } = prevErrors; 
      return rest;
    });
  };

  const validateBirthDate = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    if (age < 18 || age > 120) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dobError: "הגיל חייב להיות בין 18 ל-120 שנים.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, dobError: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.passwordError &&
      !errors.confirmPasswordError &&
      !errors.dobError &&
      !errors.imageError &&
      !errors.numberError
    ) {
      editUser(formData, counter);
    }
  };

  const isFormValid =
    !errors.passwordError &&
    !errors.confirmPasswordError &&
    !errors.dobError &&
    !errors.imageError &&
    !errors.numberError;

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
          <label className="form-label">איימיל</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.email}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">שם פרטי</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstNameError && (
            <div className="text-danger">{errors.firstNameError}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">שם משפחה</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastNameError && (
            <div className="text-danger">{errors.lastNameError}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">תמונה</label>
          <input
            type="file"
            className="form-control"
            name="image"
            accept="image/jpeg, image/jpg"
            onChange={handleChange}
          />

          <span>
            <br />
            או:
          </span>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={errors.imageError ? "error" : ""}
            placeholder="הכנס קישור לתמונה (JPG/JPEG)"
          />

          {errors.imageError && (
            <div className="text-danger">{errors.imageError}</div>
          )}

          {formData.image &&
            !formData.image.startsWith("http") &&
            !errors.imageError && (
              <div>
                <img
                  src={formData.image}
                  alt="Profile Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}

          {formData.image &&
            formData.image.startsWith("http") &&
            !errors.imageError && (
              <div>
                <img
                  src={formData.image}
                  alt="תצוגה מקדימה של פרופיל"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
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
            placeholder="הכנס את עירך"
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
          {errors.cityError && (
            <div className="text-danger">{errors.cityError}</div>
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
          {errors.streetError && (
            <div className="text-danger mt-2">{errors.streetError}</div>
          )}
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
          {errors.numberError && (
            <div className="text-danger mt-2">{errors.numberError}</div>
          )}
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
              {errors.passwordError && (
                <div className="text-danger">{errors.passwordError}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">אימות סיסמה</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                onChange={handleChange}
              />
              {errors.confirmPasswordError && (
                <div className="text-danger">{errors.confirmPasswordError}</div>
              )}
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
          {errors.dobError && (
            <div className="text-danger">{errors.dobError}</div>
          )}
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

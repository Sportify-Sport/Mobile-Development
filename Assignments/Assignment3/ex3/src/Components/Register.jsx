import React, { useState, useEffect } from 'react';
import './registerCss.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
    birthDate: '',
    city: '',
    street: '',
    number: '',
  });
  
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);

  const citiesList = [
    { hebrew: 'תל אביב', english: 'Tel Aviv' },
    { hebrew: 'ירושלים', english: 'Jerusalem' },
    { hebrew: 'חיפה', english: 'Haifa' },
    { hebrew: 'באר שבע', english: "Be'er Sheva" },
    { hebrew: 'נתניה', english: 'Netanya' },
    { hebrew: 'אשדוד', english: 'Ashdod' },
    { hebrew: 'רמת גן', english: 'Ramat Gan' },
    { hebrew: 'עכו', english: 'Acre' },
    { hebrew: 'הוד השרון', english: 'Hod Hasharon' },
    { hebrew: 'הרצליה', english: 'Herzliya' },
    { hebrew: 'חולון', english: 'Holon' },
    { hebrew: 'כפר סבא', english: 'Kfar Saba' },
    { hebrew: 'מודיעין', english: 'Modiin' },
    { hebrew: 'אשקלון', english: 'Ashkelon' },
    { hebrew: 'פתח תקווה', english: 'Petah Tikva' },
    { hebrew: 'חדרה', english: 'Hadera' },
    { hebrew: 'רחובות', english: 'Rehovot' },
    { hebrew: 'טבריה', english: 'Tiberias' },
    { hebrew: 'כפר קרע', english: 'Kafr Qara' },
    { hebrew: 'גת', english: 'Jatt' },
    { hebrew: 'עפולה', english: 'Afula' },
  ];

  useEffect(() => {
    if (isRegistered) {
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        city: '',
        street: '',
        number: '',
        image: '',
      });
      setErrors({});
    }
  }, [isRegistered]);

  useEffect(() => {
    if (formData.city) {
      const cityExists = citiesList.some(
        (city) => city.english.toLowerCase() === formData.city.toLowerCase() || city.hebrew === formData.city
      );
      if (cityExists) {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.city;
          return newErrors;
        });
      }
    }
  }, [formData.city]); 

  const validate = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case 'username':
        if (!/^[a-zA-Z0-9!@#$%^&*]{1,60}$/.test(value)) {
          newErrors.username = 'חייב להיות אלפאנומרי או תווים מיוחדים (מקסימום 60).';
        } else {
          delete newErrors.username;
        }
        break;

      case 'password':
        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{7,12}$/.test(value)) {
          newErrors.password =
            'חייבת לכלול בין 7 ל-12 תווים, תו מיוחד אחד, אות רישית אחת, ומספר אחד.';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'הסיסמאות אינן תואמות.';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'image':
        if (value && !/\.(jpg|jpeg)$/.test(value.toLowerCase()) && !/^https?:\/\/.*\.(jpg|jpeg)$/.test(value)) {
          newErrors.image = 'מותר רק קבצי jpg או jpeg, או יש לספק כתובת URL של תמונה תקינה.';
        } else {
          delete newErrors.image;
        }
        break;

      case 'firstName':
      case 'lastName':
        if (!/^[a-zA-Z\u0590-\u05FF\s]+$/.test(value)) {
          newErrors[name] = 'מותרות רק אותיות (אנגלית או עברית).';
        } else {
          delete newErrors[name];
        }
        break;

      case 'email':
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/.test(value)) {
          newErrors.email = 'פורמט דוא"ל לא תקני. חייב לכלול "@" ולהסתיים ב ".com".';
        } else {
          delete newErrors.email;
        }
        break;

      case 'birthDate':
        const today = new Date();
        const selectedDate = new Date(value);
        let age = today.getFullYear() - selectedDate.getFullYear();
        const month = today.getMonth() - selectedDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < selectedDate.getDate())) {
          age--;
        }

        if (selectedDate >= today) {
          newErrors.birthDate = 'תאריך לידה לא תקני.';
        } else if (age < 18 || age >= 120) {
          newErrors.birthDate = 'גיל לא תקני. המשתמש חייב להיות בין 18 ל-120 שנים.';
        } else {
          delete newErrors.birthDate;
        }
        break;

      case 'city':
        const cityExists = citiesList.some(
          (city) => city.english.toLowerCase() === value.toLowerCase() || city.hebrew === value
        );
        if (!cityExists) {
          newErrors.city = 'העיר חייבת להיות עיר תקנית בישראל.';
        } else {
          delete newErrors.city;
        }
        break;

      case 'street':
        if (!/^[\u0590-\u05FF\s]+$/.test(value)) {
          newErrors.street = 'שם הרחוב חייב להיות באותיות עבריות.';
        } else {
          delete newErrors.street;
        }
        break;

      case 'number':
        if (!/^\d+$/.test(value) || value <= 0) {
          newErrors.number = 'חייב להיות מספר חיובי.';
        } else {
          delete newErrors.number;
        }
        break;

      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const fileType = file.type.toLowerCase();
        if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
          const imageUrl = URL.createObjectURL(file);
          setFormData({ ...formData, image: imageUrl });
        } else {
          alert('אנא העלה תמונה תקינה (jpg/jpeg).');
          e.target.value = null;
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
      validate(name, value);
    }

    if (name === 'city') {
      const filteredCities = citiesList.filter(
        (city) =>
          city.english.toLowerCase().includes(value.toLowerCase()) || city.hebrew.includes(value)
      );
      setCitySuggestions(filteredCities);
    }
  };

  const handleCitySelect = (city) => {
    setFormData({ ...formData, city: city.english });
    setCitySuggestions([]);
  };

  const handleRegister = () => {
    const hasErrors = Object.keys(errors).length > 0;
    const isEmptyField = Object.values(formData).some((value) => value === '');
    if (hasErrors || isEmptyField) {
      alert('אנא תקן את השגיאות ומלא את כל השדות.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.some((user) => user.email === formData.email);
    const usernameExists = users.some((user) => user.username === formData.username);

    if (emailExists) {
      alert('הדוא"ל כבר רשום. אנא השתמש בדוא"ל אחר.');
      return;
    }

    if (usernameExists) {
      alert('שם המשתמש כבר תפוס. אנא בחר שם משתמש אחר.');
      return;
    }

    const newUser = { ...formData };
    delete newUser.confirmPassword;

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('ההרשמה בוצעה בהצלחה!');
    setIsRegistered(true);

    sessionStorage.setItem('currentUser', JSON.stringify(newUser));

    navigate("/");
  };

  return (
    <div className="register-form">
      <h2>מידע על משתמש</h2>
      {Object.keys(formData).map((key) => (
        <div key={key} className="form-group">
          <label>{key.replace(/([A-Z])/g, ' $1')}</label>
          {key === 'image' ? (
            <div>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className={errors[key] ? 'error' : ''}
              />
              <span>
                <br />
                or :
              </span>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={errors[key] ? 'error' : ''}
                placeholder="הכנס כתובת URL של תמונה"
                />
            </div>
          ) : key === 'city' ? (
            <div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors[key] ? 'error' : ''}
                placeholder="הכנס את עירך"
                />
              {citySuggestions.length > 0 && (
                <ul className="city-suggestions">
                  {citySuggestions.map((city, index) => (
                    <li key={index} onClick={() => handleCitySelect(city)}>
                      {city.english} ({city.hebrew})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <input
              type={
                key === 'password' || key === 'confirmPassword'
                  ? 'password'
                  : key === 'birthDate'
                  ? 'date'
                  : 'text'
              }
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className={errors[key] ? 'error' : ''}
              placeholder={`הכנס את ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
          )}
          {errors[key] && <span className="error-message">{errors[key]}</span>}
        </div>
      ))}
      <button onClick={handleRegister}>הירשם</button>
      <span>כבר יש לך משתמש? <a onClick={handleLoginClick} className="link">התחבר!</a></span>
      </div>
  );
};

export default Register;
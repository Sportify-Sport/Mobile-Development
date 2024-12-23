import React, { useState, useEffect } from 'react';
import './registerCss.css';

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
          newErrors.username = 'Must be alphanumeric or special characters (max 60).';
        } else {
          delete newErrors.username;
        }
        break;

      case 'password':
        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{7,12}$/.test(value)) {
          newErrors.password =
            'Must contain 7-12 chars, 1 special char, 1 uppercase letter, 1 number.';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match.';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'image':
        if (value && !/\.(jpg|jpeg)$/.test(value.toLowerCase()) && !/^https?:\/\/.*\.(jpg|jpeg)$/.test(value)) {
          newErrors.image = 'Only jpg or jpeg files are allowed, or provide a valid image URL.';
        } else {
          delete newErrors.image;
        }
        break;

      case 'firstName':
      case 'lastName':
        if (!/^[a-zA-Z\u0590-\u05FF\s]+$/.test(value)) {
          newErrors[name] = 'Only letters (English or Hebrew) are allowed.';
        } else {
          delete newErrors[name];
        }
        break;

      case 'email':
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/.test(value)) {
          newErrors.email = 'Invalid email format. Must include "@" and end with ".com".';
        } else {
          delete newErrors.email;
        }
        break;

      case 'birthDate':
        const today = new Date();
        const selectedDate = new Date(value);
        const age = today.getFullYear() - selectedDate.getFullYear();
        const month = today.getMonth() - selectedDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < selectedDate.getDate())) {
          age--;
        }

        if (selectedDate >= today) {
          newErrors.birthDate = 'Invalid date of birth.';
        } else if (age < 18 || age >= 120) {
          newErrors.birthDate = 'Invalid age. The user must be between 18 and 120 years old.';
        } else {
          delete newErrors.birthDate;
        }
        break;

      case 'city':
        const cityExists = citiesList.some(
          (city) => city.english.toLowerCase() === value.toLowerCase() || city.hebrew === value
        );
        if (!cityExists) {
          newErrors.city = 'City must be a valid city in Israel.';
        } else {
          delete newErrors.city;
        }
        break;

      case 'street':
        if (!/^[\u0590-\u05FF\s]+$/.test(value)) {
          newErrors.street = 'Street name must be in Hebrew letters.';
        } else {
          delete newErrors.street;
        }
        break;

      case 'number':
        if (!/^\d+$/.test(value) || value <= 0) {
          newErrors.number = 'Must be a positive number.';
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
        const imageUrl = URL.createObjectURL(file);
        setFormData({ ...formData, image: imageUrl });
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
      alert('Please fix the errors and fill all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.some((user) => user.email === formData.email);
    const usernameExists = users.some((user) => user.username === formData.username);

    if (emailExists) {
      alert('Email already registered. Please use a different email.');
      return;
    }

    if (usernameExists) {
      alert('Username already taken. Please choose a different username.');
      return;
    }

    const newUser = { ...formData };
    delete newUser.confirmPassword;

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    setIsRegistered(true);
  };

  return (
    <div className="register-form">
      <h2>User Information</h2>
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
                placeholder="Enter image URL"
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
                placeholder="Enter your city"
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
              placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            />
          )}
          {errors[key] && <span className="error-message">{errors[key]}</span>}
        </div>
      ))}
      <button onClick={handleRegister}>Register</button>
      <span>Already have a user?<a> log in!</a></span>
    </div>
  );
};

export default Register;
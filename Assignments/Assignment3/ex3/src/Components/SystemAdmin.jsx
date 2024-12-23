import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './SystemAdmin.css'

const UserTable = () => {
  const [users, setUsers] = useState([  {
    username: "פלוני משתמש",
    fullName:"פלוני אלמוני",
    dob: "05 בינואר 1980",
    address: "הדגית 35, ראשון לציון",
    email: "ploni@gmail.com",
  }]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    
    <div className="container mt-5">

        <div><button >fbvbs</button></div>


      <h3 className="mb-4">System Admin User Management</h3>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>שם משתמש</th>
            <th>שם מלא</th>
            <th>תאריך לידה</th>
            <th>כתובת</th>
            <th>דואר אלקטרוני</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>{user.dob}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>
                <button className="btn btn-primary btn-sm me-2">
                <i className="bi bi-pencil"></i> עריכה
                </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    <i className="bi bi-trash"></i> מחיקה
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                לא נמצאו משתמשים
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
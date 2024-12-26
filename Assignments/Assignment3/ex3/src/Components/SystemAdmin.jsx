// import React, { useState, useEffect } from "react";
// import './SystemAdmin.css'

// const UserTable = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem("users"));
//     if (storedUsers) {
//       setUsers(storedUsers);
//     }
//   }, []);

//   const handleDelete = (index) => {
//     const confirmDelete = window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?");
//     if (confirmDelete) {
//       const updatedUsers = [...users];
//       updatedUsers.splice(index, 1);
//       setUsers(updatedUsers);
//       localStorage.setItem("users", JSON.stringify(updatedUsers));
//     }
//   };  

//   return (
//     <div className="container mt-5">
//       <h3 className="pad">ניהול המשתמשים במערכת</h3>
  
//       <table className="table table-bordered table-hover">
//         <thead className="table-light">
//           <tr>
//             <th>שם משתמש</th>
//             <th>שם מלא</th>
//             <th>תאריך לידה</th>
//             <th>כתובת</th>
//             <th>דואר אלקטרוני</th>
//             <th>פעולות</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user, index) => (
//               user.email === "admin@gmail.com" ? null : (
//                 <tr key={index}>
//                   <td>{user.username}</td>
//                   <td>{user.firstName} {user.lastName}</td>
//                   <td>{user.birthDate}</td>
//                   <td>{user.city}, {user.street} {user.number}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <button className="btn btn-primary btn-sm me-2">
//                       <i className="bi bi-pencil"></i> עריכה
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(index)}
//                     >
//                       <i className="bi bi-trash"></i> מחיקה
//                     </button>
//                   </td>
//                 </tr>
//               )
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center">
//                 לא נמצאו משתמשים
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );  
// };

// export default UserTable;


import React, { useState, useEffect } from "react";
import EditDetails from "./EditDetails";
import "./SystemAdmin.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editUserData, setEditUserData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?");
    if (confirmDelete) {
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const handleEdit = (email) => {
    const userToEdit = users.find((user) => user.email === email);
    if (userToEdit) {
      setEditUserData(userToEdit);
      setShowEditModal(true);
    } else {
      alert("User not found.");
    }
  };

  const handleEditUser = (updatedData) => {
    const updatedUsers = users.map((user) =>
      user.email === updatedData.email ? { ...user, ...updatedData } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setShowEditModal(false);
    alert("User details updated successfully!");
  };

  const getFilteredUserData = (user) => {
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      city: user.city,
      street: user.street,
      number: user.number,
      email: user.email,
    };
  };

  return (
    <div className="container mt-5">
      <h3 className="pad">ניהול המשתמשים במערכת</h3>

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
              user.email === "admin@gmail.com" ? null : (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.birthDate}</td>
                  <td>{user.city}, {user.street} {user.number}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(user.email)}
                    >
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
              )
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                לא נמצאו משתמשים
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* EditDetails Modal */}
      {showEditModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">עדכון פרטי משתמש</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                />
              </div>
              <div className="modal-body">
                <EditDetails
                  userData={getFilteredUserData(editUserData)}
                  editUser={handleEditUser}
                  mode={0}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;

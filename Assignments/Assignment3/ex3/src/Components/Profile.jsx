import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "./SystemAdmin";
import EditDetails from "./EditDetails";

function Profile(props) {
  const [profileData, setProfileData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [refresh, setRefresh] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem("currentUser");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }
  }, [refresh]); 

  const logoutUser = () => {
    const confirmation = window.confirm("האם אתה בטוח שברצונך להתנתק?");
    if (confirmation) {
      sessionStorage.removeItem("currentUser");
      setProfileData(null);
      navigate("/login");
    }
  };

  const handlePasswordCheck = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === profileData.email);
    if (user) {
      if (user.password !== enteredPassword || enteredPassword === " ") {
        setPasswordError("סיסמה שגויה. אנא נסה שוב.");
      } else {
        setShowPasswordModal(false); 
        setShowEditModal(true); 
        setPasswordError(""); 
      }
    } else {
      setPasswordError("המשתמש לא נמצא. אנא נסה שוב.");
    }
  };

  
  const handleEditUser = (updatedData, counter) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === updatedData.email);
    if (counter) {
      if (updatedData.password.trim() === "") {
        updatedData.password = user.password; 
      } else if (user.password === updatedData.password) {
        alert("אנא בחר סיסמה שונה מהסיסמה הנוכחית.");
        return;
      }
    }
  

    const updatedUsers = users.map((user) =>
      user.email === updatedData.email ? { ...user, ...updatedData } : user
    );
  
   
    updatedUsers.forEach((user) => {
      delete user.confirmPassword;
    });
  
   
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    sessionStorage.setItem("currentUser", JSON.stringify(updatedData));
  
   
    setProfileData(updatedData);
  
    
    setShowEditModal(false);
    setRefresh(!refresh);
  
    if (counter === 1) {
      alert("הסיסמה עודכנה בהצלחה!");
    } else {
      alert("הפרטים עודכנו בהצלחה!");
    }
  };
  
  
  const styles = {
    avatar: {
      borderRadius: "50%",
      width: "100px",
      height: "100px",
    },
    marg: {
      marginBottom: "10px",
      width: "200px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };

  if (!profileData) {
    return <p>יש להתחבר למערכת</p>;
  }

  return (
    <>
      <div>
        <div>
          <img
            src={profileData.image}
            alt="Profile Avatar"
            style={styles.avatar}
          />
        </div>

        <h5>{`${profileData.firstName} ${profileData.lastName}`}</h5>
        <p>{profileData.email} 📧</p>
        <p>{`${profileData.street} ${profileData.number}, ${profileData.city}`}📍</p>
        <p>{profileData.birthDate} 🎂</p>
      </div>

      <button
        style={styles.marg}
        className="btn btn-primary"
        onClick={() =>
          window.open("https://www.friv.com/z/games/bloxorz/game.html", "_blank")
        }
      >
        למשחק
      </button>
      <button
        style={styles.marg}
        className="btn btn-secondary"
        onClick={() => setShowPasswordModal(true)}
      >
        עדכון פרטים
      </button>
      <button
        style={styles.marg}
        className="btn btn-danger"
        onClick={logoutUser}
      >
        התנתק
      </button>

      {profileData.username === "admin" && <UserTable />}

      {showPasswordModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">אמת סיסמה</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPasswordModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>הכנס את הסיסמה הנוכחית שלך כדי להמשיך:</p>
                <input
                  type="password"
                  className="form-control"
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPasswordModal(false)}
                >
                  ביטול
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePasswordCheck}
                >
                  אמת
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <EditDetails userData={profileData} editUser={handleEditUser} mode={1}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
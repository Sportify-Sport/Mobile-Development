import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from './SystemAdmin';

function Profile(props) {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem("currentUser");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }
  }, []);

  const logoutUser = () => {
    const confirmation = window.confirm("Are you sure you want to log out?");
    if (confirmation) {
      sessionStorage.removeItem("currentUser");
      setProfileData(null);
      navigate("/login");
    }
  };  

  const handleGameRedirect = () => {
    window.open("https://www.friv.com/z/games/bloxorz/game.html", "_blank");
  };

  const styles = {
    avatar: {
      borderRadius: "50%",
      width: "100px",
      height: "100px",
    },
    card: {
      direction: "rtl",
    },
    marg: {
      marginBottom: "10px"
    }
  };
  
  if (!profileData) {
    return <p>יש להתחבר למערכת</p>
  }


  // const editUser = () => {
  //   return 
  // }
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

      <button style={styles.marg} className="btn btn-primary" onClick={handleGameRedirect}>
        למשחק
      </button>
      <button style={styles.marg} className="btn btn-secondary">עדכון פרטים</button>
      <button style={styles.marg} className="btn btn-danger" onClick={logoutUser}>
        התנתק
      </button>

      {profileData.username === "admin" && <UserTable />}
    </>
  );
}

export default Profile;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  // const [profileData, setProfileData] = useState({
  //   birthDate: "2024-12-11",
  //   city: "Kafr Qara",
  //   email: "u12@gmail.com",
  //   firstName: "Alaa",
  //   image: "imageURL_or_placeholder",
  //   lastName: "Ada",
  //   number: "103",
  //   password: "hashedPassword",
  //   street: "ח",
  //   username: "ad5",
  // });

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
    return <p>יש להתחבר למערכת</p>;
  }

  return (
    <>
      <div>
        <div>
          <img
            src="https://via.placeholder.com/100"
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
    </>
  );
}

export default Profile;

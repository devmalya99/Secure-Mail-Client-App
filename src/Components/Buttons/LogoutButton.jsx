import {  signOut } from "firebase/auth";
import { useAuth } from "../../AuthContext/AuthContext";
import { FirebaseAuthentication } from "../../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";



const LogoutButton = () => {
  const navigate = useNavigate();
  const {setIsLoggedIn} = useAuth();



 
  const handleLogOut = async () => {
    try {
      await signOut(FirebaseAuthentication);
      setIsLoggedIn(false);
      alert("Logout Successful");
      navigate("/login");
     
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <button
      className="ml-4 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded" 
      onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default LogoutButton;

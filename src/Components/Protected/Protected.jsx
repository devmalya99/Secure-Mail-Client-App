import { useNavigate } from "react-router-dom"
import {useAuth} from "../../AuthContext/AuthContext";
import WarningPage from "../Warning"


const Protected = ({children }) => {
    
    const {isLoggedIn , loading} = useAuth();
    const navigate = useNavigate();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
      return <WarningPage />;
    }
  

  return children;
}

export default Protected
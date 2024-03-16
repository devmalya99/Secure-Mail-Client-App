import { createContext, useContext , useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuthentication } from "../Firebase/FirebaseConfig"; 
// Creating your context
const AuthContext = createContext();

// A custom hook that could be used to access auth context easily
export const useAuth = ()=> useContext(AuthContext);

// Your context provider
export const AuthProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [ loading, setLoading] = useState(true);

   useEffect(()=>{
      
       const unsubscribe = onAuthStateChanged(FirebaseAuthentication, (user)=>{
           setIsLoggedIn(!!user);
           setLoading(false);
       })

       return () => unsubscribe();
   },[])


return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {!loading && children}
    </AuthContext.Provider>
)
}


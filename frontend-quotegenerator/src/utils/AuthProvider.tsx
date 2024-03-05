// import ACCESS_TOKEN_NAME from '../constants/apiConstants'
// import {Route, Link} from 'react-router-dom'
// import { createContext, useContext, useEffect, useMemo, useState } from 'react';
// import axios from 'axios';

// //https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

// const AuthContext = createContext();
// const AuthProvider = ({children}) => {

//     const [token, setToken] = useState(localStorage.get("token"));

//     useEffect(() => {
//       if (token) {
//         axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//         localStorage.setItem("token", token);
//       } else {
//         delete axios.defaults.headers.common["Authorization"];
//         localStorage.removeItem("token");
//       }
//     }, [token]);


//     const contextValue = useMemo(
//       () => ({
//         token,
//         setToken,
//       }),
//       [token]
//     );

//       return (
//         <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//       )
// }

// export const useAuth = () => {
//     return useContext(AuthContext);
// }

// export default AuthProvider;
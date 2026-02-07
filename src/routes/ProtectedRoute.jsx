import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "../pages/Login";

export default function ProtectedRoute({ children }){
  const { state } = useContext(AuthContext);

  if(state.loading){
    return <p>Loading....</p>
  }

  if(!state.isAuthenticated){
    return <Navigate to="/login" />
  }

  if(state.user.role !== "admin"){
    return <Navigate to="/"/>
  }



  return children;
}
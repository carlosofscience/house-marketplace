import { Navigate, Outlet } from "react-router-dom"
import { UseAuthStatus } from "../Hooks/UseAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {

  const { loggedIn, checkingStatus } = UseAuthStatus();

  console.log("loggedIn", loggedIn);
  console.log("checkingStatus", checkingStatus);
  
  if(checkingStatus){
    return <Spinner />
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in"/>
}

export default PrivateRoute
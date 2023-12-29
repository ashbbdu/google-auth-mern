import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
  
    if (token !== null)
      return (
            <div className="w-100">
              {children}
            </div>
        
      )
    else return <Navigate to="/" />;
  };
  
  export default PrivateRoute;
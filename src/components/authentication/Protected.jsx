import { Context } from '../../App';
import { useContext } from 'react';
import { Navigate } from "react-router-dom";

const Protected = ({ifLoggedIn, children}) => {
    const { isLoggedIn } = useContext(Context);
    
    if(isLoggedIn === ifLoggedIn){
        return children;
    }

    if(ifLoggedIn){
        return <Navigate to="sign-up" replace />;
    } else {
        return <Navigate to="" replace />;
    }
}
 
export default Protected;
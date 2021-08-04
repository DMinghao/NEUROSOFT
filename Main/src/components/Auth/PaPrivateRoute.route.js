import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from "../../context/UserContext";

const PaPrivateRoute = ({component: Component, ...rest}) => {
    const { userData} = useContext(UserContext);
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            (typeof userData.user !== "undefined" && userData.user.userType === "patient") ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PaPrivateRoute;
import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false
});

console.log(AuthContext.Consumer.isLoggedIn);
export default AuthContext;
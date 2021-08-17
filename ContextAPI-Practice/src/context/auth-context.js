import React,{useState,useEffect} from 'react';
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: ()=>{},
    onLogin: ()=>{}
})
export const AuthContextProvider = (props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(()=>{
        const storeUserLoginInformation = localStorage.getItem('isLoggedIn')
        if(storeUserLoginInformation === '1'){
          setIsLoggedIn(true)
        }
      },[])
    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', 1);
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        setIsLoggedIn(true);
      };
    
      const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
      };
    return <AuthContextProvider value = {{isLoggedIn:isLoggedIn, onLogout:logoutHandler,onLogin:loginHandler}}>{props.children}</AuthContextProvider>
}
export default AuthContext 
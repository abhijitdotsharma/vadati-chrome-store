//create context
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({isLoggedIn: false})


/*
#################################################################

# useLocalStorage defaultValue is set to 'false' on <App/> load

# It is set to user-typed string afterwards, and checked as (isLoggedIn != false)

# Might lead to bugs later

##################################################################
*/

function updateLocalStorage(property, updatedData){
    //takes old localStorage object and sets updated object
    const user = {
        ...JSON.parse(localStorage.getItem('vadati')),
        isLoggedIn: true,
        [property]: updatedData,
    }

    localStorage.setItem('vadati', JSON.stringify(user))
}

const useLocalStorage = (key, defaultObject) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const localStorageValue = localStorage.getItem(key);
            if(localStorageValue){
                return JSON.parse(localStorageValue)
            }else{
                localStorage.setItem(key, JSON.stringify(defaultObject))
                return defaultObject
            }
        } catch (error) {
            return defaultObject;
        }
    });

    //setUser - sets isLoggedIn to true and userName 
    const setValue = (property, newValue) => {

        try {
            updateLocalStorage(property, newValue)
            setStoredValue(prev => ({...prev, isLoggedIn: true, [property]: newValue}))            
        } catch (error) {}
    };
    
    return [storedValue, setValue]
}


//provide context
const AuthProvider = ({children}) => {
    

    const [user, setUser] = useLocalStorage('vadati', {isLoggedIn: false})

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
//use context

const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}
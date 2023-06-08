import React, {createContext, useState} from "react";

export const AuthContext = createContext({})

const ContextProvider = ({children}) => {

    const [inputValue, setInputValue] = useState("")

    const finalValue = (input) => {
        setInputValue(input)
    } 

    return(
        <AuthContext.Provider value={{finalValue, inputValue}}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider
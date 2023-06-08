import React, {createContext, useState} from "react";

export const AuthContext = createContext({})

const ContextProvider = ({children}) => {

    const [inputValue, setInputValue] = useState("")
    const finalValue = (input) => {
        setInputValue(input)
    }
    
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const persistStartTime = (input) => {
        setStartTime(input)
    }
    const persistEndTime = (input) => {
        setEndTime(input)
    }

    return(
        <AuthContext.Provider value={{finalValue, inputValue, startTime, persistStartTime, endTime, persistEndTime }}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider
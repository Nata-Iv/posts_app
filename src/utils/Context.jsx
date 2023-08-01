import { createContext, useState } from "react";

export const CustomContext = createContext()

export const Context = (props) => {
    // const [user, setUser] = useState({
    //     email: ''
    // })
    const value = {
        name: 'Maks',
        age: 23
    }
    
    return <CustomContext.Provider value={value}>
        
      {props.children}
    </CustomContext.Provider>
}

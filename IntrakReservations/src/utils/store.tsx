import React, {createContext, useReducer} from 'react'
import { InitialStateType, User } from './interfaces';
import Reducer from './reducer'
import jwt_decode from 'jwt-decode'



const get_token = () =>{
    let token = localStorage.getItem('token');
   
    
    if(token){
        const decoded = jwt_decode<User>(token);
        
        if(decoded.exp < Math.round(Date.now()/1000)){
            localStorage.removeItem('token')
            return null
        }else{
            return token;
        }

    }
   return null;
}




const initial_state:InitialStateType = {
    user_id: localStorage.getItem('user_id'),
    locale: 'sk',
    token: get_token(),
}


const Store : React.FC = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initial_state);

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

const Context = createContext<{state: InitialStateType; dispatch:React.Dispatch<any>}>({state:initial_state, dispatch: ()=>null});
export {Store, Context};
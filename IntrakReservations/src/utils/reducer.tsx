import { Actions, InitialStateType, Types, User } from "./interfaces";
import jwt_decode from 'jwt-decode'

const Reducer = (state:InitialStateType, action: Actions) =>{
    switch(action.type){
        case Types.Login:
            {
                localStorage.setItem('token', action.payload)
                let decoded_token = jwt_decode<User>(action.payload);
                localStorage.setItem('user_id', decoded_token.identity)
                
                return {
                    ...state,
                    token: action.payload,
                    user_id: decoded_token.identity
                }
            }
            
        case Types.SetLocale:
            return{
                ...state,
                locale: action.payload
            }
        case Types.Logout:
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')

            return{
                ...state,
                token: null,
                user_id: null
            }
    }
}


export default Reducer;
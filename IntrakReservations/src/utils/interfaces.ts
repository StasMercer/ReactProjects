


export interface Strings {
    [key: string]: string | JSX.Element

}
export type room_types = 'laundry' | 'relax' | 'study_room' | 'drying'
export type names =  'info' | 'account' | 'reserve' | 'drying_info' | 'main_info' | 'start_time' | 'end_time' | 'logout' | 'no_reservations' | room_types | result_ids

export type room = {
    id: number;
    room_type: room_types;
    room_number: number;
    floor: number;
    building: string;
    dormitory: string;
    reservation_type: 'instant_reservation' | 'in-day-reservation' | 'not_required',
    start: string;
    end: string;
    description: string;
}
export type reserveState = 'reserved' | 'error' | 'not_reserved' | 'deleted'
export type result_ids = 'reservation_ok' | 'err_reservation_pending' | 'err_reservation_overlap' | "err_reservation_start_end" | "err_reservation_future"
export type reservation_response = {
    result: string,
    reservation_id?:number,
    result_id : result_ids
}
export type RoomReservation = {
    
    id: number,
    start: number,
    end: number,
    user: {
            id: string,
            firstname: string,
            lastname: string,
            building: string,
            room: string
           
        } | '_User_not_found'
    
}
export type User = {
    exp: number,
    iat: number,
    nbf: number,
    identity: string
}

export type InitialStateType = {
    locale: 'en' | 'sk',
    token: string | null,
    user_id: string | null
}

export enum Types{
    Login = 'LOGIN',
    SetLocale = 'SET_LOCALE',
    Logout = 'LOGOUT'
}

export type Payload = {
    [Types.Login]: string;
    [Types.SetLocale]: 'en' | 'sk';
    [Types.Logout]: null;
}

export type LoginResponse = {
    access_token: string
}

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        }
  };


  export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
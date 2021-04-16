import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {Breadcrumb, Skeleton} from "antd";
import { Context } from "../utils/store";
import { get_string } from "../i18n/strings";
import { room } from "../utils/interfaces";
import Axios from "axios";
import InDayRezervation from "./InDayReservation";
import InstantRezervation from "./InstantReservation";
import { apiUrl } from "../utils/config";

export default function Room() {
    const {state, dispatch} = useContext(Context)
   
    let {room_id} = useParams<{room_id:string}>();
    const [room, setRoom] = useState<room | null>(null);

    useEffect(()=>{
        Axios.get<room>(`${apiUrl}/room/${room_id}`, {
            headers: {
              'Authorization': `JWT ${state.token}`
            }
          })
          .then(res=>{
            //   console.log(res);
              
              setRoom(res.data)
          })
          .catch(e=>{
              console.log(e.response.data);
          })
    }, [room_id])

    if(room === null){
        return <Skeleton loading />
    }

    return (
        <>
            <Breadcrumb style={{margin: "16px 0"}}>
                <Breadcrumb.Item></Breadcrumb.Item>
                <Breadcrumb.Item>
                    {room && get_string(state.locale, room.room_type)}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {room?.building + "/" + room?.room_number}
                </Breadcrumb.Item>
            </Breadcrumb>

            <div
                className="site-layout-background"
            >
                {(room && room.reservation_type === 'in-day-reservation') && <InDayRezervation room={room}/>}
                {(room && room.reservation_type === 'instant_reservation') && <InstantRezervation />}
                
            </div>
        </>
    );
}

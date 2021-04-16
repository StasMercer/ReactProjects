import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Calendar, message, Select, Skeleton, Space, Tag, Timeline } from "antd";
import { reservation_response, reserveState, room, RoomReservation } from "../utils/interfaces";
import moment, { Moment } from "moment";
import { get_string } from "../i18n/strings";
import { Context } from "../utils/store";
import Axios from "axios";
import { apiUrl } from "../utils/config";
import {DeleteOutlined} from '@ant-design/icons'
const { Option } = Select;
interface Props {
  room: room
}

export default function InDayReservation({ room }: Props) {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<Moment>(moment())
  const [reserveState, setReserveState] = useState<reserveState>('not_reserved'); //just trigger to refetch reservations
  const { state } = useContext(Context)
  const [reservationList, setReservationList] = useState<RoomReservation[]>();
  const times = [
    "06:00",
    "06:30",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];



  // get reservations for room.id when id or pickedDate or reserveStatus changed
  useEffect(() => {
    
    
    if (room.start === 'None') {
      room.start = '06:00:00'
    } else if (room.end === 'None') {
      room.end = '22:00:00'
    }
    let pickedDateCopy = moment(pickedDate);
    
    pickedDateCopy.set({hour: 22, minute: 0, second: 0}).unix();
    
    let start = moment(room.start, "H:m:s").toDate();
    let unixStartTime = pickedDateCopy.set({hour: start.getHours(), minutes: start.getMinutes(), second: start.getSeconds()}).unix();
    
    let end = moment(room.end, "H:m:s").toDate();
    let unixEndTime = pickedDateCopy.set({hour: end.getHours(), minutes: end.getMinutes(), second: end.getSeconds()}).unix();

    // debug
    //start = moment('01/08/2020', 'D/M/YYYY').unix();
    Axios.get<RoomReservation[]>(`${apiUrl}/reservation/find/?roomid=${room.id}&start=${unixStartTime}&end=${unixEndTime}`, {
      headers: {
        'Authorization': `JWT ${state.token}`
      }
    })
      .then(res => {
        console.log(res.data);
        
        
        setReservationList(res.data)
      })
      .catch(e => {
        console.log(e.response);
      })
  }, [room.id, pickedDate, reserveState])



  // smart time change machine
  useEffect(() => {

    let currentTime = moment().format("H");
    let currentMins = moment().format("m");

    currentTime = Number(currentTime) < 6 ? "12" : currentTime;
    currentTime = Number(currentTime) > 21 ? "7" : currentTime;

    let currentEndTime =
      Number(currentTime) < 20 ? Number(currentTime) + 2 + "" : "22";

    if (Number(currentMins) < 10) {
      currentMins = "00";
    } else if (Number(currentMins) > 40) {
      currentMins = "00";
      currentTime = Number(currentTime) + 1 + "";
      currentEndTime = Number(currentEndTime) + 1 + '';
    } else {
      currentMins = "30";
    }
    setStartTime(currentTime + ":" + currentMins);
    setEndTime(
      currentEndTime === "22" ? "22:00" : currentEndTime + ":" + currentMins
    );
  }, []);

  const [startTimes, setStartTimes] = useState<string[]>(times);
  const [endTimes, setEndTimes] = useState<string[]>(times);

  const handleStartChange = (value: string) => {
    setStartTime(value);
    setEndTime("");
    const startNum = Number(value.split(":")[0]);

    let newEndTimes: string[] = [];

    times.forEach((time) => {
      const endNum = Number(time.split(":")[0]);

      if (endNum >= startNum && endNum < startNum + 5) {
        newEndTimes.push(time);
      }
    });

    setEndTimes(newEndTimes);
  };

  

  const handleEndChange = (value: string) => {
    setEndTime(value);
  };

  const handleDelete = (reservationId: number) =>{
    Axios.delete(`${apiUrl}/reservation/${reservationId}`, {
      headers:{ 'Authorization': `JWT ${state.token}`}
    })
    .then(res =>{
      message.success(res.data.result);
      setReserveState('deleted');
    })
    .catch(e =>{
      message.error(e.response.data.result);
    })
  }

  const handleReserve = () =>{
    let start = moment(startTime, 'H:mm');
    start.set({date:pickedDate.date(), month: pickedDate.month(), year: pickedDate.year()})
    
    let end = moment(endTime, 'H:mm');
    end.set({date:pickedDate.date(), month: pickedDate.month(), year: pickedDate.year()});
    
    
    
    Axios.post< reservation_response>(`${apiUrl}/reservation/1`,{
      roomid: room.id,
      start: start.unix(),
      end: end.unix()
    }, {
      headers: {
        'Authorization': `JWT ${state.token}`
      }
    })
    .then(res => {
      if(res.data.result_id === "reservation_ok"){
        message.success(get_string(state.locale, res.data.result_id))
        setReserveState('reserved');
      } 

    })
    .catch(e => {
      console.log(e.response.data);
      
      message.error(get_string(state.locale, e.response.data.result_id))
      setReserveState('error');
    });
  }

  // get reservation status by checking its end time with current time
  const getStatus = (el: RoomReservation): 'processing'|'success'|'default' => {
    let time = moment().unix();
    if (time > el.start && time < el.end) {
      return 'processing';
    }
    if (time > el.end) {
      return 'success';
    }
    if (time < el.start) {
      return 'default';
    }
    return 'default'
  }

  if (reservationList === undefined) {
    return <Skeleton loading />
  }

  return (
    <>
      <div className="site-calendar-demo-card">
        <div className="site-calendar-card">
          <Calendar onChange={setPickedDate} fullscreen={false} />
        </div>
      </div>

      <div className="current-rezervations">
        {reservationList.length > 0 ?
          (<Timeline>
            {reservationList.map((el) => (
              <Timeline.Item key={el.id}>
                {el.user !== '_User_not_found' ? el.user.firstname + " " + el.user.lastname + " " : 'User not found '}
                <Tag color={getStatus(el)}>{moment(el.start, 'X').format('H:mm')} {moment(el.end, 'X').format('H:mm')}</Tag>
                {getStatus(el) == 'default' &&
                  el.user !== '_User_not_found' &&
                  state.user_id === el.user.id &&
                  <Button danger type='link' onClick={e => handleDelete(el.id)} icon={<DeleteOutlined />} />}
              </Timeline.Item>
            )
            )}
          </Timeline>)
          : (<Alert message={get_string(state.locale, 'no_reservations')} type="info" />)}

      </div>
      <div className="time-select">
        <div className="time-strings">
          <h4>{get_string(state.locale, "start_time")}</h4>
          <h4>{get_string(state.locale, "end_time")}</h4>
        </div>
        <Space className="mb-10px">
          <Select
            placeholder={get_string(state.locale, "start_time")}
            style={{ width: 120 }}
            onChange={handleStartChange}
            value={startTime}
          >
            {startTimes.map((time) => {
              return (
                <Option key={time} value={time}>
                  {time}
                </Option>
              );
            })}
          </Select>
          <Select
            placeholder={get_string(state.locale, "end_time")}
            style={{ width: 120 }}
            value={endTime}
            onChange={handleEndChange}
          >
            {endTimes.map((time) => {
              return (
                <Option key={time} value={time}>
                  {time}
                </Option>
              );
            })}
          </Select>
        </Space>

        <Button disabled={pickedDate.unix() + 3600 < moment().unix()} onClick={handleReserve} type={"primary"} block style={{ marginBottom: 10 }}>
          {get_string(state.locale, "reserve")}
        </Button>
      </div>
    </>
  );
}

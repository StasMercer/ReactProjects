import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { names, room, room_types } from '../utils/interfaces'
import { createFromIconfontCN } from "@ant-design/icons";
import { MenuInfo } from "rc-menu/es/interface";

import { get_string } from "../i18n/strings";
import { Context } from '../utils/store'
import Axios from 'axios'
import { apiUrl } from '../utils/config'
//"//at.alicdn.com/t/font_2048462_v6toccuwxgs.js"

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2048462_iaxq4awi9.js",
});



export default function SiderMenu(props: {
  closeMenu: (visible: boolean) => void;
  menuType: 'drawer' | 'sider'
}) {

  const { state } = useContext(Context);
  const [roomTypes, setRoomTypes] = useState<room_types[]>([])
  const [rooms, setRooms] = useState<room[]>()

  const onClick = (e: MenuInfo) => {
    if (props.menuType === 'drawer') {
      props.closeMenu(false)
    }
  }


  useEffect(() => {
    Axios.get<room[]>(`${apiUrl}/rooms`, {
      headers: {
        'Authorization': `JWT ${state.token}`
      }
    })
      .then((res) => {
        const rooms = res.data
        let room_types: room_types[] = [];
        rooms.map((room) => {
          if (!room_types.includes(room.room_type) && room.reservation_type !== 'not_required') {
            room_types.push(room.room_type);
          }
        })
        setRooms(rooms)
        setRoomTypes(room_types)

      })
      .catch((e) => {
        console.log(e.response);

      })
  }, [])

  return (
    <Menu onClick={onClick} mode={"inline"} theme={'dark'} selectable={true}>
      <Menu.Item
        key="info"
        icon={<IconFont type="icon-info1" style={{ fontSize: "22px" }} />}
      >
        <Link to="/">{get_string(state.locale, "info")}</Link>

      </Menu.Item>

      {roomTypes && (
        roomTypes.map((type: names, index) => (
          <SubMenu
            key={index + ''}
            style={{ paddingLeft: 0 }}
            icon={<IconFont
              style={{ fontSize: "23px" }}
              type={`icon-${type}`}
            />}
            title={get_string(state.locale, type)}
          >
            {rooms && rooms.map((room, index) => {
              if (room.room_type === type) {
                return <Menu.Item key={index+room.room_number}>
                    <Link to={`/room/${room.id}`}>{`${room.building}/${room.room_number}`}</Link>
                  </Menu.Item>
              }
            }
            )}
          </SubMenu>
        ))
      )}

    </Menu>
  )
}

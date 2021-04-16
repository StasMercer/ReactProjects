import { Layout, Space, Button, Drawer, Breadcrumb, Dropdown, Menu } from "antd";
import { createFromIconfontCN, ExportOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { get_string } from "../i18n/strings";
import { MenuOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { Switch, Route } from "react-router-dom";
import SiderMenu from "./SiderMenu";
import { Context } from "../utils/store";
import { Types } from "../utils/interfaces";
import Room from "./Room";
// import logo from '../assets/logo.png'

const { Header, Sider, Content, Footer } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2048462_v6toccuwxgs.js",
});


const Main = () => {
  const { state, dispatch } = useContext(Context)
  const [collapsed, setCollapsed] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    dispatch({ type: Types.Logout, payload: null})
  }
  

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isDesktopOrLaptop && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <SiderMenu menuType={'sider'} closeMenu={onCollapse} />
        </Sider>
      )}

      <Layout className="site-layout">
        <Header className="header-style">
          <span className="logo">IRS</span>
          {/* <Image src={logo} className='logo'/> */}
          <div>
            <Space>
              <Button
                icon={<IconFont type={"icon-translate"} />}
                onClick={() => {
                  dispatch({ type: Types.SetLocale, payload: state.locale === 'en' ? 'sk' : 'en' })
                }}
              >
                {state.locale === "sk" ? "en" : "sk"}
              </Button>

             
                <Button
                  icon={<ExportOutlined />}
                  onClick={handleLogout}
                >
                  {get_string(state.locale, "logout")}
                </Button>
              



              {!isDesktopOrLaptop && (
                <Button
                  onClick={showDrawer}
                  icon={<MenuOutlined />}
                />
              )}
            </Space>
          </div>
        </Header>
        <Content style={{ margin: "0 10px" }}>
          <Switch>
            <Route path="/room/:room_id">
              <Room />
            </Route>
            
            <Route path={`/`}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>{get_string(state.locale, 'info')}</Breadcrumb.Item>
              </Breadcrumb>

              {get_string(state.locale, "main_info")}

            </Route>

            <Route path="/*">nothing found</Route>
          </Switch>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Reservation systems ©2020 Created by mercer
        </Footer>
      </Layout>
      {!isDesktopOrLaptop && (
        <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          width={200}
          bodyStyle={{ padding: '0', background: '#001529' }}
        >
          <SiderMenu menuType={'drawer'} closeMenu={setVisible} />
        </Drawer>
      )}
    </Layout>
  );
};

export { Main };

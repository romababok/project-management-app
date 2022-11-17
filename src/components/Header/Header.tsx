import React, { useState } from "react";
import { Header } from "antd/lib/layout/layout";
import { Menu, Button, Drawer, Switch, Typography, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { HomeOutlined, KeyOutlined, LogoutOutlined, MenuOutlined, PlusCircleOutlined, PushpinOutlined, ToolOutlined, UserOutlined } from "@ant-design/icons";
import './Header.scss';

const { Text } = Typography;

const HeaderOfApp = () => {
    const location = useLocation();
    const token = useAppSelector((state) => state.auth.userData?.token);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };
    const onChange = (checked: boolean) => {
      console.log(`switch to ${checked}`);
    };
    
    return (
      <Header>
        <Link className="logo__link" to="/"><div className="logo" /></Link>
        <Button id="menuBtn" type="primary" shape="circle" icon={<MenuOutlined style={{fontSize: "18px"}}/>} onClick={showDrawer}></Button>
        <Drawer width={"320px"} placement="right"  onClose={onClose} open={open}>
          <div className="drawer__contant">
            <Link to="/" onClick={onClose} id="drawer__link"><HomeOutlined  id="link__icon"/>Welcome</Link>
            {!token ? (
              <>
              <Link to="/login" onClick={onClose} id="drawer__link"><KeyOutlined id="link__icon"/> Login</Link>
              <Link to="/registration" onClick={onClose} id="drawer__link"><PlusCircleOutlined id="link__icon"/>Sign up</Link>
              </>
            ) : (
              <>
              <Link to="/boards" onClick={onClose} id="drawer__link"><PushpinOutlined id="link__icon"/> Board</Link>
              <Link to="/boards" onClick={onClose} id="drawer__link"><ToolOutlined id="link__icon"/> Edit profile</Link>
              <Link to="/welcome" onClick={onClose} id="drawer__link"><LogoutOutlined id="link__icon"/>Logout</Link>
              </>
            )}
            
          </div>
      </Drawer>

        <Menu theme="dark" mode="horizontal" id="header__menu" selectedKeys={[location.pathname]} style={{fontSize: '18px'}}>
          <Menu.Item key="/">
            <Link to="/">Welcome</Link>
          </Menu.Item>
          {token && (
            <Menu.Item key="/boards">
              <Link to="/boards">Boards</Link>
            </Menu.Item>
          )}
          {!token ? (
            <>
              <Menu.Item style={{ marginLeft: "auto" }} key="/login">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="/registration">
                <Link to="/registration">Sing Up</Link>
              </Menu.Item>
            </>
          ) : (
            <Menu.SubMenu
              key="/user"
              title={<UserOutlined style={{ fontSize: "16px" }} />}
              style={{ marginLeft: "auto" }}
            >
              <Menu.Item style={{ marginLeft: "auto" }} key="/profile">
                <Link to="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item key="/logout">
                <Link to="/welcome">Logout</Link>
              </Menu.Item>
            </Menu.SubMenu>
          )}
        </Menu>
        <div className={token ? "language__blockToken" : "language__block"}>
          <Space>
            <Text id="language">En</Text>
            <Switch id="switcher" defaultChecked onChange={onChange} />
            <Text id="language">Ru</Text>
          </Space>
        </div>
      </Header>
    );
}

export default HeaderOfApp;
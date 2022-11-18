import React, { useState } from "react";
import { Header } from "antd/lib/layout/layout";
import { Menu, Button, Drawer, Switch, Typography, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { HomeOutlined, KeyOutlined, LogoutOutlined, MenuOutlined, PlusCircleOutlined, PushpinOutlined, ToolOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./header.module.scss";

const { Text } = Typography;

const HeaderOfApp = () => {
    const location = useLocation();
    const token = useAppSelector((state) => state.auth.userData?.token);

    const [open, setOpen] = useState<boolean>(false);

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
        <Link className={styles.logo__link} to="/"><div className={styles.main__logo} /></Link>
        <Button className={styles.menu__btn} type="primary" shape="circle" icon={<MenuOutlined className={styles.menu__icon} style={{fontSize: "18px"}}/>} onClick={showDrawer}></Button>
        <Drawer width={"320px"} placement="right"  onClose={onClose} open={open}>
          <div className={styles.drawer__contant}>
            <Link to="/" onClick={onClose} className={styles.drawer__link}><HomeOutlined  className={styles.link__icon}/>Welcome</Link>
            {!token ? (
              <>
              <Link to="/login" onClick={onClose} className={styles.drawer__link}><KeyOutlined className={styles.link__icon}/> Login</Link>
              <Link to="/registration" onClick={onClose} className={styles.drawer__link}><PlusCircleOutlined className={styles.link__icon}/>Sign up</Link>
              </>
            ) : (
              <>
              <Link to="/boards" onClick={onClose} className={styles.drawer__link}><PushpinOutlined className={styles.link__icon}/> Board</Link>
              <Link to="/boards" onClick={onClose} className={styles.drawer__link}><ToolOutlined className={styles.link__icon}/> Edit profile</Link>
              <Link to="/welcome" onClick={onClose} className={styles.drawer__link}><LogoutOutlined className={styles.link__icon}/>Logout</Link>
              </>
            )}
            
          </div>
      </Drawer>

        <Menu theme="dark" className={styles.header__menu} mode="horizontal" selectedKeys={[location.pathname]}>
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
              title={<UserOutlined style={{ fontSize: "20px" }} />}
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
        <div className={token ? styles.language__blockToken : styles.language__block}>
          <Space>
            <Text className={styles.language}>En</Text>
            <Switch className={styles.language__switcher} defaultChecked onChange={onChange} />
            <Text className={styles.language}>Ru</Text>
          </Space>
        </div>
      </Header>
    );
}

export default HeaderOfApp;
import React, { useEffect, useState } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Menu, Button, Drawer, Switch, Typography, Space } from 'antd';
import i18n from '../../translation/i18n';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  PushpinOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styles from './header.module.scss';

const { Text } = Typography;

const HeaderOfApp = () => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.userData?.token);
  const langFromStorage = localStorage.getItem('lang');

  const [open, setOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<string>(langFromStorage ?? 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
  }, [lang]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onChange = (checked: boolean) => {
    if (!checked) {
      setLang('en');
    } else {
      setLang('ru');
    }
  };
  const { t } = useTranslation();

  return (
    <Header className={styles.header}>
      <Link className={styles.logo__link} to="/">
        <div className={styles.main__logo} />
      </Link>
      <Button
        className={styles.menu__btn}
        type="primary"
        shape="circle"
        icon={<MenuOutlined className={styles.menu__icon} style={{ fontSize: '18px' }} />}
        onClick={showDrawer}
      ></Button>
      <Drawer width={'320px'} placement="right" onClose={onClose} open={open}>
        <div className={styles.drawer__contant}>
          <Link to="/" onClick={onClose} className={styles.drawer__link}>
            <HomeOutlined className={styles.link__icon} />
            {t('Header welcome link')}
          </Link>
          {!token ? (
            <>
              <Link to="/login" onClick={onClose} className={styles.drawer__link}>
                <KeyOutlined className={styles.link__icon} /> {t('Header login link')}
              </Link>
              <Link to="/registration" onClick={onClose} className={styles.drawer__link}>
                <PlusCircleOutlined className={styles.link__icon} />
                {t('Header sign up link')}
              </Link>
            </>
          ) : (
            <>
              <Link to="/boards" onClick={onClose} className={styles.drawer__link}>
                <PushpinOutlined className={styles.link__icon} /> {t('Header board link')}
              </Link>
              <Link to="/boards" onClick={onClose} className={styles.drawer__link}>
                <ToolOutlined className={styles.link__icon} /> {t('Header edit profile link')}
              </Link>
              <Link to="/welcome" onClick={onClose} className={styles.drawer__link}>
                <LogoutOutlined className={styles.link__icon} />
                {t('Header logout link')}
              </Link>
            </>
          )}
        </div>
      </Drawer>

      <Menu
        theme="dark"
        className={styles.header__menu}
        mode="horizontal"
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/">
          <Link to="/">{t('Header welcome link')}</Link>
        </Menu.Item>
        {token && (
          <Menu.Item key="/boards">
            <Link to="/boards">{t('Header board link')}</Link>
          </Menu.Item>
        )}
        {!token ? (
          <>
            <Menu.Item className={styles.menu__login} key="/login">
              <Link to="/login">{t('Header login link')}</Link>
            </Menu.Item>
            <Menu.Item key="/registration">
              <Link to="/registration">{t('Header sign up link')}</Link>
            </Menu.Item>
          </>
        ) : (
          <Menu.SubMenu
            key="/user"
            title={<UserOutlined className={styles.menu__userIcon} />}
            className={styles.menu__user}
          >
            <Menu.Item className={styles.user__profile} key="/profile">
              <Link to="/profile">{t('Header edit profile link')}</Link>
            </Menu.Item>
            <Menu.Item key="/logout" className={styles.user__profile}>
              <Link to="/welcome">{t('Header logout link')}</Link>
            </Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
      <div className={token ? styles.language__blockToken : styles.language__block}>
        <Space>
          <Text className={styles.language}>En</Text>
          <Switch
            className={styles.language__switcher}
            defaultChecked={lang !== 'en'}
            onChange={onChange}
          />
          <Text className={styles.language}>Ru</Text>
        </Space>
      </div>
    </Header>
  );
};

export default HeaderOfApp;

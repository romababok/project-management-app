import React, { useEffect, useState } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Menu, Button, Drawer, Switch, Typography, Space, MenuProps, MenuTheme } from 'antd';
import i18n from '../../translation/i18n';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  PushpinOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styles from './header.module.scss';
import { getUserData, logOut } from '../../features/auth/auth-slice';

const { Text } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  className?: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    className,
  } as MenuItem;
}

export const HeaderOfApp: React.FC = () => {
  const location = useLocation();
  const userId = useAppSelector((state) => state.auth.userData?.id);
  const langFromStorage = localStorage.getItem('lang');

  const [open, setOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<string>(langFromStorage ?? 'en');

  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState<MenuTheme>('dark');

  const followScroll = () => {
    if (window.pageYOffset > 70) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token as string));
    }
  }, [dispatch, token]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    if (userId) {
      window.addEventListener('scroll', () => {
        followScroll();
      });
    }

    return () => {
      window.removeEventListener('scroll', () => {
        followScroll();
      });
    };
  }, [userId]);

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

  const itemsWithoutId = [
    getItem(<Link to="/">{t('Header welcome link')}</Link>, '/'),
    getItem(<Link to="/login">{t('Header login link')}</Link>, '/login', styles.menu__login),
    getItem(<Link to="/registration">{t('Header sign up link')}</Link>, '/registration'),
  ];

  const itemsWithId = [
    getItem(<Link to="/">{t('Header welcome link')}</Link>, '/'),
    getItem(<Link to="">{t('Header create new board')}</Link>, '', styles.menu__main),
    getItem(<Link to="/boards">{t('Header go to main page')}</Link>, '/boards'),
    getItem('', 'user', styles.menu__user, <UserOutlined className={styles.menu__userIcon} />, [
      getItem(
        <Link to="/profile" className={styles.user__profile}>
          {t('Header edit profile link')}
        </Link>,
        '/profile',
        styles.user__profile
      ),
      getItem(
        <Link onClick={() => dispatch(logOut())} className={styles.user__profile} to="/">
          {t('Header logout link')}
        </Link>,
        '/logout',
        styles.user__profile
      ),
    ]),
  ];

  return (
    <Header
      className={
        userId ? (theme === 'light' ? styles.sticky__white : styles.sticky__header) : styles.header
      }
      style={{ backgroundColor: theme === 'light' ? 'white' : '#001529' }}
    >
      <Link className={styles.logo__link} to="/">
        <div className={styles.main__logo} />
      </Link>
      <Button
        className={styles.menu__btn}
        type="primary"
        shape="circle"
        icon={<MenuOutlined className={styles.menu__icon} />}
        onClick={showDrawer}
      ></Button>
      <Drawer width={'320px'} placement="right" onClose={onClose} open={open}>
        <div className={styles.drawer__contant}>
          <Link to="/" onClick={onClose} className={styles.drawer__link}>
            <HomeOutlined className={styles.link__icon} />
            {t('Header welcome link')}
          </Link>
          {!userId ? (
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
              <Link to="" onClick={onClose} className={styles.drawer__link}>
                <PlusOutlined className={styles.link__icon} /> {t('Header create new board')}
              </Link>
              <Link to="/boards" onClick={onClose} className={styles.drawer__link}>
                <PushpinOutlined className={styles.link__icon} /> {t('Header go to main page')}
              </Link>
              <Link to="/profile" onClick={onClose} className={styles.drawer__link}>
                <ToolOutlined className={styles.link__icon} /> {t('Header edit profile link')}
              </Link>
              <Link
                to="/"
                onClick={() => {
                  dispatch(logOut());
                  onClose();
                }}
                className={styles.drawer__link}
              >
                <LogoutOutlined className={styles.link__icon} />
                {t('Header logout link')}
              </Link>
            </>
          )}
        </div>
      </Drawer>

      <Menu
        theme={theme}
        className={theme === 'light' ? styles.header__menu_light : styles.header__menu}
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={userId ? itemsWithId : itemsWithoutId}
      />
      <div className={userId ? styles.language__blockToken : styles.language__block}>
        <Space>
          <Text className={theme === 'dark' ? styles.language_light : styles.language}>En</Text>
          <Switch
            className={styles.language__switcher}
            defaultChecked={lang !== 'en'}
            onChange={onChange}
          />
          <Text className={theme === 'dark' ? styles.language_light : styles.language}>Ru</Text>
        </Space>
      </div>
    </Header>
  );
};

export default HeaderOfApp;

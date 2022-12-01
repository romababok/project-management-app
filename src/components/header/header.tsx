import React, { useEffect, useState } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Menu, Button, Drawer, MenuTheme, Select, Avatar } from 'antd';
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
  PushpinOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import styles from './header.module.scss';
import { getAllUsers, getUserData, logOut } from '../../features/auth/auth-slice';
import { ModalCreateBoard } from '../modal/modal';

const languages = [
  {
    value: 'en',
    label: 'EN',
    className: styles.select__option,
    style: { fontWeight: '700' },
  },
  {
    value: 'ru',
    label: 'RU',
    style: { fontWeight: '700' },
  },
  {
    value: 'by',
    label: 'BY',
    style: { fontWeight: '700' },
  },
];

export const HeaderOfApp: React.FC = () => {
  const location = useLocation();
  const userId = useAppSelector((state) => state.auth.userData?._id);
  const name = useAppSelector((state) => state.auth.userData?.name);
  const langFromStorage = localStorage.getItem('lang');

  const [open, setOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<string>(langFromStorage ?? 'English');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const isLightThemeSelected = theme === 'light';

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token as string));
      dispatch(getAllUsers());
    }
  }, [dispatch, token]);

  const followScroll = () => {
    if (window.pageYOffset > 70) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  const getLogout = () => {
    dispatch(logOut());
    onClose();
  };
  const checkHeaderStyle = () => {
    if (userId) {
      if (isLightThemeSelected) {
        return styles.sticky__white;
      }
      return styles.sticky__header;
    }
    return styles.header;
  };

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
  const handleChange = (value: string) => {
    setLang(value);
  };
  const { t } = useTranslation();

  const itemsWithoutId = [
    { label: <Link to="/">{t('Header welcome link')}</Link>, key: '/' },
    {
      label: <Link to="/login">{t('Header login link')}</Link>,
      key: '/login',
      className: styles.menu__login,
    },
    { label: <Link to="/registration">{t('Header sign up link')}</Link>, key: '/registration' },
  ];

  const itemsWithId = [
    { label: <Link to="/">{t('Header welcome link')}</Link>, key: '/' },
    {
      label: <Button onClick={() => setIsModalOpen(true)}>{t('Header create new board')}</Button>,
      key: '',
      className: styles.menu__main,
    },
    { label: <Link to="/boards">{t('Header go to main page')}</Link>, key: '/boards' },
    {
      label: <Avatar className={styles.menu__userIcon}>{name.slice(0, 1).toUpperCase()}</Avatar>,
      key: 'user',
      className: styles.menu__user,
      children: [
        {
          label: (
            <Link to="/profile" className={styles.user__profile}>
              {t('Header edit profile link')}
            </Link>
          ),
          key: '/profile',
          className: styles.user__profile,
        },
        {
          label: (
            <Link onClick={() => dispatch(logOut())} className={styles.user__profile} to="/">
              {t('Header logout link')}
            </Link>
          ),
          key: '/logout',
          className: styles.user__profile,
        },
      ],
    },
  ];

  return (
    <Header
      className={checkHeaderStyle()}
      style={{ backgroundColor: isLightThemeSelected ? 'white' : '#001529' }}
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
              <Button onClick={() => setIsModalOpen(true)}>{t('Header create new board')}</Button>
              <Link to="/boards" onClick={onClose} className={styles.drawer__link}>
                <PushpinOutlined className={styles.link__icon} /> {t('Header go to main page')}
              </Link>
              <Link to="/profile" onClick={onClose} className={styles.drawer__link}>
                <ToolOutlined className={styles.link__icon} /> {t('Header edit profile link')}
              </Link>
              <Link to="/" onClick={() => getLogout()} className={styles.drawer__link}>
                <LogoutOutlined className={styles.link__icon} />
                {t('Header logout link')}
              </Link>
            </>
          )}
        </div>
      </Drawer>

      <Menu
        theme={theme}
        className={isLightThemeSelected ? styles.header__menu_light : styles.header__menu}
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={userId ? itemsWithId : itemsWithoutId}
      />
      <Select
        defaultValue={lang}
        className={userId ? styles.language__blockToken : styles.language__block}
        onChange={handleChange}
        options={languages}
      />
      <ModalCreateBoard isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Header>
  );
};

export default HeaderOfApp;

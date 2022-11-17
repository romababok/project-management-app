import React from 'react';
import { Footer } from "antd/lib/layout/layout";
import { Typography } from 'antd';
import './Footer.scss';

const { Text, Link } = Typography;

const FooterOfApp = () => {
  return (
    <Footer id='footer'>
        <div className="footer__right">
            <a href="https://rs.school/" className='logo__link'><div className='rss-logo'></div></a>
            <Text strong>2022</Text>
        </div>
        <div className="footer__left">
            <Link href="https://github.com/olgad21" target="_blank" id="footer__link">
                Olga
            </Link>
            <Link href="https://github.com/romababok" target="_blank" id="footer__link">
                Roman
            </Link>
            <Link href="https://github.com/takeAmoment" target="_blank" id="footer__link">
                Aleksandra
            </Link>
        </div>
    </Footer>
  )
}

export default FooterOfApp;
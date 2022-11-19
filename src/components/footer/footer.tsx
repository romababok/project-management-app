import React from 'react';
import { Footer } from 'antd/lib/layout/layout';
import { Col, Row, Typography } from 'antd';
import styles from './footer.module.scss';

const { Text, Link } = Typography;

const FooterOfApp = () => {
  return (
    <div className={styles.footer__block}>
      <Footer className={styles.footer}>
        <Row
          className={styles.footer__container}
          justify={{ xs: 'center', sm: 'center', md: 'center', lg: 'space-between' }}
        >
          <Col
            xxl={{ span: 10 }}
            xl={{ span: 10 }}
            lg={{ span: 12 }}
            md={{ span: 10 }}
            sm={{ span: 24 }}
            className={styles.footer__left}
          >
            <a href="https://rs.school/" className={styles.logo__link}>
              <div className={styles.rss__logo}></div>
            </a>
            <Text strong className={styles.text}>
              2022
            </Text>
          </Col>
          <Col
            xxl={{ span: 10 }}
            xl={{ span: 10 }}
            lg={{ span: 12 }}
            md={{ span: 10 }}
            sm={{ span: 24 }}
            className={styles.footer__right}
          >
            <Link href="https://github.com/olgad21" target="_blank" className={styles.footer__link}>
              Olga
            </Link>
            <Link
              href="https://github.com/romababok"
              target="_blank"
              className={styles.footer__link}
            >
              Roman
            </Link>
            <Link
              href="https://github.com/takeAmoment"
              target="_blank"
              className={styles.footer__link}
            >
              Aleksandra
            </Link>
          </Col>
        </Row>
      </Footer>
    </div>
  );
};

export default FooterOfApp;

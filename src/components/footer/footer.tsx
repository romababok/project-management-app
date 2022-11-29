import React from 'react';
import { Footer } from 'antd/lib/layout/layout';
import { Col, Row, Typography } from 'antd';
import styles from './footer.module.scss';
import { useTranslation } from 'react-i18next';

const { Text, Link } = Typography;

const FooterOfApp: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.footer__block}>
      <Footer className={styles.footer}>
        <Row
          className={styles.footer__container}
          justify={{ xs: 'center', sm: 'center', md: 'space-between', lg: 'space-between' }}
        >
          <Col
            xxl={{ span: 10 }}
            xl={{ span: 10 }}
            lg={{ span: 10 }}
            md={{ span: 10 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
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
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className={styles.footer__right}
          >
            <Link href="https://github.com/olgad21" target="_blank" className={styles.footer__link}>
              {t('Footer the first name')}
            </Link>
            <Link
              href="https://github.com/romababok"
              target="_blank"
              className={styles.footer__link}
            >
              {t('Footer the second name')}
            </Link>
            <Link
              href="https://github.com/takeAmoment"
              target="_blank"
              className={styles.footer__link}
            >
              {t('Footer the third name')}
            </Link>
          </Col>
        </Row>
      </Footer>
    </div>
  );
};

export default FooterOfApp;

import React from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Typography } from 'antd';
import styles from './error.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

export const ErrorPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Content>
      <div className={styles.error__page}>
        <Title>{t('Error page title')}</Title>
        <Paragraph className={styles.error__text}>{t('Error page text')}</Paragraph>
        <div className={styles.error__image}>
          <div className={styles.back__button}>
            <Link to="/" className={styles.back__link}>
              {t('Error page button')}
            </Link>
          </div>
        </div>
      </div>
    </Content>
  );
};

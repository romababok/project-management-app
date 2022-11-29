import React, { Suspense } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Col, Row, Typography, Divider, Button, Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './welcome-page.module.scss';
import {
  BookOutlined,
  CoffeeOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  HeartOutlined,
  RocketOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { PageLoadingIndicator } from '../../components/page-loading';
import { Link } from 'react-router-dom';
const VideoPlayer = React.lazy(() => import('../../components/video/video-player'));

const { Paragraph, Title, Text } = Typography;

export const WelcomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.main__wrapper}>
      <Content className={styles.main__content}>
        <section className={styles.welcome__block}>
          <Row justify="start" className={styles.welcome__row}>
            <Col
              xxl={{ span: 28, offset: 4 }}
              xl={{ span: 10, offset: 1 }}
              lg={{ span: 12, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              xs={{ span: 24, offset: 0 }}
              className={styles.welcome__col}
            >
              <Title>{t('Welcome title')}</Title>
              <Paragraph className={styles.welcome__text}> {t('Welcome text')}</Paragraph>
              <div className={styles.welcome__buttons}>
                <Link to="/registration">
                  <Button size="large" className={styles.welcome__button} type="primary" ghost>
                    {t('Header sign up link')}
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="large" className={styles.welcome__button} type="primary">
                    {t('Header login link')}
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </section>
        <Divider className={styles.devider} />
        <section className={styles.advantages__section}>
          <Title level={2} className={styles.section__title}>
            {t('Advantages title')}
          </Title>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, xl: 32 }}
            className={styles.gutter}
            justify="center"
          >
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <CommentOutlined className={styles.advantage__icon} />
                <Paragraph className={styles.advantage__text}>{t('The first advantage')}</Paragraph>
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <CoffeeOutlined className={styles.advantage__icon} />
                <Paragraph className={styles.advantage__text}>
                  {t('The second advantage')}
                </Paragraph>
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <DollarCircleOutlined className={styles.advantage__icon} />
                <Paragraph className={styles.advantage__text}>{t('The third advantage')}</Paragraph>
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <SearchOutlined className={styles.advantage__icon} />
                <Paragraph className={styles.advantage__text}>
                  {t('The fourth advantage')}
                </Paragraph>
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <BookOutlined className={styles.advantage__icon} />
                <Paragraph className={styles.advantage__text}>{t('The fifth advantage')}</Paragraph>
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <RocketOutlined className={styles.advantage__icon} />
                <Paragraph className={styles.advantage__text}>{t('The sixth advantage')}</Paragraph>
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <HeartOutlined className={styles.advantage__icon} />
                <Paragraph className={styles.advantage__text}>
                  {t('The seventh advantage')}
                </Paragraph>
              </div>
            </Col>
          </Row>
        </section>
        <Divider className={styles.devider} />
        <section className={styles.team__section}>
          <Title level={2} className={styles.section__title}>
            {t('Team title')}
          </Title>
          <div className={styles.team__container}>
            <div className={styles.left__cards}>
              <div className={styles.member__card}>
                <Avatar
                  src="https://joeschmoe.io/api/v1/male/jon"
                  className={styles.member__avatar}
                />
                <div className={styles.member__content}>
                  <Title level={3} className={styles.member__name}>
                    {t('The first member name')}
                  </Title>
                  <Text strong className={styles.member__position}>
                    {t('The first member position')}
                  </Text>
                  <Paragraph className={styles.member__description}>
                    {t('The first member description')}
                  </Paragraph>
                </div>
              </div>
              <div className={styles.member__card}>
                <Avatar
                  src="https://joeschmoe.io/api/v1/male/jordan"
                  className={styles.member__avatar}
                />
                <div className={styles.member__content}>
                  <Title level={3} className={styles.member__name}>
                    {t('The second member name')}
                  </Title>
                  <Text strong className={styles.member__position}>
                    {t('The second member position')}
                  </Text>
                  <Paragraph className={styles.member__description}>
                    {t('The second member description')}
                  </Paragraph>
                </div>
              </div>
            </div>
            <div className={styles.right__cards}>
              <div className={styles.member__card}>
                <Avatar
                  src="https://joeschmoe.io/api/v1/female/jane"
                  className={styles.member__avatar}
                />
                <div className={styles.member__content}>
                  <Title level={3} className={styles.member__name}>
                    {t('The third member name')}
                  </Title>
                  <Text strong className={styles.member__position}>
                    {t('The third member position')}
                  </Text>
                  <Paragraph className={styles.member__description}>
                    {t('The third member description')}
                  </Paragraph>
                </div>
              </div>
              <div className={styles.member__card}>
                <Avatar
                  src="https://joeschmoe.io/api/v1/female/julie"
                  className={styles.member__avatar}
                />
                <div className={styles.member__content}>
                  <Title level={3} className={styles.member__name}>
                    {t('The fourth member name')}
                  </Title>
                  <Text strong className={styles.member__position}>
                    {t('The fourth member position')}
                  </Text>
                  <Paragraph className={styles.member__description}>
                    {t('The fourth member description')}
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Divider className={styles.devider} />
        <section className={styles.video__section}>
          <Title level={2} className={styles.section__title}>
            {t('Video title')}
          </Title>
          <Suspense fallback={<PageLoadingIndicator />}>
            <VideoPlayer />
          </Suspense>
        </section>
      </Content>
    </div>
  );
};

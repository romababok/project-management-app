import React from "react";
import { Content } from "antd/lib/layout/layout";
import { Col, Row,Typography, Divider, Button, Avatar } from 'antd';
import styles from './welcome-page.module.scss';
import { BankOutlined, BookOutlined, CoffeeOutlined, CommentOutlined, DollarCircleOutlined } from "@ant-design/icons";

const { Paragraph, Title, Text } = Typography;

export const WelcomePage: React.FC = () => {
  return (
    <div className={styles.main__wrapper}>
      <Content className={styles.main__content}>
        <section className={styles.welcome__block}>
          <Row justify="start" className={styles.welcome__row}>
            <Col xxl={{span: 28, offset: 4}} xl={{span: 10, offset: 1}} lg={{span: 12, offset: 0}} md={{span: 16, offset: 0}} xs={{span: 24, offset: 0}} className={styles.welcome__col}>
              <Title>Welcome to Teamber</Title>
              <Paragraph className={styles.welcome__text}>
                Teamber is a new unique application that will help you manage 
                your workflow more effective. Create tasks, work with your team and reach your goals."Coming together is the beginning. Keeping together is progress. Working together is success."
              - Henry Ford
              </Paragraph>
              <Button size="large" className={styles.welcome__button} type="primary">Let's start</Button>
            </Col>
          </Row>
        </section>
        <Divider className={styles.devider}/>
        <section className={styles.advantages__section}>
          <Title level={2} className={styles.section__title}>Our advantages</Title>
          <Row gutter={{ xs: 8, sm: 16, md: 24, xl: 32 }} justify="center">
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <CommentOutlined className={styles.advantage__icon}/>
                <Paragraph className={styles.advantage__text}>easy communication with the team</Paragraph>
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <CoffeeOutlined className={styles.advantage__icon}/>
                <Paragraph className={styles.advantage__text}>very comfortable interface</Paragraph>
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <DollarCircleOutlined className={styles.advantage__icon}/>
                <Paragraph className={styles.advantage__text}>this application is free</Paragraph> 
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <BankOutlined className={styles.advantage__icon} />
                <Paragraph className={styles.advantage__text}>very comfortable interface</Paragraph>
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <BookOutlined  className={styles.advantage__icon}/>
                <Paragraph className={styles.advantage__text}>this application is free</Paragraph> 
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <BankOutlined className={styles.advantage__icon} />
                <Paragraph className={styles.advantage__text}>very comfortable interface</Paragraph>
              </div>
            </Col>
            <Col className={styles.gutter__row}>
              <div className={styles.advantage__card}>
                <BookOutlined className={styles.advantage__icon}/>
                <Paragraph className={styles.advantage__text}>this application is free</Paragraph> 
              </div>
            </Col>
          </Row>
        </section>
        <Divider className={styles.devider}/>
        <section className={styles.team__section}>
          <Title level={2} className={styles.section__title}>Our Team</Title>
          <div className={styles.team__container}>
            <div className={styles.left__cards}>
              <div className={styles.member__card}>
                <Avatar src="https://joeschmoe.io/api/v1/male/jon" className={styles.member__avatar}/>
                <div className={styles.member__content}>
                  <Title level={3} className={styles.member__name}>Vladimir</Title>
                  <Text strong className={styles.member__position}> Mentor</Text>
                  <Paragraph className={styles.member__description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloremque, repellendus tempore illum perspiciatis dolores explicabo ipsa, eligendi aliquid commodi atque nihil labore praesentium veniam aperiam dolorem debitis voluptatibus molestiae.</Paragraph>
                </div>
              </div>
              <div className={styles.member__card}>
                <Avatar src="https://joeschmoe.io/api/v1/male/jordan" className={styles.member__avatar}/>
                <div className={styles.member__content}>
                  <Title level={3} className={styles.member__name}>Roman</Title>
                  <Text strong className={styles.member__position}> Team leader</Text>
                  <Paragraph className={styles.member__description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloremque, repellendus tempore illum perspiciatis dolores explicabo ipsa, eligendi aliquid commodi atque nihil labore praesentium veniam aperiam dolorem debitis voluptatibus molestiae.</Paragraph>
                </div>
              </div>
            </div>
            <div className={styles.right__cards}>
              <div className={styles.member__card}>
                <Avatar src="https://joeschmoe.io/api/v1/female/jane" className={styles.member__avatar} />
                <div className={styles.member__content}>
                  <Title level={3} className={styles.member__name}>Olga</Title>
                  <Text strong className={styles.member__position}> Hurt of team</Text>
                  <Paragraph  className={styles.member__description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloremque, repellendus tempore illum perspiciatis dolores explicabo ipsa, eligendi aliquid commodi atque nihil labore praesentium veniam aperiam dolorem debitis voluptatibus molestiae.</Paragraph>
                </div>
              </div>
              <div className={styles.member__card}>
                <Avatar src="https://joeschmoe.io/api/v1/female/julie" className={styles.member__avatar}/>
                <div className={styles.member__content}>
                  <Title level={3} className={styles.member__name}>Sasha</Title>
                  <Text strong className={styles.member__position}> Member</Text>
                  <Paragraph  className={styles.member__description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloremque, repellendus tempore illum perspiciatis dolores explicabo ipsa, eligendi aliquid commodi atque nihil labore praesentium veniam aperiam dolorem debitis voluptatibus molestiae.</Paragraph>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Divider className={styles.devider}/>
        <section className={styles.video__section}>
          <Title level={2} className={styles.section__title}>Video instruction</Title>
          <div className={styles.video__container}>
              <div className={styles.player}>
              </div>
          </div>
        </section>
      </Content>
    </div>
  );
};

import React from "react";
import { Content } from "antd/lib/layout/layout";
import { Col, Row,Typography, Divider, Button, Avatar } from 'antd';
import './WelcomePage.scss';
import { BankOutlined, BookOutlined, CoffeeOutlined, CommentOutlined, DollarCircleOutlined } from "@ant-design/icons";

const { Paragraph, Title, Text } = Typography;

export const WelcomePage: React.FC = () => {
  return (
    <Content style={{ padding: "0 30px", minHeight: "70vh" , backgroundColor: 'white'}}>
      <section className="welcome__block">
        <Row justify="start">
          <Col xl={{span: 10, offset: 1}} lg={{span: 12, offset: 0}} md={{span: 16, offset: 0}} xs={{span: 24, offset: 0}} id="welcome__col">
            <Title>Welcome to Teamber</Title>
            <Paragraph style={{fontSize: '24px', marginTop: '2rem'}}>
              Teamber is a new unique application that will help you manage 
              your workflow more effective. Create tasks, work with your team and reach your goals."Coming together is the beginning. Keeping together is progress. Working together is success."
            - Henry Ford
            </Paragraph>
            <Button size="large"  style={{fontSize: "18px", width: "10rem", height: "auto"}} type="primary">Let's start</Button>
          </Col>
        </Row>
      </section>
      <Divider style={{backgroundColor: '#002766'}}/>
      <section className="advantages__section">
        <Title level={2} id="section__title">Our advantages</Title>
        <Row style={{marginTop: '4rem'}} gutter={{ xs: 8, sm: 16, md: 24, xl: 32 }} justify="center">
          <Col className="gutter-row">
            <div className="advantage__card">
              <CommentOutlined id="advantage__card-icon"/>
              <Paragraph style={{fontSize: '18px'}}>easy communication with the team</Paragraph>
            </div>
          </Col>
          <Col className="gutter-row">
            <div className="advantage__card">
              <CoffeeOutlined id="advantage__card-icon"/>
              <Paragraph style={{fontSize: '18px'}}>very comfortable interface</Paragraph>
            </div>
          </Col>
          <Col className="gutter-row">
            <div className="advantage__card">
              <DollarCircleOutlined id="advantage__card-icon"/>
              <Paragraph id="advantage__card__text">this application is free</Paragraph> 
            </div>
          </Col>
          <Col className="gutter-row">
            <div className="advantage__card">
              <BankOutlined id="advantage__card-icon" />
              <Paragraph id="advantage__card__text">very comfortable interface</Paragraph>
            </div>
          </Col>
          <Col className="gutter-row">
            <div className="advantage__card">
              <BookOutlined  id="advantage__card-icon" />
              <Paragraph id="advantage__card__text">this application is free</Paragraph> 
            </div>
          </Col>
          <Col className="gutter-row">
            <div className="advantage__card">
              <BankOutlined id="advantage__card-icon" />
              <Paragraph id="advantage__card__text">very comfortable interface</Paragraph>
            </div>
          </Col>
          <Col className="gutter-row">
            <div className="advantage__card">
              <BookOutlined id="advantage__card-icon"/>
              <Paragraph id="advantage__card__text">this application is free</Paragraph> 
            </div>
          </Col>
        </Row>
      </section>
      <Divider style={{backgroundColor: '#002766'}}/>
      <section className="team__section" style={{padding: '3rem 0rem'}}>
        <Title level={2} id="section__title">Our Team</Title>
        <div className="team__container">
          <div className="left__cards">
            <div className="team__card">
              <Avatar src="https://joeschmoe.io/api/v1/male/jacques" style={{width: '10rem', height: '10rem'}}/>
              <div className="card__contant">
                <Title level={3}>Vladimir</Title>
                <Text strong> Mentor</Text>
                <Paragraph id="team__card__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloremque, repellendus tempore illum perspiciatis dolores explicabo ipsa, eligendi aliquid commodi atque nihil labore praesentium veniam aperiam dolorem debitis voluptatibus molestiae.</Paragraph>
              </div>
            </div>
            <div className="team__card">
              <Avatar src="https://joeschmoe.io/api/v1/male/jude" style={{width: '10rem', height: '10rem'}}/>
              <div className="card__contant">
                <Title level={3}>Roman</Title>
                <Text strong> Team leader</Text>
                <Paragraph  id="team__card__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloremque, repellendus tempore illum perspiciatis dolores explicabo ipsa, eligendi aliquid commodi atque nihil labore praesentium veniam aperiam dolorem debitis voluptatibus molestiae.</Paragraph>
              </div>
            </div>
          </div>
          <div className="right__cards">
            <div className="team__card">
              <Avatar src="https://joeschmoe.io/api/v1/female/jane" style={{width: '10rem', height: '10rem'}} />
              <div className="card__contant">
                <Title level={3}>Olga</Title>
                <Text strong> Hurt of team</Text>
                <Paragraph  id="team__card__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloremque, repellendus tempore illum perspiciatis dolores explicabo ipsa, eligendi aliquid commodi atque nihil labore praesentium veniam aperiam dolorem debitis voluptatibus molestiae.</Paragraph>
              </div>
            </div>
            <div className="team__card">
              <Avatar src="https://joeschmoe.io/api/v1/female/julie" style={{width: '10rem', height: '10rem'}}/>
              <div className="card__contant">
                <Title level={3}>Sasha</Title>
                <Text strong> Member</Text>
                <Paragraph  id="team__card__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloremque, repellendus tempore illum perspiciatis dolores explicabo ipsa, eligendi aliquid commodi atque nihil labore praesentium veniam aperiam dolorem debitis voluptatibus molestiae.</Paragraph>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Divider style={{backgroundColor: '#002766'}}/>
      <section className="site-layout-content" style={{padding: '3rem 0rem'}}>
        <Title level={2} id="section__title">Video instruction</Title>
        <div className="video__container">
            <div className="player">
            </div>
        </div>
      </section>
    </Content>
  );
};

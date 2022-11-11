import React, { useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Button, Form, Input, Radio } from "antd";
import { useNavigate } from "react-router";
import { useForm } from "antd/es/form/Form";
import { authSignIn, authSignUp } from "../features/user/auth-slice";
import { useAppDispatch } from "../app/hooks";

export const LoginPage: React.FC = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [accountExist, setAccountExist] = useState<boolean>(false);

  const handleFinish = async (values: {
    name: string;
    login: string;
    password: string;
  }) => {
    if (accountExist) {
      dispatch(authSignIn(values));
    } else {
      dispatch(authSignUp(values));
    }
  };

  const handleChange = (value: boolean) => {
    form.resetFields();
    setAccountExist(value);
  };

  return (
    <Content style={{ padding: "50px 50px", minHeight: "100vh" }}>
      <div className="site-layout-content">
        <Radio.Group
          onChange={(e) => handleChange(e.target.value)}
          defaultValue={accountExist}
        >
          <Radio.Button value={true}>Sign in</Radio.Button>
          <Radio.Button value={false}>Sign up</Radio.Button>
        </Radio.Group>
        <Form
          form={form}
          name="login-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          autoComplete="off"
          onFinish={handleFinish}
          style={{ marginTop: "2rem" }}
        >
          {!accountExist && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input your name!" },
                { min: 3, message: "Name length should be more than 3" },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="login"
            label="Login"
            rules={[
              { required: true, message: "Please input your login!" },
              { min: 3, message: "Login length should be more than 3" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 3,
                message: "Password length should be more than 3",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button htmlType="submit">Submit</Button>
          <Button
            onClick={() => navigate("../")}
            style={{ marginLeft: "2rem" }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </Content>
  );
};

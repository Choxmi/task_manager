import React, { useState } from 'react';
import { LockOutlined, UserOutlined, BookFilled } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { login } from '../Api';
import { useDispatch } from 'react-redux';


function Login() {
    const dispatch = useDispatch()
    const onFinish = (values) => {
        console.log('Success:', values);
        login(values).then((val) => {
            console.log("Login Error", val);
            if (val.status == 200) {
                window.localStorage.setItem('token', val.data.token);
                window.location.href = "/"
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="row" style={{ marginTop: 0 }} >
            <div className="col-md-6 col-sm-12 reg-background reg-colored">
                <BookFilled style={{ fontSize: 150, color: 'white', marginBottom: 20 }} />
                <h2 style={{ color: 'white' }}>Task Manager</h2>
            </div>
            <div className='col-md-6 col-sm-12 reg-background'>
                <div className='col-md-6'>
                    <div className="fos-card-heading font-bold" style={{ marginBottom: 20 }}>
                        Login
                    </div>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label='Username'
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            label='Password'
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                        </Form.Item>

                        <a href='/register'>
                            New users
                        </a>

                        <Form.Item
                            style={{ marginTop: 20 }}
                        >
                            <Button type="primary" htmlType="submit" className='fos-btn-primary mb-1 ml-4'>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
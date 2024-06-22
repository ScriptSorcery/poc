import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { login } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Label, Row } from 'reactstrap';


import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await login(username, password);
        authLogin(data.access);
        navigate('/app/orgs');
    };

    return (
        <Row>
            <Col className='login-form' md={6}>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12}>
                            <Label>Username:</Label>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Label>Password:</Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button className="mt-2" type="submit">Login</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;

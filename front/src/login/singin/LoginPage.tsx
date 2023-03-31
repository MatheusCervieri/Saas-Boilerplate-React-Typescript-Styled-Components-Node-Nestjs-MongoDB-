import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { serverurl } from '../../confs/serverurl';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(serverurl + 'auth/login', data);
      const token = response.data.access_token;
      // save the token in the local storage
      localStorage.setItem('token', token);
      navigate('/dashboard');
      // handle successful login and token
    } catch (err : any) {
      console.error(err);
      setError(err.response.data.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <Error>{error}</Error>}
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;

const Error = styled.p`
  margin-top: -1rem;
  margin-bottom: 1rem;
  color: red;
`;

export default LoginPage;

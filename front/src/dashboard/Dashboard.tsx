import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverurl } from '../confs/serverurl';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WelcomeMessage = styled.h1`
  font-size: 24px;
  margin-top: 40px;
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
`;

const Dashboard: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setRedirect(true);
    } else {
      fetchEmail();
    }
  }, []);

  const fetchEmail = async () => {
    try {
      console.log(token);
      const response = await axios.get(serverurl + 'auth' + '/user-information', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setEmail(response.data.email);
    } catch (error) {
      console.error(error);
      //setRedirect(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setRedirect(true);
  };

  if (redirect) {
    navigate('/registration');
  }

  return (
    <DashboardContainer>
      {email ? (
        <>
          <WelcomeMessage>Welcome back, {email}!</WelcomeMessage>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
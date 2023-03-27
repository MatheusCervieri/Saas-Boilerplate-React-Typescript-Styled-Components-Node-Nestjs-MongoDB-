import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import RegistrationPage from './login/registration/RegistrationPage';
import LoginPage from './login/singin/LoginPage';

export default function DisplayRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LoginPage/>}/>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
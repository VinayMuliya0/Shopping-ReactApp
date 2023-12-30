import React from 'react';
import AuthWrapper from './AuthWrapper'; // Adjust the path based on your project structure
import Dashboard from './Dashboard'; // Your authenticated component
import LoginPage from './LoginPage'; // Your login page component

const Route = () => {
    const isAuthenticated = JSON.parse(localStorage.getItem('user')).logged; // Replace with your authentication logic

    return (
        <>
            <h1>My App</h1>
            <AuthWrapper isAuthenticated={isAuthenticated}>

                <Dashboard />
            </AuthWrapper>
            <LoginPage />
        </>
    );
};

export default Route;
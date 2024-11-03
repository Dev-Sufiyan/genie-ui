import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SuccessPage.css';
import { CheckmarkCircle48Filled } from '@fluentui/react-icons';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, [navigate]);

  return (
    <div>
      <div className="success-message">
        <CheckmarkCircle48Filled className="success-icon" />
        <h5>Sign in success!</h5>
        <p>You will be redirected to the home page.</p>
      </div>
    </div>
  );
};

export default SuccessPage;

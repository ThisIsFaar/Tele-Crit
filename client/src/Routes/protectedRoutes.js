import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAuthenticated } from '../helper/auth';

export default function Protected(props) {
  const { Component } = props;

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
}

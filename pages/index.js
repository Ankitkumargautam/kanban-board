import React, { useState } from 'react';
import Register from '../components/Register/Register';
import styles from './index.module.css';
import Login from '../components/Login/Login';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className={styles.home}>
      {showLogin ? (
        <Register setShowLogin={setShowLogin} />
      ) : (
        <Login setShowLogin={setShowLogin} />
      )}
    </div>
  );
};

export default Home;

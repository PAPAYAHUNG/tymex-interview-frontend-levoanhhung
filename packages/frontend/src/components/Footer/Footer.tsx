import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import styles from './styles.module.scss';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // TODO: Implement subscription logic
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.section}>
          <h3>NAVIGATION</h3>
          <div className={styles.links}>
            <Link to="/">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/teams">Our teams</Link>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/roadmap">Roadmap</Link>
            <Link to="/whitepaper">Whitepaper</Link>
            <Link to="/news">News</Link>
            <Link to="/community">Community</Link>
          </div>
        </div>

        <div className={styles.section}>
          <h3>CONTACT US</h3>
          <div className={styles.contactInfo}>
            <p>01234568910</p>
            <p>tymex-talent@tyme.com</p>
          </div>
        </div>

        <div className={styles.section}>
          <h3>SUBCRIBE TO RECEIVE OUR LATEST UPDATE</h3>
          <div className={styles.subscribeForm}>
            <Input
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />
            <Button type="primary" onClick={handleSubscribe} className={styles.subscribeButton}>
              Subcribe
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          ©2023 Tyme - Edit. All Rights reserved.
        </div>
        <div className={styles.bottomLinks}>
          <Link to="/security">Security</Link>
          <Link to="/legal">Legal</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
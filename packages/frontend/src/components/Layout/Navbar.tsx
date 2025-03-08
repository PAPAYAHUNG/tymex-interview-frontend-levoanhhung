import React from 'react';
import { Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const isScrolled = useScrollEffect();
  const location = useLocation();
  
  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'OUR TEAMS', path: '/teams' },
    { label: 'MARKETPLACE', path: '/marketplace', highlight: true },
    { label: 'ROADMAP', path: '/roadmap' },
    { label: 'WHITEPAPER', path: '/whitepaper' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? 'scrolled' : ''}`}>
      <div className={styles.navbarContent}>
        {/* Navigation Links */}
        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`${styles.navLink} ${item.highlight ? styles.highlighted : ''} ${
                isActive(item.path) ? styles.active : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className={styles.navbarRight}>
          <Button type="primary" className={styles.connectButton}>
            Connect Wallet
          </Button>
          <div className={styles.languageSelector}>
            <GlobalOutlined className={styles.globeIcon} />
            <span>EN</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
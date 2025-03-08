import React from 'react';
import { Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const isScrolled = useScrollEffect();
  
  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'OUR TEAMS', href: '/teams' },
    { label: 'MARKETPLACE', href: '/marketplace', highlight: true },
    { label: 'ROADMAP', href: '/roadmap' },
    { label: 'WHITEPAPER', href: '/whitepaper' },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? 'scrolled' : ''}`}>
      <div className={styles.navbarContent}>
        {/* Navigation Links */}
        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className={`${styles.navLink} ${item.highlight ? styles.highlighted : ''}`}
            >
              {item.label}
            </a>
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
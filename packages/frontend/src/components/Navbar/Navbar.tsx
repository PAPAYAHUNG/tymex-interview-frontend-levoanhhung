import React, { useState } from 'react';
import { Button } from 'antd';
import { GlobalOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useLocation, NavLink } from 'react-router-dom';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import styles from './styles.module.scss';
import cls from 'classnames';

const Navbar: React.FC = () => {
    const isScrolled = useScrollEffect();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'HOME', path: '/' },
        { label: 'ABOUT US', path: '/about' },
        { label: 'OUR TEAMS', path: '/teams' },
        { label: 'MARKETPLACE', path: '/marketplace', highlight: true },
        { label: 'ROADMAP', path: '/roadmap' },
        { label: 'WHITEPAPER', path: '/whitepaper' },
    ];

    const isCurrentPath = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? 'scrolled' : ''}`}>
            <div className={styles.navbarContent}>
                {/* Mobile Menu Toggle */}
                <button className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                </button>

                {/* Navigation Links */}
                <div className={cls(styles.navLinks, { [styles.mobileMenuOpen]: isMobileMenuOpen })}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => cls(
                                styles.navLink,
                                {
                                    [styles.active]: isActive,
                                    [styles.highlighted]: isCurrentPath(item.path)
                                }
                            )}
                            onClick={closeMobileMenu}
                        >
                            {item.label}
                        </NavLink>
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
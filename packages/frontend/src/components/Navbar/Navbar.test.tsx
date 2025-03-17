import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Navbar from './Navbar';
import { useScrollEffect } from '../../hooks/useScrollEffect';

// Mock the useScrollEffect hook
vi.mock('../../hooks/useScrollEffect', () => ({
    useScrollEffect: vi.fn(),
}));

// Mock the antd Button component
vi.mock('antd', () => ({
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    ),
}));

const renderNavbar = () => {
    return render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );
};

describe('Navbar Component', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks();
        // Default mock for useScrollEffect
        (useScrollEffect as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
    });

    it('renders all navigation items', () => {
        renderNavbar();
        
        const navItems = [
            'HOME',
            'ABOUT US',
            'OUR TEAMS',
            'MARKETPLACE',
            'ROADMAP',
            'WHITEPAPER'
        ];

        navItems.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    it('renders connect wallet button', () => {
        renderNavbar();
        expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
    });

    it('renders language selector', () => {
        renderNavbar();
        expect(screen.getByText('EN')).toBeInTheDocument();
    });

    it('toggles mobile menu when menu button is clicked', () => {
        renderNavbar();
        
        // Use a more specific query to get the mobile menu button
        const menuButton = screen.getByRole('button', { name: /menu/i });
        expect(menuButton).toBeInTheDocument();
        
        // Menu should be closed initially
        const navLinks = screen.getByRole('navigation').querySelector('div[class*="navLinks"]');
        expect(navLinks?.classList.toString()).not.toMatch(/mobileMenuOpen/);
        
        // Click menu button
        fireEvent.click(menuButton);
        
        // Menu should be open
        expect(navLinks?.classList.toString()).toMatch(/mobileMenuOpen/);
        
        // Click menu button again
        fireEvent.click(menuButton);
        
        // Menu should be closed
        expect(navLinks?.classList.toString()).not.toMatch(/mobileMenuOpen/);
    });

    it('closes mobile menu when a navigation link is clicked', () => {
        renderNavbar();
        
        // Open mobile menu using the specific menu button
        const menuButton = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(menuButton);
        
        // Click a navigation link
        const homeLink = screen.getByText('HOME');
        fireEvent.click(homeLink);
        
        // Menu should be closed
        const navLinks = screen.getByRole('navigation').querySelector('div[class*="navLinks"]');
        expect(navLinks?.classList.toString()).not.toMatch(/mobileMenuOpen/);
    });

    it('applies scrolled class when useScrollEffect returns true', () => {
        (useScrollEffect as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true);
        renderNavbar();
        
        const navbar = screen.getByRole('navigation');
        expect(navbar).toHaveClass('scrolled');
    });

    it('does not apply scrolled class when useScrollEffect returns false', () => {
        (useScrollEffect as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
        renderNavbar();
        
        const navbar = screen.getByRole('navigation');
        expect(navbar).not.toHaveClass('scrolled');
    });
}); 
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Star } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isServicesHovered, setIsServicesHovered] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Clinic', path: '/clinic' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transition: 'all 0.3s ease',
            background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
            padding: scrolled ? '1rem 0' : '1.5rem 0',
            boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.03)' : 'none'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '35px',
                        height: '35px',
                        background: 'linear-gradient(135deg, var(--color-accent), #f3d578)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 'bold' }}>T</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: 'var(--color-text-primary)',
                            lineHeight: '1',
                            letterSpacing: '-0.5px'
                        }}>
                            T Nagar <span style={{ color: 'var(--color-accent)' }}>Dental</span>
                        </span>
                        <span style={{
                            fontSize: '0.65rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: 'var(--color-text-secondary)',
                            marginTop: '2px'
                        }}>
                            Premium Care
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden-mobile" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                    {navLinks.map((link) => {
                        if (link.name === 'Services') {
                            return (
                                <div
                                    key={link.name}
                                    style={{ position: 'relative' }}
                                    onMouseEnter={() => setIsServicesHovered(true)}
                                    onMouseLeave={() => setIsServicesHovered(false)}
                                >
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) => isActive ? 'active-link' : ''}
                                        style={({ isActive }) => ({
                                            textDecoration: 'none',
                                            color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
                                            fontWeight: isActive ? '600' : '500',
                                            fontSize: '0.95rem',
                                            letterSpacing: '0.5px',
                                            transition: 'color 0.3s ease',
                                            position: 'relative',
                                            padding: '0.5rem 0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        })}
                                    >
                                        {link.name}
                                        {/* Hover/Active Indicator */}
                                        <span className="nav-indicator" style={{
                                            position: 'absolute',
                                            bottom: '0',
                                            left: '0',
                                            width: '100%',
                                            height: '2px',
                                            background: 'var(--color-accent)',
                                            transform: 'scaleX(0)',
                                            transformOrigin: 'right',
                                            transition: 'transform 0.3s ease'
                                        }}></span>
                                    </NavLink>

                                    {/* Dropdown Menu */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: '50%',
                                        transform: isServicesHovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
                                        opacity: isServicesHovered ? 1 : 0,
                                        visibility: isServicesHovered ? 'visible' : 'hidden',
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '16px',
                                        padding: '1rem',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                        minWidth: '260px',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        zIndex: 1000,
                                        marginTop: '1.5rem',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}>
                                        {/* Little triangle arrow at the top */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '-6px',
                                            left: '50%',
                                            transform: 'translateX(-50%) rotate(45deg)',
                                            width: '12px',
                                            height: '12px',
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            borderLeft: '1px solid rgba(255,255,255,0.2)',
                                            borderTop: '1px solid rgba(255,255,255,0.2)'
                                        }}></div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {[
                                                { name: 'Teeth Cleaning', path: null },
                                                { name: 'Tooth Filling', path: '/services/tooth-filling' },
                                                { name: 'Root Canal', path: null },
                                                { name: 'Braces / Aligners', path: null },
                                                { name: 'Tooth Extraction', path: null },
                                                { name: 'Dental Implants', path: null },
                                                { name: 'Cosmetic Dentistry', path: null }
                                            ].map((service) => (
                                                service.path ? (
                                                    <Link
                                                        key={service.name}
                                                        to={service.path}
                                                        style={{
                                                            padding: '0.75rem 1rem',
                                                            borderRadius: '8px',
                                                            color: 'var(--color-text-primary)',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '500',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            textDecoration: 'none'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = 'rgba(var(--color-accent-rgb), 0.08)';
                                                            e.currentTarget.style.color = 'var(--color-accent)';
                                                            e.currentTarget.style.transform = 'translateX(5px)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = 'transparent';
                                                            e.currentTarget.style.color = 'var(--color-text-primary)';
                                                            e.currentTarget.style.transform = 'translateX(0)';
                                                        }}
                                                    >
                                                        {service.name}
                                                    </Link>
                                                ) : (
                                                    <div
                                                        key={service.name}
                                                        style={{
                                                            padding: '0.75rem 1rem',
                                                            borderRadius: '8px',
                                                            color: 'var(--color-text-primary)',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '500',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = 'rgba(var(--color-accent-rgb), 0.08)';
                                                            e.currentTarget.style.color = 'var(--color-accent)';
                                                            e.currentTarget.style.transform = 'translateX(5px)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = 'transparent';
                                                            e.currentTarget.style.color = 'var(--color-text-primary)';
                                                            e.currentTarget.style.transform = 'translateX(0)';
                                                        }}
                                                    >
                                                        {service.name}
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // Normal Links
                        return (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => isActive ? 'active-link' : ''}
                                style={({ isActive }) => ({
                                    textDecoration: 'none',
                                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
                                    fontWeight: isActive ? '600' : '500',
                                    fontSize: '0.95rem',
                                    letterSpacing: '0.5px',
                                    transition: 'color 0.3s ease',
                                    position: 'relative',
                                    padding: '0.5rem 0'
                                })}
                            >
                                {link.name}
                                {/* Hover/Active Indicator */}
                                <span className="nav-indicator" style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    width: '100%',
                                    height: '2px',
                                    background: 'var(--color-accent)',
                                    transform: 'scaleX(0)',
                                    transformOrigin: 'right',
                                    transition: 'transform 0.3s ease'
                                }}></span>
                            </NavLink>
                        );
                    })}


                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/signup" className="btn" style={{
                            background: 'transparent',
                            color: 'var(--color-text-primary)',
                            padding: '0.7rem 1.5rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            border: '2px solid var(--color-accent)',
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'var(--color-accent)';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--color-text-primary)';
                            }}>
                            Get Started
                        </Link>

                        <Link to="/booking" className="btn" style={{
                            background: 'var(--color-text-primary)',
                            color: 'white',
                            padding: '0.8rem 2rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none'
                        }}>
                            <span>Book Appointment</span>
                            <Star size={14} fill="var(--color-accent)" color="var(--color-accent)" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={toggleMenu}
                    style={{
                        display: 'none', // Handled by CSS media query usually, but inline for now needs class support
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-primary)'
                    }}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '300px',
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                zIndex: 999,
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.05)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={28} color="var(--color-text-primary)" />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                fontSize: '1.5rem',
                                fontFamily: 'var(--font-heading)',
                                color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
                                fontWeight: isActive ? '700' : '500',
                                transition: 'color 0.2s ease'
                            })}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link
                        to="/signup"
                        className="btn"
                        onClick={() => setIsOpen(false)}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            color: 'var(--color-text-primary)',
                            padding: '1rem',
                            borderRadius: '12px',
                            justifyContent: 'center',
                            fontWeight: '600',
                            border: '2px solid var(--color-accent)',
                            textDecoration: 'none'
                        }}
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/booking"
                        className="btn"
                        onClick={() => setIsOpen(false)}
                        style={{
                            width: '100%',
                            background: 'var(--color-text-primary)',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: '12px',
                            justifyContent: 'center',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}
                    >
                        Book Appointment
                    </Link>
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                        <Phone size={16} />
                        <span>+91 98765 43210</span>
                    </div>
                </div>
            </div>

            {/* Overlay Backdrop for Mobile */}
            {
                isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.2)',
                            backdropFilter: 'blur(2px)',
                            zIndex: 998
                        }}
                    ></div>
                )
            }
        </nav >
    );
};

export default Navbar;

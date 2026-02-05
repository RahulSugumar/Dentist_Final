import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight, Star } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            background: 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)',
            color: '#fff',
            padding: '6rem 0 2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Top Border */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #d4af37, transparent)'
            }}></div>

            {/* Background Pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                opacity: 0.5,
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>

                    {/* Column 1: Brand & About */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #d4af37 0%, #f3d578 100%)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1a1a1a'
                            }}>
                                <Star size={24} fill="#1a1a1a" />
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.5rem',
                                color: '#fff',
                                letterSpacing: '0.5px'
                            }}>
                                The Smile <span style={{ color: '#d4af37' }}>Hub</span>
                            </span>
                        </div>
                        <p style={{
                            color: '#a0a0a0',
                            lineHeight: '1.8',
                            marginBottom: '2rem',
                            fontSize: '0.95rem'
                        }}>
                            Experience the pinnacle of dental care where artistry meets precision. Your journey to a perfect smile begins here.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                                <a key={index} href="#" style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#d4af37',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#d4af37';
                                        e.currentTarget.style.color = '#1a1a1a';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.color = '#d4af37';
                                    }}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>




                    {/* Column 3: Treatments */}
                    <div>
                        <h4 style={{
                            color: '#fff',
                            marginBottom: '1.5rem',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.2rem',
                            borderBottom: '2px solid #d4af37',
                            display: 'inline-block',
                            paddingBottom: '0.5rem',
                            marginRight: '0%'
                        }}>Treatments</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column' }}>
                            {['Cosmetic Dentistry', 'Dental Implants', 'Root Canal Therapy', 'Invisalign', 'Teeth Whitening'].map((item, index) => (
                                <li key={index}>
                                    <Link to="/" style={{
                                        color: '#a0a0a0',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.95rem'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = '#d4af37';
                                            e.currentTarget.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = '#a0a0a0';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >

                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h4 style={{
                            color: '#fff',
                            marginBottom: '1.5rem',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.2rem',
                            borderBottom: '2px solid #d4af37',
                            display: 'inline-block',
                            paddingBottom: '0.5rem'
                        }}>Contact Us</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <li style={{ display: 'flex', gap: '1rem', color: '#a0a0a0' }}>
                                <div style={{
                                    minWidth: '32px',
                                    height: '32px',
                                    background: 'rgba(212, 175, 55, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <MapPin size={16} color="#d4af37" />
                                </div>
                                <span style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>123 ABC Street, New York,<br />NY 10001</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', color: '#a0a0a0' }}>
                                <div style={{
                                    minWidth: '32px',
                                    height: '32px',
                                    background: 'rgba(212, 175, 55, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Phone size={16} color="#d4af37" />
                                </div>
                                <span style={{ fontSize: '0.95rem' }}>+1 212 555 0123</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem', color: '#a0a0a0' }}>
                                <div style={{
                                    minWidth: '32px',
                                    height: '32px',
                                    background: 'rgba(212, 175, 55, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Mail size={16} color="#d4af37" />
                                </div>
                                <span style={{ fontSize: '0.95rem' }}>info@thesmilehub.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    color: '#666',
                    fontSize: '0.9rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} The Smile Hub Dental Clinic. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = '#d4af37'} onMouseLeave={e => e.target.style.color = '#666'}>Privacy Policy</Link>
                        <Link to="/" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = '#d4af37'} onMouseLeave={e => e.target.style.color = '#666'}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

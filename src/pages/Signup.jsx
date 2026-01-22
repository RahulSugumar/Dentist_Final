import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Phone, User, Calendar, Loader2 } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        age: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password.length > 72) {
            setError("Password cannot exceed 72 characters");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: formData.full_name,
                    email: formData.email,
                    phone_number: formData.phone_number,
                    age: formData.age ? parseInt(formData.age) : null,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Registration failed');
            }
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
        borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0.1)',
        background: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'all 0.3s ease',
        fontFamily: 'var(--font-body)'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontSize: '0.9rem',
        fontWeight: '600',
        color: 'var(--color-text-secondary)',
        fontFamily: 'var(--font-body)'
    };

    const iconWrapperStyle = {
        position: 'absolute',
        top: '50%',
        left: '0.75rem',
        transform: 'translateY(-50%)',
        color: '#d4af37' // Gold accent
    };

    return (
        <div style={{
            minHeight: '100vh',
            paddingTop: '6rem',
            paddingBottom: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #fdfbf7 0%, #fff 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '300px',
                height: '300px',
                background: 'rgba(212, 175, 55, 0.05)',
                borderRadius: '50%',
                filter: 'blur(50px)',
                zIndex: 0
            }} />

            <div style={{
                width: '100%',
                maxWidth: '500px',
                padding: '0 1.5rem',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: 'var(--color-text-primary)',
                        marginBottom: '0.5rem'
                    }}>
                        Start Your Journey
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
                        Join us for premium dental care
                    </p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.5)'
                }}>
                    {error && (
                        <div style={{
                            marginBottom: '1.5rem',
                            padding: '1rem',
                            borderRadius: '8px',
                            background: 'rgba(254, 226, 226, 0.5)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#b91c1c',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div style={{ position: 'relative' }}>
                            <label htmlFor="full_name" style={labelStyle}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <div style={iconWrapperStyle}><User size={18} /></div>
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    className="premium-input"
                                />
                            </div>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <label htmlFor="email" style={labelStyle}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <div style={iconWrapperStyle}><Mail size={18} /></div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    className="premium-input"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ position: 'relative' }}>
                                <label htmlFor="phone_number" style={labelStyle}>Phone</label>
                                <div style={{ position: 'relative' }}>
                                    <div style={iconWrapperStyle}><Phone size={18} /></div>
                                    <input
                                        id="phone_number"
                                        name="phone_number"
                                        type="tel"
                                        required
                                        placeholder="9876543210"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        className="premium-input"
                                    />
                                </div>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <label htmlFor="age" style={labelStyle}>Age</label>
                                <div style={{ position: 'relative' }}>
                                    <div style={iconWrapperStyle}><Calendar size={18} /></div>
                                    <input
                                        id="age"
                                        name="age"
                                        type="number"
                                        placeholder="25"
                                        value={formData.age}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        className="premium-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <label htmlFor="password" style={labelStyle}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <div style={iconWrapperStyle}><Lock size={18} /></div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    className="premium-input"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                marginTop: '1rem',
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '50px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #d4af37 0%, #f3d578 100%)',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: '600',
                                letterSpacing: '0.5px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                textTransform: 'uppercase'
                            }}
                            onMouseOver={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(212, 175, 55, 0.3)';
                                }
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(212, 175, 55, 0.2)';
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Creating Account...
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                style={{
                                    color: '#d4af37',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid transparent',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.borderBottom = '1px solid #d4af37'}
                                onMouseOut={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .premium-input:focus {
                    border-color: #d4af37 !important;
                    background: #fff !important;
                    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
                }
            `}</style>
        </div>
    );
};

export default Signup;

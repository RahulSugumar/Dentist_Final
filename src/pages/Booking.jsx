import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, User, Phone, CheckCircle, ArrowRight, Calendar as CalendarIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Booking = () => {
    const heroRef = useRef(null);
    const formRef = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        service: 'Consultation'
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Global Ambient Animations
        const ambientTl = gsap.timeline({ repeat: -1, yoyo: true });

        gsap.to(".global-orb-1", {
            x: "20vw",
            y: "10vh",
            duration: 8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
        gsap.to(".global-orb-2", {
            x: "-15vw",
            y: "20vh",
            duration: 10,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1
        });
        gsap.to(".global-orb-3", {
            x: "10vw",
            y: "-15vh",
            duration: 9,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.5
        });

        // Hero Animation
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(heroRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
        );

        // Form Animation
        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 85%",
                    }
                }
            );
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/book-appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: formData.name,
                    phone_number: formData.phone,
                    email: formData.email,
                    appointment_date: formData.date,
                    appointment_time: formData.time,
                    service: formData.service
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Booking failed. Please try again.');
            }

            console.log('Booking Success:', data);
            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getGoogleCalendarUrl = () => {
        const { date, time, service, name } = formData;
        if (!date || !time) return '#';

        // Create date objects
        const startDate = new Date(`${date}T${time}`);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour

        // Helper to format as YYYYMMDDTHHMMSS (Local Time)
        const formatLocalTime = (d) => {
            const pad = (n) => n.toString().padStart(2, '0');
            return (
                d.getFullYear().toString() +
                pad(d.getMonth() + 1) +
                pad(d.getDate()) +
                'T' +
                pad(d.getHours()) +
                pad(d.getMinutes()) +
                pad(d.getSeconds())
            );
        };

        const start = formatLocalTime(startDate);
        const end = formatLocalTime(endDate);

        const title = encodeURIComponent(`Dentist Appointment: ${service}`);
        const details = encodeURIComponent(`Appointment for ${service} with ${name}`);
        const location = encodeURIComponent("T Nagar Dental Clinic");

        // Note: We do NOT append 'Z' at the end, so Google treats it as "Floating Time" (User's Local Time)
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    };

    if (submitted) {
        return (
            <div className="page-booking" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at 50% 0%, #ffffff 0%, #f8f9fa 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Global Ambient Background */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                    <div className="global-orb-1" style={{ position: 'absolute', top: '10%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
                    <div className="global-orb-2" style={{ position: 'absolute', top: '40%', right: '-10%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(100, 100, 100, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
                </div>

                <div style={{
                    maxWidth: '500px',
                    width: '90%',
                    padding: '3rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        boxShadow: '0 10px 20px rgba(34, 197, 94, 0.3)'
                    }}>
                        <CheckCircle size={40} color="white" />
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        color: 'var(--color-text-primary)'
                    }}>
                        Booking Confirmed!
                    </h1>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                        Thank you, <strong>{formData.name}</strong>. We have received your appointment request for <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
                    </p>

                    <a
                        href={getGoogleCalendarUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.8rem',
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '12px',
                            background: '#fff',
                            border: '1px solid #dadce0',
                            color: '#3c4043',
                            fontSize: '1rem',
                            fontWeight: '500',
                            marginBottom: '1rem',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#f8f9fa'}
                        onMouseOut={(e) => e.currentTarget.style.background = '#fff'}
                    >
                        <CalendarIcon size={20} color="#4285f4" />
                        Add to Google Calendar
                    </a>

                    <button
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                        onClick={() => {
                            setSubmitted(false);
                            setFormData(prev => ({ ...prev, date: '', time: '' }));
                        }}
                    >
                        Book Another <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-booking" style={{
            overflowX: 'hidden',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 0%, #ffffff 0%, #f8f9fa 100%)',
            minHeight: '100vh'
        }}>
            {/* ... (background code omitted for brevity but preserved in output) ... */}
            {/* Global Ambient Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 9999,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}>
                <div className="global-orb-1" style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '40vw',
                    height: '40vw',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }}></div>
                <div className="global-orb-2" style={{
                    position: 'absolute',
                    top: '40%',
                    right: '-10%',
                    width: '35vw',
                    height: '35vw',
                    background: 'radial-gradient(circle, rgba(100, 100, 100, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(50px)'
                }}></div>
                <div className="global-orb-3" style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '20%',
                    width: '50vw',
                    height: '50vw',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(80px)'
                }}></div>
            </div>

            {/* Hero Section */}
            <section className="section" style={{
                padding: '12rem 0 6rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container text-center" ref={heroRef} style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{
                        display: 'inline-block',
                        color: 'var(--color-accent)',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontSize: '0.9rem',
                        marginBottom: '1.5rem',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '50px',
                        background: 'rgba(255,255,255,0.5)'
                    }}>
                        Appointments
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        marginBottom: '2rem',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: '1.1'
                    }}>
                        Schedule Your <br />
                        <span style={{
                            fontStyle: 'italic',
                            color: 'var(--color-accent)',
                            position: 'relative'
                        }}>
                            Visit Today
                        </span>
                    </h1>
                    <p style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontSize: '1.35rem',
                        color: 'var(--color-text-secondary)',
                        fontWeight: '300'
                    }}>
                        Take the first step towards a healthier smile. Book your appointment online.
                    </p>
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="section" style={{ paddingBottom: '8rem' }}>
                <div className="container">
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        style={{
                            maxWidth: '800px',
                            margin: '0 auto',
                            padding: '4rem',
                            borderRadius: '32px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.9)',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                            borderRadius: '0 0 0 100%',
                            pointerEvents: 'none'
                        }}></div>

                        {error && (
                            <div style={{
                                padding: '1rem',
                                marginBottom: '2rem',
                                borderRadius: '12px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: '#b91c1c',
                                textAlign: 'center',
                                fontSize: '0.95rem'
                            }}>
                                {error}
                            </div>
                        )}

                        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                            <div className="flex flex-col gap-sm">
                                <label htmlFor="name" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '1rem',
                                            background: 'rgba(255,255,255,0.5)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        placeholder="John Doe"
                                        onFocus={(e) => {
                                            e.target.style.background = 'white';
                                            e.target.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.1)';
                                            e.target.style.borderColor = 'var(--color-accent)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.background = 'rgba(255,255,255,0.5)';
                                            e.target.style.boxShadow = 'none';
                                            e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-sm">
                                <label htmlFor="email" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '1rem',
                                            background: 'rgba(255,255,255,0.5)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        placeholder="john@example.com"
                                        onFocus={(e) => {
                                            e.target.style.background = 'white';
                                            e.target.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.1)';
                                            e.target.style.borderColor = 'var(--color-accent)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.background = 'rgba(255,255,255,0.5)';
                                            e.target.style.boxShadow = 'none';
                                            e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-sm">
                                <label htmlFor="phone" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone Number</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '1rem',
                                            background: 'rgba(255,255,255,0.5)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        placeholder="+91 98765 43210"
                                        onFocus={(e) => {
                                            e.target.style.background = 'white';
                                            e.target.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.1)';
                                            e.target.style.borderColor = 'var(--color-accent)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.background = 'rgba(255,255,255,0.5)';
                                            e.target.style.boxShadow = 'none';
                                            e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                            <div className="flex flex-col gap-sm">
                                <label htmlFor="date" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Preferred Date</label>
                                <div style={{ position: 'relative' }}>
                                    <Calendar size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        required
                                        min={new Date().toLocaleDateString('en-CA')} // 'en-CA' gives YYYY-MM-DD in local time
                                        value={formData.date}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '1rem',
                                            background: 'rgba(255,255,255,0.5)',
                                            transition: 'all 0.3s ease',
                                            fontFamily: 'inherit'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.background = 'white';
                                            e.target.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.1)';
                                            e.target.style.borderColor = 'var(--color-accent)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.background = 'rgba(255,255,255,0.5)';
                                            e.target.style.boxShadow = 'none';
                                            e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-sm">
                                <label htmlFor="time" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Preferred Time</label>
                                <div style={{ position: 'relative' }}>
                                    <Clock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        required
                                        value={formData.time}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            fontSize: '1rem',
                                            background: 'rgba(255,255,255,0.5)',
                                            transition: 'all 0.3s ease',
                                            fontFamily: 'inherit'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.background = 'white';
                                            e.target.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.1)';
                                            e.target.style.borderColor = 'var(--color-accent)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.background = 'rgba(255,255,255,0.5)';
                                            e.target.style.boxShadow = 'none';
                                            e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-sm" style={{ marginBottom: '3rem' }}>
                            <label htmlFor="service" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Service</label>
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    fontSize: '1rem',
                                    background: 'rgba(255,255,255,0.5)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onFocus={(e) => {
                                    e.target.style.background = 'white';
                                    e.target.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.1)';
                                    e.target.style.borderColor = 'var(--color-accent)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.background = 'rgba(255,255,255,0.5)';
                                    e.target.style.boxShadow = 'none';
                                    e.target.style.borderColor = 'rgba(0,0,0,0.1)';
                                }}
                            >
                                <option value="Consultation">General Consultation</option>
                                <option value="Cleaning">Teeth Cleaning</option>
                                <option value="Filling">Tooth Filling</option>
                                <option value="Root Canal">Root Canal Treatment</option>
                                <option value="Braces">Braces / Aligners</option>
                                <option value="Extraction">Tooth Extraction</option>
                                <option value="Implants">Dental Implants</option>
                                <option value="Whitening">Teeth Whitening</option>
                            </select>
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary" style={{
                            width: '100%',
                            fontSize: '1.1rem',
                            padding: '1.2rem',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.8rem',
                            boxShadow: '0 10px 20px rgba(212, 175, 55, 0.3)',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}>
                            {loading ? 'Booking...' : 'Confirm Appointment'} {loading ? null : <ArrowRight size={20} />}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Booking;

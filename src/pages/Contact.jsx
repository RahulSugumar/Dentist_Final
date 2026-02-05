import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

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

        // Content Animation
        if (contentRef.current) {
            gsap.fromTo(contentRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 85%",
                    }
                }
            );
        }
    }, []);

    const contactDetails = [
        {
            icon: MapPin,
            title: "Visit Us",
            content: "123 ABC Street, New York, NY 10001",
            action: null
        },
        {
            icon: Phone,
            title: "Call Us",
            content: "+1 212 555 0123",
            action: "tel:+12125550123"
        },
        {
            icon: Mail,
            title: "Email Us",
            content: "info@thesmilehub.com",
            action: "mailto:info@thesmilehub.com"
        },
        {
            icon: Clock,
            title: "Opening Hours",
            content: "Mon - Sat: 10:00 AM - 8:00 PM\nSunday: By Appointment Only",
            action: null
        }
    ];

    return (
        <div className="page-contact" style={{
            overflowX: 'hidden',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 0%, #ffffff 0%, #f8f9fa 100%)',
            minHeight: '100vh'
        }}>
            {/* ... (background code omitted) ... */}

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
                {/* ... (orbs code omitted) ... */}
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
                {/* ... (hero content omitted) ... */}
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
                        Get in Touch
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        marginBottom: '2rem',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: '1.1'
                    }}>
                        We're Here to <br />
                        <span style={{
                            fontStyle: 'italic',
                            color: 'var(--color-accent)',
                            position: 'relative'
                        }}>
                            Help You Smile
                        </span>
                    </h1>
                    <p style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontSize: '1.35rem',
                        color: 'var(--color-text-secondary)',
                        fontWeight: '300'
                    }}>
                        Reach out to us for appointments, queries, or emergency dental care.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section" style={{ paddingBottom: '8rem' }}>
                <div className="container">
                    <div className="grid" ref={contentRef} style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '4rem',
                        alignItems: 'start'
                    }}>

                        {/* Contact Info Card */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '3rem',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.9)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '150px',
                                height: '150px',
                                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                                borderRadius: '0 0 0 100%',
                                pointerEvents: 'none'
                            }}></div>

                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '2rem',
                                marginBottom: '2.5rem',
                                color: 'var(--color-text-primary)'
                            }}>
                                Contact Details
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {contactDetails.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '16px',
                                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--color-accent)',
                                            border: '1px solid rgba(212, 175, 55, 0.2)',
                                            flexShrink: 0
                                        }}>
                                            <item.icon size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.1rem',
                                                marginBottom: '0.5rem',
                                                fontWeight: '600',
                                                color: 'var(--color-text-primary)'
                                            }}>
                                                {item.title}
                                            </h3>
                                            {item.action ? (
                                                <a href={item.action} style={{
                                                    fontSize: '1.05rem',
                                                    color: 'var(--color-text-secondary)',
                                                    textDecoration: 'none',
                                                    transition: 'color 0.3s ease'
                                                }}
                                                    onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                                                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                                                >
                                                    {item.content}
                                                </a>
                                            ) : (
                                                <p style={{
                                                    fontSize: '1.05rem',
                                                    color: 'var(--color-text-secondary)',
                                                    whiteSpace: 'pre-line',
                                                    margin: 0
                                                }}>
                                                    {item.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '3rem' }}>
                                <a href="https://wa.me/12125550123" target="_blank" rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{
                                        display: 'inline-flex',
                                        gap: '0.8rem',
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        fontSize: '1rem',
                                        borderRadius: '16px'
                                    }}
                                >
                                    <MessageCircle size={20} /> Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Map Container */}
                        <div style={{
                            height: '100%',
                            minHeight: '600px',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.9)',
                            position: 'relative'
                        }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976373946229!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '600px', filter: 'grayscale(0.2) contrast(1.1)' }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Google Map"
                            ></iframe>

                            {/* Map Overlay Badge */}
                            <div style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '20px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                padding: '1rem 1.5rem',
                                borderRadius: '16px',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem'
                            }}>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#22c55e',
                                    boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.2)'
                                }}></div>
                                <span style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '0.9rem' }}>Open Now</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

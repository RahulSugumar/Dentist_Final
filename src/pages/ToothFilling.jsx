import React, { useEffect, useRef } from 'react';
import { PenTool, Check, ArrowRight, Shield, Clock, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toothFillingImg from '../assets/dentist-examining-patient-teeth-with-mouth-mirror.jpg';

gsap.registerPlugin(ScrollTrigger);

const ToothFilling = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(heroRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
        );

        gsap.fromTo(contentRef.current.children,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 80%"
                }
            }
        );
    }, []);

    const benefits = [
        { icon: Shield, title: "Prevents Decay", desc: "Stops cavity progression and protects the tooth structure." },
        { icon: Clock, title: "Long Lasting", desc: "Durable materials that withstand daily chewing forces." },
        { icon: Smile, title: "Natural Look", desc: "Composite fillings blend seamlessly with your natural teeth." }
    ];

    return (
        <div className="page-tooth-filling" style={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '60vh',
                minHeight: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginTop: '0' // Adjusted for fixed navbar
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: -1
                }}>
                    <img
                        src={toothFillingImg}
                        alt="Tooth Filling Procedure"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'brightness(0.4)'
                        }}
                    />
                </div>

                <div className="container text-center" ref={heroRef} style={{ position: 'relative', zIndex: 1, paddingTop: '4rem' }}>
                    <span style={{
                        display: 'inline-block',
                        color: 'var(--color-accent)',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontSize: '0.9rem',
                        marginBottom: '1rem',
                        background: 'rgba(255,255,255,0.1)',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '50px',
                        backdropFilter: 'blur(5px)'
                    }}>
                        Restorative Care
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        marginBottom: '1.5rem',
                        color: 'white',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}>
                        Tooth <span style={{ color: 'var(--color-accent)' }}>Filling</span>
                    </h1>
                    <p style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        fontSize: '1.2rem',
                        opacity: 0.9,
                        fontWeight: 300
                    }}>
                        Restore the function and integrity of your teeth with our advanced, pain-free filling treatments.
                    </p>
                </div>
            </section>

            {/* Detailed Content */}
            <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
                <div className="container">
                    <div className="grid grid-2-cols" ref={contentRef} style={{ gap: '4rem', alignItems: 'start' }}>
                        <div>
                            <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Why Do You Need a Filling?</h2>
                            <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                                To treat a cavity, your dentist will remove the decayed portion of the tooth and then "fill" the area on the tooth where the decayed material was removed. Fillings are also used to repair cracked or broken teeth and teeth that have been worn down from misuse (such as from nail-biting or tooth grinding).
                            </p>

                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', marginTop: '2rem' }}>Types of Fillings We Offer:</h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '5px', borderRadius: '50%', color: 'var(--color-accent)' }}><Check size={18} /></div>
                                    <div>
                                        <strong>Composite Resins (Tooth-colored):</strong>
                                        <p style={{ fontSize: '0.9rem', margin: 0 }}>Matched to be the same color as your teeth and therefore used where a natural appearance is desired.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '5px', borderRadius: '50%', color: 'var(--color-accent)' }}><Check size={18} /></div>
                                    <div>
                                        <strong>Ceramic:</strong>
                                        <p style={{ fontSize: '0.9rem', margin: 0 }}>These fillings are made of porcelain, are more resistant to staining than composite resin material.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '5px', borderRadius: '50%', color: 'var(--color-accent)' }}><Check size={18} /></div>
                                    <div>
                                        <strong>Glass Ionomer:</strong>
                                        <p style={{ fontSize: '0.9rem', margin: 0 }}>Made of acrylic and a specific type of glass material. Commonly used for fillings below the gum line.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Benefits / CTA Card */}
                        <div style={{
                            background: 'var(--color-bg-secondary)',
                            padding: '3rem',
                            borderRadius: '24px',
                            boxShadow: 'var(--shadow-lg)',
                            position: 'sticky',
                            top: '120px'
                        }}>
                            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Benefits of Treatment</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                                {benefits.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '12px',
                                            background: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--color-accent)',
                                            boxShadow: 'var(--shadow-sm)'
                                        }}>
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{item.title}</h4>
                                            <p style={{ fontSize: '0.85rem', margin: 0 }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <p style={{ marginBottom: '1.5rem', fontWeight: '500' }}>Ready to restore your smile?</p>
                                <Link to="/booking" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
                                    Book Appointment <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ToothFilling;

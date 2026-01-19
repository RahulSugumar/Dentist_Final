import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Heart, Shield, CheckCircle, Star, Users, Clock } from 'lucide-react';
import doctorImage from '../assets/confident-doctor-clinic.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const heroRef = useRef(null);
    const bioRef = useRef(null);
    const philosophyRef = useRef(null);
    const statsRef = useRef(null);

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

        // Bio Section Animation
        if (bioRef.current) {
            const q = gsap.utils.selector(bioRef);
            const bioTl = gsap.timeline({
                scrollTrigger: {
                    trigger: bioRef.current,
                    start: "top 75%",
                }
            });

            bioTl.fromTo(q(".bio-image"),
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1 }
            )
                .fromTo(q(".bio-content > *"),
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                    "-=0.5"
                );
        }

        // Philosophy Cards Animation
        if (philosophyRef.current) {
            const q = gsap.utils.selector(philosophyRef);

            // Entrance Animation
            gsap.fromTo(q(".philosophy-card"),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: philosophyRef.current,
                        start: "top 80%",
                    },
                    onComplete: () => {
                        // Continuous Floating Animation
                        gsap.to(q(".philosophy-card"), {
                            y: -10,
                            duration: 2,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut",
                            stagger: {
                                each: 0.3,
                                from: "random"
                            }
                        });
                    }
                }
            );
        }

        // Stats Animation
        if (statsRef.current) {
            const q = gsap.utils.selector(statsRef);
            gsap.fromTo(q(".stat-item"),
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%",
                    }
                }
            );
        }

    }, []);

    return (
        <div className="page-about" style={{ overflowX: 'hidden', position: 'relative' }}>
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
                padding: '12rem 0 8rem',
                background: 'radial-gradient(circle at 50% 0%, #ffffff 0%, #f8f9fa 100%)',
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
                        background: '#ffffffff'
                    }}>
                        About Us
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        marginBottom: '2rem',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: '1.1'
                    }}>
                        Excellence in <br />
                        <span style={{
                            fontStyle: 'italic',
                            color: 'var(--color-accent)',
                            position: 'relative'
                        }}>
                            Every Smile
                        </span>
                    </h1>
                    <p style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontSize: '1.35rem',
                        color: 'var(--color-text-secondary)',
                        fontWeight: '300'
                    }}>
                        We believe that dentistry is an art form. Our mission is to provide world-class care in an environment that feels more like a sanctuary than a clinic.
                    </p>
                </div>
            </section>

            {/* Meet the Doctor Section */}
            <section className="section" ref={bioRef} style={{ padding: '6rem 0', backgroundColor: '#ffffffff' }}>
                <div className="container">
                    <div className="grid grid-2-cols" style={{ gap: '5rem', alignItems: 'center' }}>
                        {/* Image Side */}
                        <div className="bio-image" style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-1px',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
                                borderRadius: '30px',
                                zIndex: 0
                            }}></div>
                            <div style={{
                                position: 'relative',
                                borderRadius: '30px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                zIndex: 1
                            }}>
                                <img
                                    src={doctorImage}
                                    alt="Dr. Anitha Rao"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '50%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '2rem',
                                    left: '2rem',
                                    color: 'white'
                                }}>
                                    <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px' }}>Founder & Lead Specialist</p>
                                    <h3 style={{ margin: 0, fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'white' }}>Dr. Anitha Rao</h3>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="bio-content">
                            <h2 style={{ fontSize: '3rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
                                A Passion for <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>Perfection</span>
                            </h2>
                            <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                                Dr. Anitha Rao is a highly skilled dental specialist with over <strong>15 years of experience</strong> in creating beautiful smiles. A gold medalist from the Government Dental College, Chennai, she combines academic excellence with artistic vision.
                            </p>
                            <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                                She specializes in <strong style={{ color: 'var(--color-text-primary)' }}>Micro-Endodontics</strong> and <strong style={{ color: 'var(--color-text-primary)' }}>Cosmetic Dentistry</strong>, using the latest technology to ensure precise, painless treatments. Her approach is deeply rooted in empathy, ensuring that every patient feels heard, understood, and cared for.
                            </p>

                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div>
                                    <h4 style={{ fontSize: '2.5rem', color: 'var(--color-accent)', margin: 0, lineHeight: 1 }}>15+</h4>
                                    <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Exp.</span>
                                </div>
                                <div style={{ width: '1px', background: '#ddd' }}></div>
                                <div>
                                    <h4 style={{ fontSize: '2.5rem', color: 'var(--color-accent)', margin: 0, lineHeight: 1 }}>5k+</h4>
                                    <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Smiles</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section" ref={philosophyRef} style={{ background: '#fcfcfc', padding: '8rem 0' }}>
                <div className="container">
                    <div className="text-center mb-lg">
                        <span style={{
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: 'var(--color-accent)',
                            fontWeight: '700',
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>Core Values</span>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                            marginBottom: '1.5rem',
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-text-primary)',
                            lineHeight: '1.2'
                        }}>
                            Our <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Philosophy</span>
                        </h2>
                        <p style={{
                            maxWidth: '600px',
                            margin: '0 auto',
                            fontSize: '1.35rem',
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.6',
                            fontStyle: 'italic'
                        }}>
                            "Built on the pillars of trust, transparency, and technology."
                        </p>
                    </div>

                    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        {[
                            { icon: Heart, title: 'Patient Comfort', desc: 'We prioritize a pain-free and anxiety-free experience. Your comfort is our absolute priority.' },
                            { icon: Shield, title: 'Sterilization', desc: 'We follow strict international protocols (CDC & WHO guidelines) for hygiene and sterilization.' },
                            { icon: CheckCircle, title: 'Transparency', desc: 'Clear communication about treatment plans and costs with absolutely no hidden charges.' }
                        ].map((item, index) => (
                            <div key={index} className="philosophy-card" style={{
                                padding: '3rem',
                                background: 'white',
                                borderRadius: '24px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.15)';
                                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'rgba(212, 175, 55, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                    color: 'var(--color-accent)'
                                }}>
                                    <item.icon size={30} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

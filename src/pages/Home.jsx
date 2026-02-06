import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Shield, Activity, User, CheckCircle } from 'lucide-react';
import doctorImage from '../assets/confident-doctor-clinic.jpg';
import heroImage from '../assets/dentalReception.jpg';
import SmileGallery from '../components/SmileGallery';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const btnRef = useRef(null);
    const bookingCardRef = useRef(null);

    // Section Refs
    const servicesRef = useRef(null);
    const doctorRef = useRef(null);
    const testimonialsRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        // Hero Animation
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(heroRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        )
            .fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.5"
            )
            .fromTo(textRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.6"
            )
            .fromTo(btnRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5 },
                "-=0.4"
            )
            .fromTo(bookingCardRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.6"
            );

        // Booking Card Float Animation
        gsap.to(bookingCardRef.current, {
            y: -15,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1
        });

        // Hero Mouse Move Parallax
        const handleMouseMove = (e) => {
            if (!heroRef.current) return;
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to(heroRef.current.querySelector('.hero-shape'), {
                x: xPos * 2,
                y: yPos * 2,
                duration: 1,
                ease: 'power2.out'
            });

            // Parallax for the main image container
            gsap.to(heroRef.current.querySelector('.hero-visual'), {
                x: -xPos,
                y: -yPos,
                duration: 1.2,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // ScrollTrigger Animations
        // General Section Fade In
        const sections = [ctaRef]; // Removed doctorRef and testimonialsRef to handle them separately

        sections.forEach((section) => {
            if (section.current) {
                gsap.fromTo(section.current.children,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: section.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        // Doctor Section Specific Animation
        if (doctorRef.current) {
            const q = gsap.utils.selector(doctorRef);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: doctorRef.current,
                    start: "top 70%",
                }
            });

            // Image Side
            tl.fromTo(q(".doctor-image-side"),
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 2, ease: "power3.out" }
            );

            // Content Side
            tl.fromTo(q(".doctor-content-side > *"), // Select direct children
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                "-=0.5"
            );

            // List Items Stagger
            tl.fromTo(q("li"),
                { x: 20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
                "-=0.5"
            );

            // Floating Animation for Doctor Image
            gsap.to(q(".doctor-image-side"), {
                y: -20,
                duration: 1,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        }

        // Testimonials Animation
        if (testimonialsRef.current) {
            const q = gsap.utils.selector(testimonialsRef);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: testimonialsRef.current,
                    start: "top 75%",
                }
            });

            tl.fromTo(q("h2, p, span"),
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
            );

            tl.fromTo(q(".testimonial-card"),
                { y: 50, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.2)"
                },
                "-=0.4"
            );
        }

        // Special Animation for Services Section (Why Choose Us)
        if (servicesRef.current) {
            const q = gsap.utils.selector(servicesRef);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: servicesRef.current,
                    start: "top 75%",
                }
            });

            // Animate Header
            tl.fromTo(q("h2, p, span"),
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
            );

            // Animate Cards with Stagger
            tl.fromTo(q(".feature-card"),
                { y: 100, opacity: 0, rotation: 2 },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                },
                "-=0.4"
            );

            // Continuous Floating Animation for Icons
            gsap.to(q(".feature-icon"), {
                y: -10,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 0.3,
                    from: "random"
                }
            });


        }

        // Parallax Effect for Hero Background
        gsap.to(heroRef.current, {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Marquee Animation
        gsap.to(".marquee-content", {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1
        });

        // Global Ambient Animations
        const ambientTl = gsap.timeline({ repeat: -1, yoyo: true });

        // Orb 1 Animation
        gsap.to(".global-orb-1", {
            x: "20vw",
            y: "10vh",
            duration: 8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });

        // Orb 2 Animation
        gsap.to(".global-orb-2", {
            x: "-15vw",
            y: "20vh",
            duration: 10,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1
        });

        // Orb 3 Animation
        gsap.to(".global-orb-3", {
            x: "10vw",
            y: "-15vh",
            duration: 9,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.5
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };

    }, []);

    return (
        <div style={{ overflowX: 'hidden', position: 'relative' }}>
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
            <section ref={heroRef} style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                background: 'radial-gradient(circle at 15% 50%, #ffffff 0%, #fcfcfc 100%)',
                paddingTop: '80px',
                overflow: 'hidden'
            }}>
                {/* Abstract Background Shapes */}
                <div className="hero-shape" style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '50%',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="grid grid-2-cols" style={{ gap: '3rem' }}>

                        {/* Text Content */}
                        <div style={{ maxWidth: '650px', marginTop: '2.2rem' }}>


                            <h1 ref={titleRef} style={{
                                fontFamily: 'var(--font-heading)',
                                marginBottom: '1.5rem',
                                fontSize: 'clamp(3.5rem, 5vw, 5rem)',
                                lineHeight: '1.1',
                                color: 'var(--color-text-primary)'
                            }}>
                                Crafting Smiles with <br />
                                <span style={{
                                    fontStyle: 'italic',
                                    color: 'var(--color-accent)',
                                    position: 'relative',
                                    display: 'inline-block'
                                }}>
                                    Artistry & Precision
                                    <svg width="100%" height="10" viewBox="0 0 200 10" style={{ position: 'absolute', bottom: '5px', left: 0, zIndex: -1 }}>
                                        <path d="M0,5 Q100,10 200,5" stroke="rgba(212,175,55,0.3)" strokeWidth="8" fill="none" />
                                    </svg>
                                </span>
                            </h1>

                            <p ref={textRef} style={{
                                fontSize: '1.25rem',
                                marginBottom: '3rem',
                                maxWidth: '520px',
                                color: 'var(--color-text-secondary)',
                                lineHeight: '1.8',
                                fontWeight: '300'
                            }}>
                                Experience world-class dental treatments in a luxurious, pain-free environment. Where advanced technology meets compassionate care.
                            </p>

                            <div ref={btnRef} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <Link to="/booking" className="btn btn-primary" style={{
                                    padding: '1rem 2.5rem',
                                    fontSize: '1rem',
                                    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.25)'
                                }}>
                                    Book Appointment
                                </Link>
                                <Link to="/services" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: '600',
                                    color: 'var(--color-text-primary)',
                                    textDecoration: 'none',
                                    fontSize: '1rem'
                                }}>
                                    Explore Treatments <span style={{ fontSize: '1.2rem' }}>→</span>
                                </Link>
                            </div>

                            <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-heading)', lineHeight: '1' }}>500+</span>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Happy Patients</span>
                                </div>
                                <div style={{ width: '1px', height: '40px', background: '#e0e0e0' }}></div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-heading)', lineHeight: '1' }}>15+</span>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Years Experience</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Content */}
                        <div className="hero-visual" style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Hero Image Container */}
                            <div style={{
                                width: '100%',
                                maxWidth: '100%',
                                height: '100%',
                                position: 'relative',
                                zIndex: 1,
                                borderRadius: '200px 200px 20px 20px',
                                boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)',
                                overflow: 'hidden',
                                border: '4px solid rgba(255,255,255,0.4)'
                            }}>
                                <img
                                    src={heroImage}
                                    alt="Luxury Dental Clinic"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        transition: 'transform 0.5s ease-out'
                                    }}
                                />

                                {/* Glass Shine Effect */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)',
                                    pointerEvents: 'none',
                                    zIndex: 10
                                }}></div>

                                {/* Gold Ring Accent */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '100px',
                                    height: '100px',
                                    border: '2px solid var(--color-accent)',
                                    borderRadius: '50%',
                                    zIndex: 2,
                                    opacity: 0.8
                                }}></div>
                            </div>

                            {/* Quick Booking Card - Premium Glassmorphism */}
                            <div ref={bookingCardRef} style={{
                                position: 'absolute',
                                bottom: '40px',
                                left: '-60px',
                                background: 'rgba(255, 255, 255, 0.85)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                padding: '2rem',
                                borderRadius: '24px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
                                zIndex: 2,
                                maxWidth: '340px',
                                border: '1px solid rgba(255, 255, 255, 0.6)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1.5rem',
                                    background: 'rgba(212, 175, 55, 0.1)',
                                    padding: '0.35rem 0.85rem',
                                    borderRadius: '20px',
                                    width: 'fit-content',
                                    border: '1px solid rgba(212, 175, 55, 0.2)'
                                }}>
                                    <div style={{ width: '6px', height: '6px', background: 'var(--color-accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--color-accent)' }}></div>
                                    <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#8a7018', letterSpacing: '1px', textTransform: 'uppercase' }}>Accepting New Patients</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{
                                        padding: '0.85rem',
                                        background: 'linear-gradient(135deg, #d4af37 0%, #f3d578 100%)',
                                        borderRadius: '50%',
                                        boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)'
                                    }}>
                                        <Star size={22} fill="white" color="white" />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: 0, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Priority Access</p>
                                        <p style={{ fontSize: '1.35rem', fontWeight: '700', margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>Book Online</p>
                                    </div>
                                </div>

                                <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: '1.6', fontWeight: '400' }}>
                                    Experience the pinnacle of dental care. Secure your consultation with our senior specialists today.
                                </p>

                                <Link to="/booking" className="btn" style={{
                                    width: '100%',
                                    padding: '1.1rem',
                                    fontSize: '1rem',
                                    justifyContent: 'center',
                                    background: 'var(--color-text-primary)',
                                    color: 'var(--color-white)',
                                    borderRadius: '14px',
                                    fontWeight: '600',
                                    letterSpacing: '0.5px',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                    textDecoration: 'none',
                                    texthover: 'var(--color-text-primary)',
                                }}>
                                    Reserve Your Slot
                                </Link>
                            </div>

                            {/* Experience Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '10%',
                                right: '-30px',
                                background: 'var(--color-text-primary)',
                                color: 'white',
                                padding: '1rem 1.5rem',
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                zIndex: 2,
                                animation: 'float 7s ease-in-out infinite reverse'
                            }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-accent)' }}>15+</span>
                                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Years</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scrolling Marquee Section */}
            <section className="section" style={{
                background: 'radial-gradient(circle at 50% 50%, #fafafa 0%, #f0f0f0 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-20%',
                    width: '80%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
                    transform: 'rotate(-15deg)',
                    pointerEvents: 'none'
                }}></div>

                <div className="container" ref={servicesRef} style={{ position: 'relative', zIndex: 1 }}>
                    <div className="text-center mb-lg">
                        <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                            <span style={{
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                color: 'var(--color-accent)',
                                fontWeight: '700',
                                display: 'block',
                                marginBottom: '0.5rem'
                            }}>Our Promise</span>
                            <h2 style={{
                                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                                fontFamily: 'var(--font-heading)',
                                lineHeight: '1.2',
                                color: 'var(--color-text-primary)',
                                position: 'relative',
                                display: 'inline-block'
                            }}>
                                Redefining <span style={{
                                    background: 'linear-gradient(135deg, #d4af37 0%, #f3d578 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontStyle: 'italic'
                                }}>Excellence</span>
                            </h2>
                        </div>
                        <p style={{
                            maxWidth: '600px',
                            margin: '0 auto',
                            fontSize: '1.25rem',
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.8',
                            fontWeight: '300'
                        }}>
                            Where artistry meets advanced science to deliver a dental experience that is as comfortable as it is transformative.
                        </p>
                    </div>

                    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {[
                            { icon: User, title: 'Masterful Artistry', desc: 'Beyond dentistry, we practice art. Our specialists sculpt smiles that are not just healthy, but aesthetically flawless and uniquely yours.' },
                            { icon: Activity, title: 'Cutting-Edge Innovation', desc: 'Experience the future of care with AI-driven diagnostics and painless laser treatments. We bring the world’s best technology to your chair.' },
                            { icon: Shield, title: 'Uncompromising Care', desc: 'Your comfort is our obsession. From our hospital-grade sterilization to our concierge-style service, every detail is designed for your peace of mind.' }
                        ].map((item, index) => (
                            <div key={index} className="feature-card" style={{
                                padding: '3.5rem 2.5rem',
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                borderRadius: '30px',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(212,175,55,0.1)',
                                border: '1px solid rgba(255,255,255,0.8)',
                                transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'default',
                                height: '100%'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-15px)';
                                    e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(212, 175, 55, 0.2), inset 0 0 0 1px rgba(212,175,55,0.3)';
                                    const overlay = e.currentTarget.querySelector('.card-overlay');
                                    if (overlay) overlay.style.opacity = '1';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(212,175,55,0.1)';
                                    const overlay = e.currentTarget.querySelector('.card-overlay');
                                    if (overlay) overlay.style.opacity = '0';
                                }}
                            >
                                {/* Subtle Gradient Overlay on Hover */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.05), transparent 70%)',
                                    opacity: 0,
                                    transition: 'opacity 0.5s ease',
                                    pointerEvents: 'none'
                                }} className="card-overlay"></div>

                                <div className="feature-icon" style={{
                                    width: '90px',
                                    height: '90px',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #fcfcfc 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 2rem auto',
                                    color: 'var(--color-accent)',
                                    boxShadow: '0 15px 35px rgba(212, 175, 55, 0.15), inset 0 -4px 6px rgba(0,0,0,0.02), inset 0 2px 4px rgba(255,255,255,1)',
                                    border: '1px solid rgba(230, 222, 222, 1)',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <item.icon size={40} strokeWidth={1.2} />
                                    {/* Icon Glow Ring */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: '-5px',
                                        borderRadius: '50%',
                                        border: '1px solid rgba(212,175,55,0.15)',
                                        opacity: 0.5
                                    }}></div>
                                </div>

                                <h3 style={{
                                    fontSize: '1.75rem',
                                    marginBottom: '1.25rem',
                                    textAlign: 'center',
                                    fontFamily: 'var(--font-heading)',
                                    color: 'var(--color-text-primary)',
                                    letterSpacing: '-0.5px'
                                }}>
                                    {item.title}
                                </h3>

                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    textAlign: 'center',
                                    lineHeight: '1.7',
                                    fontSize: '1.05rem',
                                    fontWeight: '300',
                                    margin: 0
                                }}>
                                    {item.desc}
                                </p>

                                {/* Bottom Accent Line */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '40%',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
                                    borderRadius: '2px'
                                }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Doctor Section */}
            <section className="section" style={{ position: 'relative', overflow: 'hidden', padding: '8rem 0' }}>
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.1,
                    zIndex: -1
                }}></div>

                <div className="container" ref={doctorRef}>
                    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'center' }}>

                        {/* Image Side */}
                        <div className="doctor-image-side" style={{ position: 'relative', paddingLeft: '20px', paddingBottom: '20px' }}>
                            {/* Decorative Frame */}
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

                            {/* Main Image */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '500px',
                                borderRadius: '30px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                                zIndex: 1
                            }}>
                                <img
                                    src={doctorImage}
                                    alt="Dr. Anitha Rao"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />

                                {/* Gradient Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '40%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
                                }}></div>
                            </div>

                            {/* Experience Badge - Premium Glass */}
                            <div style={{
                                position: 'absolute',
                                bottom: '40px',
                                right: '-30px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                padding: '1.25rem 2rem',
                                borderRadius: '20px',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                border: '1px solid rgba(255,255,255,0.8)',
                                zIndex: 2,
                                animation: 'float 5s ease-in-out infinite'
                            }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'var(--color-accent)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: '0 5px 15px rgba(212, 175, 55, 0.4)'
                                }}>
                                    <CheckCircle size={28} strokeWidth={2} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.75rem', margin: 0, fontFamily: 'var(--font-heading)', lineHeight: '1', color: 'var(--color-text-primary)' }}>15+</h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Years Exp.</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="doctor-content-side">
                            <span style={{
                                display: 'inline-block',
                                color: 'var(--color-accent)',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontSize: '0.9rem',
                                marginBottom: '1rem',
                                borderBottom: '2px solid var(--color-accent)',
                                paddingBottom: '5px'
                            }}>
                                Meet The Specialist
                            </span>
                            <h2 style={{
                                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                                marginBottom: '1.5rem',
                                fontFamily: 'var(--font-heading)',
                                lineHeight: '1.2'
                            }}>
                                Dr. Anitha Rao
                            </h2>
                            <p style={{
                                fontSize: '1.15rem',
                                marginBottom: '2.5rem',
                                color: 'var(--color-text-secondary)',
                                lineHeight: '1.8',
                                fontWeight: '300'
                            }}>
                                A leading figure in modern dentistry, Dr. Rao combines <strong style={{ color: 'var(--color-text-primary)' }}>artistic vision</strong> with <strong style={{ color: 'var(--color-text-primary)' }}>clinical precision</strong>. Known for her gentle approach, she specializes in creating smiles that enhance both aesthetics and function.
                            </p>

                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                                {[
                                    'MDS in Conservative Dentistry & Endodontics',
                                    'Certified Implantologist (ICOI, USA)',
                                    'Member of Indian Dental Association',
                                    'Specialist in Pain-Free Laser Dentistry'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center" style={{ gap: '1rem' }}>
                                        <div style={{
                                            minWidth: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            background: 'rgba(212, 175, 55, 0.15)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <CheckCircle size={14} color="var(--color-accent)" strokeWidth={3} />
                                        </div>
                                        <span style={{ fontSize: '1.05rem', color: 'var(--color-text-primary)', fontWeight: '500' }}>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/about" className="btn" style={{
                                background: 'transparent',
                                color: 'var(--color-text-primary)',
                                border: '1px solid var(--color-text-primary)',
                                padding: '1rem 2.5rem',
                                borderRadius: '50px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--color-text-primary)';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--color-text-primary)';
                                }}
                            >
                                Learn More About Dr. Rao
                                <span style={{ fontSize: '1.2rem' }}>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <SmileGallery />

            {/* Testimonials Section */}
            <section className="section" style={{ position: 'relative', overflow: 'hidden', padding: '8rem 0', background: 'linear-gradient(to bottom, #ffffff, #f9f9f9)' }}>
                {/* Decorative Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '5%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}></div>

                <div className="container" ref={testimonialsRef}>
                    <div className="text-center mb-lg">
                        <span style={{
                            display: 'inline-block',
                            color: 'var(--color-accent)',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontSize: '0.9rem',
                            marginBottom: '1rem'
                        }}>
                            Testimonials
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-text-primary)',
                            marginBottom: '1rem'
                        }}>
                            Stories of <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Transformation</span>
                        </h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-secondary)', fontSize: '1.15rem', fontWeight: '300' }}>
                            Hear from our patients who have experienced the difference of world-class dental care.
                        </p>
                    </div>

                    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        {[
                            {
                                name: 'Sarah Jenkins',
                                treatment: 'Smile Makeover',
                                quote: "I never thought I could love my smile this much. Dr. Rao's attention to detail is simply unmatched. The entire experience was like visiting a spa.",
                                rating: 5
                            },
                            {
                                name: 'Michael Tan',
                                treatment: 'Dental Implants',
                                quote: "Professional, painless, and perfect results. The technology they use is incredible, and the staff makes you feel like royalty.",
                                rating: 5
                            },
                            {
                                name: 'Priya Sharma',
                                treatment: 'Invisalign',
                                quote: "Finally, a dentist I actually look forward to visiting! The clinic is stunning, and the care is genuinely compassionate. Highly recommended.",
                                rating: 5
                            }
                        ].map((item, index) => (
                            <div key={index} className="testimonial-card" style={{
                                padding: '3rem 2.5rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                boxShadow: '0 15px 40px rgba(0,0,0,0.05)',
                                border: '1px solid rgba(255,255,255,1)',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'transform 0.4s ease, box-shadow 0.4s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(212, 175, 55, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.05)';
                                }}
                            >
                                {/* Quote Watermark */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '2rem',
                                    fontSize: '8rem',
                                    fontFamily: 'serif',
                                    color: 'rgba(212, 175, 55, 0.1)',
                                    lineHeight: '1',
                                    pointerEvents: 'none'
                                }}>"</div>

                                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={18} fill="#d4af37" color="#d4af37" />
                                    ))}
                                </div>

                                <p style={{
                                    fontStyle: 'italic',
                                    marginBottom: '2rem',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: '1.8',
                                    fontSize: '1.1rem',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    "{item.quote}"
                                </p>

                                <div className="flex items-center gap-md" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                        fontWeight: '700',
                                        color: 'var(--color-text-secondary)',
                                        border: '2px solid white',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                                    }}>
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>{item.name}</h4>
                                        <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--color-accent)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.treatment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

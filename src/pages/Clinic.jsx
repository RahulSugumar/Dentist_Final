import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Stethoscope, Sparkles, Scan, Thermometer, Activity } from 'lucide-react';
import dentalReception from '../assets/dentalReception.jpg';
import modernOperatory from '../assets/modernMachines.jpg';
import sterilizationZone from '../assets/Sterelization.jpg';

gsap.registerPlugin(ScrollTrigger);

const Clinic = () => {
    const heroRef = useRef(null);
    const galleryRef = useRef(null);
    const hygieneRef = useRef(null);

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

        // Gallery Animation
        if (galleryRef.current) {
            const q = gsap.utils.selector(galleryRef);
            gsap.fromTo(q(".gallery-item"),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top 85%",
                    }
                }
            );
        }

        // Hygiene Section Animation
        if (hygieneRef.current) {
            const q = gsap.utils.selector(hygieneRef);
            gsap.fromTo(q(".hygiene-card"),
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: hygieneRef.current,
                        start: "top 80%",
                    }
                }
            );
        }
    }, []);

    const galleryImages = [
        {
            title: "Welcoming Reception",
            description: "A comfortable and calming waiting area designed for your relaxation.",
            image: dentalReception
        },
        {
            title: "Modern Operatory",
            description: "State-of-the-art dental chairs and equipment for precise treatments.",
            image: modernOperatory
        },
        {
            title: "Sterilization Zone",
            description: "Advanced Class B Autoclave ensuring 100% sterility and safety.",
            image: sterilizationZone
        }
    ];

    const hygieneFeatures = [
        {
            icon: ShieldCheck,
            title: "4-Step Sterilization",
            description: "All instruments undergo a rigorous 4-step autoclave sterilization process."
        },
        {
            icon: Sparkles,
            title: "Disposable Kits",
            description: "We use fresh, disposable gloves, masks, and suction tips for every patient."
        },
        {
            icon: Scan,
            title: "Digital X-Rays",
            description: "Advanced imaging that reduces radiation exposure by up to 90%."
        },
        {
            icon: Thermometer,
            title: "Regular Sanitization",
            description: "Clinical environment is sanitized hourly with medical-grade disinfectants."
        }
    ];

    return (
        <div className="page-clinic" style={{
            overflowX: 'hidden',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 0%, #ffffff 0%, #f8f9fa 100%)',
            minHeight: '100vh'
        }}>
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
                        Our Facility
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        marginBottom: '2rem',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: '1.1'
                    }}>
                        Modern Comfort <br />
                        <span style={{
                            fontStyle: 'italic',
                            color: 'var(--color-accent)',
                            position: 'relative'
                        }}>
                            & Advanced Care
                        </span>
                    </h1>
                    <p style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontSize: '1.35rem',
                        color: 'var(--color-text-secondary)',
                        fontWeight: '300'
                    }}>
                        Experience dental care in a hygienic, state-of-the-art environment designed for your safety and relaxation.
                    </p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="section" style={{ paddingBottom: '6rem' }}>
                <div className="container">
                    <div className="grid" ref={galleryRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                        {galleryImages.map((item, index) => (
                            <div key={index} className="gallery-item" style={{
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)',
                                overflow: 'hidden',
                                border: '1px solid rgba(255, 255, 255, 0.9)',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                position: 'relative'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 30px 60px rgba(212, 175, 55, 0.2)';
                                    e.currentTarget.querySelector('img').style.transform = 'scale(1.08)';
                                    e.currentTarget.querySelector('img').style.filter = 'brightness(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                                    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                                    e.currentTarget.querySelector('img').style.filter = 'brightness(1)';
                                }}
                            >
                                <div style={{
                                    height: '400px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    borderBottom: '4px solid var(--color-accent)'
                                }}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'all 0.8s ease',
                                            filter: 'brightness(1)'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.6) 100%)',
                                        pointerEvents: 'none'
                                    }}></div>
                                </div>
                                <div style={{
                                    padding: '2rem',
                                    position: 'relative',
                                    zIndex: 2,
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%)'
                                }}>
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '1.5rem',
                                        marginBottom: '0.5rem',
                                        color: 'var(--color-text-primary)'
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hygiene & Safety Section */}
            <section className="section" style={{ padding: '6rem 0 8rem', background: 'rgba(212, 175, 55, 0.03)' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <span style={{
                            color: 'var(--color-accent)',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontSize: '0.85rem',
                            display: 'block',
                            marginBottom: '1rem'
                        }}>
                            Safety First
                        </span>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem' }}>Hygiene & Sterilization</h2>
                    </div>

                    <div className="grid" ref={hygieneRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {hygieneFeatures.map((feature, index) => (
                            <div key={index} className="hygiene-card" style={{
                                background: 'rgba(255, 255, 255, 0.8)',
                                padding: '2.5rem',
                                borderRadius: '20px',
                                border: '1px solid rgba(255,255,255,0.6)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                                }}
                            >
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                    color: 'var(--color-accent)',
                                    border: '1px solid rgba(212, 175, 55, 0.2)'
                                }}>
                                    <feature.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.35rem',
                                    marginBottom: '1rem',
                                    color: 'var(--color-text-primary)'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Clinic;

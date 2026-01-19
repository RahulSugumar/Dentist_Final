import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, PenTool, Microscope, Smile, Wrench, Hammer, Gem, Check, ArrowRight } from 'lucide-react';
import teethCleaningImg from '../assets/smiling-young-man-sitting-dentist-chair-while-doctor-examining-his-teeth.jpg';
import toothFillingImg from '../assets/dentist-examining-patient-teeth-with-mouth-mirror.jpg';
import rootCanalImg from '../assets/rootcanal.jpg';
import bracesImg from '../assets/braces.jpg';
import toothExtractionImg from '../assets/tooth extraction.jpg';
import dentalImplantsImg from '../assets/dental-implants.jpg';
import cosmeticDentistryImg from '../assets/cosmetics.jpg';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
    {
        title: 'Teeth Cleaning',
        description: 'Professional scaling and polishing to remove plaque and tartar, ensuring healthy gums and fresh breath.',
        image: teethCleaningImg,
        icon: Sparkles,
        features: ['Painless Scaling', 'Stain Removal', 'Gum Health Check', 'Polishing']
    },
    {
        title: 'Tooth Filling',
        description: 'Restoring decayed or damaged teeth with tooth-colored composite materials for a natural look.',
        image: toothFillingImg,
        icon: PenTool,
        features: ['Composite Material', 'Natural Look', 'Cavity Protection', 'Long-lasting']
    },
    {
        title: 'Root Canal Treatment',
        description: 'Painless procedure to save infected teeth by removing the pulp and sealing the root canals.',
        image: rootCanalImg,
        icon: Microscope,
        features: ['Infection Removal', 'Tooth Preservation', 'Modern Anesthesia', 'Single Visit Option']
    },
    {
        title: 'Braces / Aligners',
        description: 'Straighten your teeth with traditional metal braces or invisible aligners for a perfect smile.',
        image: bracesImg,
        icon: Smile,
        features: ['Invisalign Options', 'Metal Braces', 'Retainers', 'Custom Treatment Plan']
    },
    {
        title: 'Tooth Extraction',
        description: 'Safe and painless removal of damaged or wisdom teeth when restoration is not possible.',
        image: toothExtractionImg,
        icon: Wrench,
        features: ['Wisdom Teeth', 'Painless Removal', 'Quick Recovery', 'Sedation Available']
    },
    {
        title: 'Dental Implants',
        description: 'Permanent solution for missing teeth using titanium posts that look and feel like natural teeth.',
        image: dentalImplantsImg,
        icon: Hammer,
        features: ['Titanium Posts', 'Natural Feel', 'Permanent Solution', 'Bone Preservation']
    },
    {
        title: 'Cosmetic Dentistry',
        description: 'Smile makeovers including veneers, teeth whitening, and gum contouring.',
        image: cosmeticDentistryImg,
        icon: Gem,
        features: ['Veneers', 'Teeth Whitening', 'Smile Design', 'Gum Contouring']
    }
];

const Services = () => {
    const heroRef = useRef(null);
    const gridRef = useRef(null);

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

        // Services Grid Animation
        if (gridRef.current) {
            const q = gsap.utils.selector(gridRef);
            gsap.fromTo(q(".service-card"),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                    }
                }
            );
        }
    }, []);

    return (
        <div className="page-services" style={{
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
                        Our Expertise
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        marginBottom: '2rem',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: '1.1'
                    }}>
                        World-Class <br />
                        <span style={{
                            fontStyle: 'italic',
                            color: 'var(--color-accent)',
                            position: 'relative'
                        }}>
                            Treatments
                        </span>
                    </h1>
                    <p style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontSize: '1.35rem',
                        color: 'var(--color-text-secondary)',
                        fontWeight: '300'
                    }}>
                        Comprehensive dental care powered by advanced technology and a gentle touch.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section" style={{ paddingBottom: '8rem' }}>
                <div className="container">
                    <div className="grid" ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
                        {servicesList.map((service, index) => (
                            <div key={index} className="service-card" style={{
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid rgba(255, 255, 255, 0.9)'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.15)';
                                    e.currentTarget.querySelector('.floating-icon').style.transform = 'scale(1.1) rotate(5deg)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                                    e.currentTarget.querySelector('.floating-icon').style.transform = 'scale(1) rotate(0deg)';
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '240px',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    {/* Floating Icon Badge */}
                                    <div className="floating-icon" style={{
                                        position: 'absolute',
                                        bottom: '-15px',
                                        right: '30px',
                                        width: '60px',
                                        height: '60px',
                                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                                        border: '1px solid rgba(212, 175, 55, 0.2)',
                                        color: 'var(--color-accent)',
                                        transition: 'all 0.4s ease',
                                        zIndex: 2
                                    }}>
                                        <service.icon size={28} strokeWidth={1.5} />
                                    </div>
                                </div>

                                <div style={{ padding: '3rem 2rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{
                                        marginBottom: '1rem',
                                        color: 'var(--color-text-primary)',
                                        fontSize: '1.75rem',
                                        fontFamily: 'var(--font-heading)',
                                        fontWeight: '700'
                                    }}>
                                        {service.title}
                                    </h3>
                                    <p style={{
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: '1.7',
                                        fontSize: '1.05rem',
                                        marginBottom: '1.5rem',
                                        fontFamily: 'var(--font-body)'
                                    }}>
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <ul style={{
                                        listStyle: 'none',
                                        marginBottom: '2rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.8rem'
                                    }}>
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.8rem',
                                                fontSize: '0.95rem',
                                                color: 'var(--color-text-primary)',
                                                fontWeight: '500'
                                            }}>
                                                <div style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    background: 'rgba(212, 175, 55, 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'var(--color-accent)'
                                                }}>
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div style={{ marginTop: 'auto' }}>
                                        <button style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--color-accent)',
                                            fontWeight: '700',
                                            fontSize: '0.9rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            padding: 0,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            Learn More <ArrowRight size={16} />
                                        </button>
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

export default Services;

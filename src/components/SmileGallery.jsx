import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import beforeImage from '../assets/teeth pain.png';
import afterImage from '../assets/teeth treated.png';

gsap.registerPlugin(ScrollTrigger);

const SmileGallery = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const [sliderValue, setSliderValue] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        gsap.fromTo(section.querySelectorAll('.animate-up'),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                }
            }
        );

        return () => {
            // Cleanup if needed
        };
    }, []);

    const handleMove = (clientX) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderValue(percentage);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleMove(e.clientX);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (isDragging) {
                handleMove(e.clientX);
                e.preventDefault(); // Prevent selection
            }
        };

        const handleGlobalMouseUp = () => {
            setIsDragging(false);
        };

        const handleGlobalTouchMove = (e) => {
            if (isDragging) {
                handleMove(e.touches[0].clientX);
            }
        };

        const handleGlobalTouchEnd = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
            window.addEventListener('mouseup', handleGlobalMouseUp);
            window.addEventListener('touchmove', handleGlobalTouchMove);
            window.addEventListener('touchend', handleGlobalTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('touchmove', handleGlobalTouchMove);
            window.removeEventListener('touchend', handleGlobalTouchEnd);
        };
    }, [isDragging]);

    // Use placeholder images from generous Unsplash photographers if local ones aren't perfect pairs


    return (
        <section ref={sectionRef} className="section" style={{
            position: 'relative',
            padding: '8rem 0',
            background: 'radial-gradient(circle at 50% 50%, #fafafa 0%, #f0f0f0 100%)',
            overflow: 'hidden'
        }}>
            {/* Background Decor */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }}></div>

            <div className="container">
                <div className="text-center mb-lg animate-up">
                    <span style={{
                        display: 'inline-block',
                        color: 'var(--color-accent)',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                    }}>
                        Results That Speak
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-text-primary)',
                        marginBottom: '1rem'
                    }}>
                        The Art of <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Transformation</span>
                    </h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-secondary)', fontSize: '1.15rem', fontWeight: '300' }}>
                        Drag the slider to see how we transform smiles with precision and artistry.
                    </p>
                </div>

                {/* Slider Container */}
                <div className="animate-up" style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    position: 'relative',
                    borderRadius: '24px',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                    border: '8px solid white',
                    overflow: 'hidden',
                    background: 'white'
                }}>
                    <div
                        ref={sliderRef}
                        style={{ position: 'relative', height: '500px', cursor: 'ew-resize', userSelect: 'none' }}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                    >
                        {/* Before Image (Background) */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}>
                            <img src={beforeImage} draggable={false} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)' }} />
                            <span style={{
                                position: 'absolute',
                                top: '2rem',
                                left: '2rem',
                                background: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                letterSpacing: '1px'
                            }}>BEFORE</span>
                        </div>

                        {/* After Image (Foreground, clipped) */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            clipPath: `inset(0 ${100 - sliderValue}% 0 0)`
                        }}>
                            <img src={afterImage} draggable={false} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <span style={{
                                position: 'absolute',
                                top: '2rem',
                                right: '2rem',
                                background: 'var(--color-accent)',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                letterSpacing: '1px'
                            }}>AFTER</span>
                        </div>

                        {/* Slider Handle */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: `${sliderValue}%`,
                            width: '4px',
                            background: 'white',
                            zIndex: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                color: 'var(--color-accent)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                    <ArrowLeft size={14} />
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Stats/Info under slider */}
                <div className="grid grid-3-cols animate-up" style={{
                    marginTop: '4rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    textAlign: 'center'
                }}>
                    {[
                        { label: 'Smile Makeovers', value: '1,200+' },
                        { label: 'Patient Satisfaction', value: '99.8%' },
                        { label: 'Award Winning', value: 'Excellence' }
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            padding: '2rem',
                            background: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            border: '1px solid rgba(0,0,0,0.03)'
                        }}>
                            <h3 style={{
                                fontSize: '2.5rem',
                                color: 'var(--color-accent)',
                                lineHeight: '1',
                                marginBottom: '0.5rem',
                                fontFamily: 'var(--font-heading)'
                            }}>{item.value}</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SmileGallery;

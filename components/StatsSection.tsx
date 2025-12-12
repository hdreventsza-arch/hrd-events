import React, { useEffect, useState, useRef } from 'react';
import { School, Briefcase, Globe } from 'lucide-react';

const stats = [
    {
        id: 1,
        label: 'Partner Schools',
        value: 46,
        suffix: '',
        icon: School,
    },
    {
        id: 2,
        label: 'Years of Experience',
        value: 15,
        suffix: '+',
        icon: Briefcase,
    },
    {
        id: 3,
        label: 'Countries Recruited',
        value: 7,
        suffix: '',
        icon: Globe,
    },
];

const StatsSection: React.FC = () => {
    const [counts, setCounts] = useState(stats.map(() => 0));
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Only trigger once
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            const duration = 2000; // 2 seconds animation
            const steps = 60;
            const interval = duration / steps;

            const timers = stats.map((stat, index) => {
                let currentStep = 0;
                return setInterval(() => {
                    currentStep++;
                    if (currentStep <= steps) {
                        setCounts((prevCounts) => {
                            const newCounts = [...prevCounts];
                            const progress = currentStep / steps;
                            // Ease-out function: 1 - pow(1 - progress, 3)
                            const easeOut = 1 - Math.pow(1 - progress, 3);
                            newCounts[index] = Math.floor(stat.value * easeOut);
                            return newCounts;
                        });
                    } else {
                        // Ensure final value is exact
                        setCounts((prevCounts) => {
                            const newCounts = [...prevCounts];
                            newCounts[index] = stat.value;
                            return newCounts;
                        });
                    }
                }, interval);
            });

            return () => timers.forEach(clearInterval);
        }
    }, [isVisible]);

    return (
        <section
            ref={sectionRef}
            className={`py-20 md:py-28 bg-white relative overflow-hidden transition-opacity duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
        >
            {/* Background Decor - Subtle Navy/Gold mix to tie in with Hero */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.id}
                                className="group p-6 rounded-xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(10,42,67,0.06)] hover:border-gold/30 transition-all duration-300 text-center transform hover:-translate-y-1"
                            >
                                <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-navy/5 text-navy group-hover:bg-navy group-hover:text-gold transition-colors duration-300">
                                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-2">
                                    {counts[index]}{stat.suffix}
                                </h3>

                                <p className="text-gray-500 font-medium text-sm tracking-wide uppercase">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;

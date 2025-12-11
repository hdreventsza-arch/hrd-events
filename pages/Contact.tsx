import React from 'react';
import { Section, SEO, Card } from '../components/UI';
import { Mail, User, Clock, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <>
            <SEO
                title="Contact Us | HDR Events Recruitment"
                description="Get in touch with HDR Events. We are here to help schools and teachers finding their perfect match."
                keywords="contact hdr events, recruitment support, education inquiries"
                url="/contact"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "HDR Events",
                        "email": "recruitment@hdrevents.com"
                    }
                }}
            />

            {/* HEADER - Polished with Gold Accent */}
            <div className="bg-navy pt-32 md:pt-48 pb-24 md:pb-40 text-center px-6 relative overflow-hidden">
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(rgba(205, 163, 73, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(205, 163, 73, 0.4) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-[#051724] opacity-80"></div>

                <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">Contact HDR Events</h1>
                    <div className="w-24 h-1 bg-gold mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(205,163,73,0.5)]"></div>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        We’re here to support schools and educators every step of the way. <br className="hidden md:block" /> Reach out to us with any questions.
                    </p>
                </div>
            </div>

            {/* CONTACT CARDS - Uniform Grid Layout */}
            <Section bg="white" className="-mt-24 relative z-20 pt-0 md:pt-0 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* General Inquiries */}
                    <ContactCard
                        icon={<Mail size={28} strokeWidth={1} />}
                        title="General Inquiries"
                        email="recruitment@hdrevents.com"
                        label="Recruitment Team"
                        delay={0}
                    />

                    {/* Errol */}
                    <ContactCard
                        icon={<User size={28} strokeWidth={1} />}
                        title="Errol Ruiters"
                        email="errol@hdrevents.com"
                        label="Director"
                        delay={150}
                    />

                    {/* Hazel */}
                    <ContactCard
                        icon={<User size={28} strokeWidth={1} />}
                        title="Hazel Davids-Ruiters"
                        email="hazel@hdrevents.com"
                        label="Director"
                        delay={300}
                    />
                </div>
            </Section>

            {/* OFFICE HOURS - Centered Info Card */}
            <Section bg="lightGrey">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="bg-white rounded-lg shadow-md p-10 md:p-14 border-t-4 border-gold">
                        <div className="inline-flex p-4 bg-navy/5 rounded-full mb-6 text-navy">
                            <Clock size={40} strokeWidth={1} />
                        </div>

                        <h3 className="text-3xl font-serif font-bold text-navy mb-4">Office Hours</h3>
                        <div className="w-12 h-1 bg-gold mx-auto mb-8 rounded-full"></div>

                        <div className="flex flex-col items-center space-y-2 mb-10">
                            <p className="text-xl font-bold text-navy tracking-wide">Monday – Friday</p>
                            <p className="text-charcoal text-lg font-light">
                                9:00 AM – 5:00 PM <span className="inline-block bg-navy text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ml-2 align-middle">GMT+3</span>
                            </p>
                        </div>

                        <div className="pt-8 border-t border-gray-100 w-full max-w-md mx-auto">
                            <p className="text-gray-400 text-sm italic font-light">We aim to respond to all inquiries within 24 hours during business days.</p>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};

interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    email: string;
    label?: string;
    delay?: number;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, email, label, delay = 0 }) => (
    <div
        className="bg-white p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(10,42,67,0.12)] transition-all duration-300 border border-gray-100 hover:border-gold/30 h-full flex flex-col items-center text-center group transform hover:-translate-y-2"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-colors duration-300 shadow-sm">
            {icon}
        </div>

        <div className="mb-6">
            <h3 className="text-xl font-bold text-navy font-serif mb-1">{title}</h3>
            {label && <p className="text-xs text-gold font-bold uppercase tracking-[0.15em]">{label}</p>}
        </div>

        <div className="mt-auto w-full">
            <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center space-x-2 text-charcoal hover:text-navy font-medium text-sm transition-all py-2 px-4 rounded-lg bg-gray-50 hover:bg-gold hover:text-white w-full group-hover:shadow-md"
            >
                <span>{email}</span>
                <ArrowRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </a>
        </div>
    </div>
);

export default Contact;
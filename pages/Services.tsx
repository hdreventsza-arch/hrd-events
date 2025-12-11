import React, { useState } from 'react';
import { Section, SEO, Button, SectionHeading, Card } from '../components/UI';
import ApplicationForm from '../components/ApplicationForm';
import { ClipboardList, UserCheck, CalendarCheck, Plane, ChevronDown, ChevronUp, CheckCircle, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Our Services | Recruitment for Schools & Teachers | HDR Events"
        description="We provide comprehensive recruitment services including candidate screening, interview coordination, and placement support for international schools."
        keywords="recruitment services, teacher placement, school staffing, ed-tech recruitment"
        url="/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Teacher Recruitment",
          "provider": {
            "@type": "Organization",
            "name": "HDR Events",
            "url": "https://hdrevents.com"
          },
          "areaServed": "Global",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Recruitment Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "For Schools: Staffing Solutions"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "For Teachers: Job Placement"
                }
              }
            ]
          }
        }}
      />

      {/* HEADER - Premium Spacing and Typography */}
      <header className="bg-navy pt-32 md:pt-48 pb-20 md:pb-32 px-6 md:px-12 lg:px-24 relative overflow-hidden text-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(rgba(205, 163, 73, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent opacity-5"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
            Apply to Teach <span className="text-gold italic font-serif block mt-2 md:inline md:mt-0">Internationally</span>
          </h1>
          <div className="w-24 h-1.5 bg-gold mx-auto rounded-full"></div>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Submit your application and our recruitment team will match you with opportunities in reputable international schools.
          </p>
          <div className="pt-10">
            <Button onClick={scrollToForm} variant="accent">
              Start Application ↓
            </Button>
          </div>
        </div>
      </header>

      {/* HOW OUR PROCESS WORKS - Premium Cards with Staggered Animation */}
      <Section bg="white">
        <SectionHeading align="center">How Our Process Works</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>

          {[
            {
              icon: <ClipboardList className="h-8 w-8" strokeWidth={1} />,
              title: "Submit Application",
              text: "Upload your personal details, teaching experience, and documents."
            },
            {
              icon: <UserCheck className="h-8 w-8" strokeWidth={1} />,
              title: "Profile Review",
              text: "We evaluate your qualifications and match them with suitable schools."
            },
            {
              icon: <CalendarCheck className="h-8 w-8" strokeWidth={1} />,
              title: "Interview Coordination",
              text: "We arrange interviews with schools aligned to your background."
            },
            {
              icon: <Plane className="h-8 w-8" strokeWidth={1} />,
              title: "Onboarding Support",
              text: "We assist with contracts, visa processes, and relocation steps."
            }
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(10,42,67,0.08)] hover:-translate-y-1 transition-all duration-500 group flex flex-col items-center text-center h-full"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center z-10 text-navy transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 bg-navy text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm font-sans">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-navy font-serif mb-4 group-hover:text-gold transition-colors">{step.title}</h3>
              <p className="text-charcoal/80 leading-relaxed text-sm font-light">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHY TEACHERS CHOOSE HDR EVENTS - Value Cards */}
      <Section bg="lightGrey">
        <SectionHeading align="center">Why Teachers Choose Us</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
          {[
            "15+ years of Middle East experience",
            "Partnerships with reputable international schools",
            "Transparent recruitment process",
            "Personalized job matching",
            "Free service for teachers"
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold hover:shadow-md transition-all duration-300 flex items-center space-x-4 group"
            >
              <div className="flex-shrink-0 bg-navy/5 p-2 rounded-full group-hover:bg-navy transition-colors duration-300">
                <CheckCircle className="w-5 h-5 text-navy group-hover:text-gold transition-colors duration-300" strokeWidth={2} />
              </div>
              <span className="font-semibold text-navy text-base md:text-lg leading-snug font-serif">{benefit}</span>
            </div>
          ))}

          {/* Last card placeholder to balance grid or call to action */}
          <div className="bg-navy p-6 rounded-lg shadow-md border-l-4 border-gold flex items-center justify-between group cursor-pointer" onClick={scrollToForm}>
            <span className="font-bold text-white text-lg font-serif">Ready to apply?</span>
            <div className="bg-white/10 p-2 rounded-full group-hover:bg-gold group-hover:text-navy transition-all">
              <ArrowRight className="w-5 h-5 text-white group-hover:text-navy" />
            </div>
          </div>
        </div>
      </Section>

      {/* APPLICATION FORM SECTION - Polished Container */}
      <Section id="application-form" bg="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">Start Your Application</h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
          </div>

          <ApplicationForm />
        </div>
      </Section>

      {/* FAQ ACCORDION - Refined */}
      <Section bg="lightGrey">
        <div className="max-w-3xl mx-auto">
          <SectionHeading align="center">Frequently Asked Questions</SectionHeading>

          <div className="space-y-4 mt-12">
            {[
              { q: "Is this service free for teachers?", a: "Yes — HDR Events does not charge teachers for placement. Our fees are covered by the recruiting institutions." },
              { q: "What qualifications do I need?", a: "Requirements vary by school, but generally, you need a relevant degree and teaching qualification (PGCE, B.Ed, etc.). Upload your documents and we will advise you on your eligibility." },
              { q: "Which countries do you recruit for?", a: "We primarily recruit for the Middle Eastern regions (UAE, Qatar, Saudi Arabia, etc.), with expansion into other global territories currently underway." }
            ].map((item, idx) => (
              <AccordionItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-lg transition-all duration-300 overflow-hidden ${isOpen ? 'shadow-lg ring-1 ring-gold/30' : 'shadow-sm hover:shadow-md'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none bg-white"
      >
        <span className={`font-bold text-lg font-serif tracking-tight transition-colors ${isOpen ? 'text-navy' : 'text-navy/80'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-6 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${isOpen ? 'bg-navy border-navy text-white rotate-180' : 'bg-transparent border-gray-200 text-gold'}`}>
          <ChevronDown size={18} strokeWidth={2} />
        </div>
      </button>
      <div
        className={`px-8 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <p className="text-charcoal/70 leading-loose text-base border-t border-gray-100 pt-4 font-light">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default Services;
import React from 'react';
import { Section, Button, SEO, Card } from '../components/UI';
import StatsSection from '../components/StatsSection';
import { ArrowRight, Globe, School, UserCheck, Star, Quote } from 'lucide-react';

const Home: React.FC = () => {
  const scrollToSchools = () => {
    const element = document.getElementById('schools-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Global Teacher Recruitment | HDR Events"
        description="HDR Events connects qualified educators with top international schools worldwide. We specialize in finding the perfect match for teachers and schools."
        keywords="teacher recruitment, international schools, education jobs, teaching abroad, global recruitment"
        image="/hdr-logo-v2.png"
        url="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "HDR Events",
          "url": "https://hdrevents.com",
          "logo": "https://hdrevents.com/hdr-logo-v2.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "recruitment@hdrevents.com"
          },
          "sameAs": ["https://linkedin.com/company/hdrevents"]
        }}
      />

      {/* HERO SECTION - Premium Dark Corporate Theme with Animations */}
      <section className="relative min-h-[90vh] flex items-center bg-[#0A2A43] overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
        {/* ... Hero Content ... */}
        {/* Background Layer: Deep Navy & Gold Accents */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* 1. Base Gradient: Deep Luxury Navy */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F3550] via-[#0A2A43] to-[#051724]"></div>

          {/* 2. Texture: Subtle Professional Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at center, black, transparent 70%)'
          }}></div>

          {/* 3. Depth: Atmospheric Glows with subtle pulse */}
          {/* Soft Gold Highlight (Top Right) */}
          <div className="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px] opacity-40 mix-blend-screen animate-pulse-slow"></div>
          {/* Cool Blue Depth (Bottom Left) */}
          <div className="absolute -bottom-[10%] -left-[10%] w-[700px] h-[700px] bg-[#1a4c76]/20 rounded-full blur-[100px] opacity-30"></div>

          {/* 4. Connectivity Rings - Rotating slowly */}
          <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full animate-spin-slower"></div>
          <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-[900px] h-[900px] border border-dashed border-white/5 rounded-full opacity-30 animate-spin-reverse-slower"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text Content */}
          <div className="space-y-10 animate-fade-in-up text-center lg:text-left order-2 lg:order-1">
            {/* Badge - Adjusted for Dark Mode */}
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-lg mb-4 mx-auto lg:mx-0">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-200">Established 2015</span>
            </div>

            {/* Heading - High Contrast White & Gold */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white font-bold leading-[1.1] tracking-tight drop-shadow-sm">
              Global Teacher <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Recruitment</span>
              <span className="text-gold italic ml-3 font-serif">Done Right.</span>
            </h1>

            {/* Paragraph - Light Grey for readability */}
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed pl-0 lg:pl-6 border-l-0 lg:border-l-4 border-gold/50">
              Connecting qualified educators with reputable international schools.
              <span className="block mt-2 font-medium text-white">Professional. Personal. Reliable.</span>
            </p>

            {/* Buttons - Updated to new Style System */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              {/* Primary Action on Dark BG = Accent (Gold) for Visibility */}
              <Button
                to="/services"
                variant="accent"
              >
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {/* Secondary Action on Dark BG = Secondary (Gold Border) */}
              <Button
                onClick={scrollToSchools}
                variant="secondary"
              >
                For Schools
              </Button>
            </div>

            {/* Trust Indicators - Lighter text for dark bg */}
            <div className="pt-8 flex items-center justify-center lg:justify-start space-x-10 text-gray-400">
              <div className="flex items-center space-x-3 group">
                <Globe className="h-5 w-5 text-gold group-hover:text-white transition-colors" />
                <span className="text-sm font-semibold tracking-wide group-hover:text-white transition-colors">Global Network</span>
              </div>
              <div className="h-5 w-px bg-white/20"></div>
              <div className="flex items-center space-x-3 group">
                <UserCheck className="h-5 w-5 text-gold group-hover:text-white transition-colors" />
                <span className="text-sm font-semibold tracking-wide group-hover:text-white transition-colors">Vetted Talent</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Updated for Dark Theme with Animations */}
          <div className="hidden lg:flex justify-center items-center relative order-1 lg:order-2 animate-fade-in-up-delay">
            <div className="relative w-[540px] h-[540px]">
              {/* Concentric Rings - Subtle Orbit/Ripple Animations */}
              <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slower"></div>
              <div className="absolute inset-12 rounded-full border border-white/5 border-dashed animate-spin-reverse-slower"></div>
              {/* Changed border-gold/20 to border-white/10 to remove potential reddish color blending issues */}
              <div className="absolute inset-24 rounded-full border border-white/10 animate-pulse-slow"></div>

              {/* Central Circle - Deep Gradient Globe with Rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 bg-gradient-to-br from-[#153E5C] to-[#051724] rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group border border-white/10">
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>

                  {/* Globe Icon - Slow Rotation - Pure White */}
                  <div className="animate-spin-slower">
                    <Globe className="w-36 h-36 text-white relative z-10" strokeWidth={1} />
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine left-0" />
                </div>
              </div>

              {/* Floating Cards - Micro-floating Animation */}
              <div className="absolute top-[18%] right-[2%] bg-white px-5 py-4 rounded-lg shadow-xl flex items-center space-x-4 animate-float border border-gray-100 z-20">
                <div className="bg-gold/10 p-2.5 rounded-full">
                  <Star className="w-5 h-5 text-gold fill-current" />
                </div>
                <div>
                  <p className="text-navy font-bold text-xs uppercase tracking-wider">Top Tier</p>
                  <p className="text-gray-500 text-xs mt-0.5">Schools & Educators</p>
                </div>
              </div>

              <div className="absolute bottom-[22%] left-[2%] bg-white px-5 py-4 rounded-lg shadow-xl flex items-center space-x-4 animate-float-delayed border border-gray-100 z-20">
                <div className="bg-navy/10 p-2.5 rounded-full">
                  <School className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <p className="text-navy font-bold text-xs uppercase tracking-wider">Trusted</p>
                  <p className="text-gray-500 text-xs mt-0.5">Recruitment Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY STATS SECTION */}
      <StatsSection />

      {/* MESSAGE FROM THE DIRECTORS */}
      <Section bg="lightGrey">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center relative overflow-visible border-t-4 border-t-gold">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="p-4 bg-white rounded-full shadow-md border border-gray-100">
                <Quote className="h-8 w-8 text-navy" />
              </div>
            </div>

            <div className="pt-10 px-4 md:px-12 pb-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy leading-tight mb-8">Message from the Directors</h2>

              <div className="text-lg md:text-xl text-charcoal/80 leading-loose font-light space-y-6">
                <p>
                  "As the founders and sole proprietors of HDR Events since 2015, we are proud to introduce a new chapter in our company’s journey: expanding our services to include global teacher recruitment."
                </p>
                <p>
                  "Our years of experience and commitment to excellence drive us as we support both schools and educators in finding the right professional match."
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center">
                <p className="font-serif text-2xl font-bold text-navy">Errol Ruiters & Hazel Davids-Ruiters</p>
                <p className="text-xs text-gold font-bold uppercase tracking-[0.2em] mt-2">Founders</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* FOR INTERNATIONAL SCHOOLS */}
      <Section id="schools-section" bg="white">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-navy/5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-navy"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-navy">For Institutions</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy leading-[1.15]">
              Supporting Schools <br />
              <span className="text-gold italic">Worldwide</span>
            </h2>

            <p className="text-lg text-charcoal/80 leading-loose font-light">
              At HDR Events, we understand that the success of your school rests on the quality of the educators you bring into your community. Our mission is to streamline your hiring process by presenting outstanding teaching professionals who meet your academic standards and align with your values.
            </p>

            <div className="bg-[#F8F9FB] p-8 rounded-lg border-l-4 border-gold">
              <p className="text-navy italic font-medium text-lg leading-relaxed">
                "We recommend candidates who are not only technically qualified but are prepared to flourish in your educational setting."
              </p>
            </div>

            <div className="pt-6">
              <Button onClick={() => window.location.href = 'mailto:recruitment@hdrevents.com'} variant="primary">
                Contact for Recruitment
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              { title: "Rigorous Vetting", desc: "Detailed background and qualification checks." },
              { title: "Cultural Fit Assessment", desc: "Ensuring alignment with your school's values." },
              { title: "Long-term Retention", desc: "Focusing on candidates committed to growth." },
              { title: "Global Talent Pool", desc: "Access to educators from top regions." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-6 hover:shadow-lg hover:border-gold/30 transition-all duration-300 group">
                <div className="flex-shrink-0 bg-navy/5 p-3 rounded-full text-navy mt-1 group-hover:bg-navy group-hover:text-white transition-colors">
                  <Star className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy font-serif mb-2 group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FOR APPLICANTS */}
      <Section bg="navy" className="text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full mb-2">
            <UserCheck className="h-8 w-8 text-gold" strokeWidth={1.5} />
          </div>

          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Opportunities for Teachers</h2>

          <div className="space-y-8 text-xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto">
            <p>
              With more than 15 years of experience living and working across the Middle East, we have developed a strong network of reputable partner schools throughout the region.
            </p>
            <p>
              This insight allows us to guide qualified teachers toward positions that suit their expertise and career aspirations. Our goal is to help you navigate the international recruitment landscape with confidence.
            </p>
          </div>

          <div className="pt-10">
            {/* Secondary/Accent style for Navy Background */}
            <Button to="/services" variant="accent" className="px-10">
              Start Your Application
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;

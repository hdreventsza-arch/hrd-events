import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F4F1EB] text-[#0A2A43] pt-24 pb-12 border-t border-[rgba(205,163,73,0.45)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-20 mb-20">
          <div className="md:col-span-5 space-y-8">
            <Link to="/" className="inline-block">
              <img src="/hdr-logo-v2.png" alt="HDR Events" className="h-20 w-auto opacity-100 transition-opacity" loading="lazy" />
            </Link>
            <p className="text-[#4A5A68] text-sm leading-relaxed max-w-sm font-light">
              Connecting qualified educators with reputable international schools.
              Built on trust, professionalism, and global expertise.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-8">
            <h3 className="text-xs font-bold text-navy tracking-widest uppercase mb-6">Explore</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Services', path: '/services' },
                { name: 'Start Application', path: '/services' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-[#4A5A68] hover:text-navy transition-colors text-sm inline-block tracking-wide hover:translate-x-1 duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3 space-y-8">
            <h3 className="text-xs font-bold text-navy tracking-widest uppercase mb-6">Contact</h3>
            <div className="space-y-5">
              <a href="mailto:recruitment@hdrevents.com" className="flex items-center text-[#4A5A68] hover:text-navy transition-colors text-sm group">
                <span className="mr-4 text-gold/80 group-hover:text-gold transition-colors">
                  <Mail className="h-5 w-5" strokeWidth={1} />
                </span>
                <span className="break-all font-light">recruitment@hdrevents.com</span>
              </a>
              <div className="flex items-start text-[#4A5A68] text-sm group">
                <span className="mr-4 mt-0.5 text-gold/80">
                  <Clock className="h-5 w-5" strokeWidth={1} />
                </span>
                <span className="leading-relaxed font-light">Mon – Fri<br />9:00 AM – 5:00 PM (GMT+3)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#0A2A43]/70 font-light">
          <p>© {new Date().getFullYear()} HDR Events. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <span className="text-[#0A2A43]/70">Supporting Schools <span className="text-gold">Worldwide</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

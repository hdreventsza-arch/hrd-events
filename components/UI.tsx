import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOProps, ButtonProps } from '../types';

// SEO Component
// SEO Component
export const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, url, type = 'website', schema }) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta Tags Helper
    const setMeta = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    // 3. Open Graph
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', type, 'property');
    if (image) setMeta('og:image', window.location.origin + image, 'property');
    if (url) setMeta('og:url', window.location.origin + url, 'property');

    // 4. Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (image) setMeta('twitter:image', window.location.origin + image);

    // 5. Canonical Link
    const canonicalUrl = url ? window.location.origin + url : window.location.href;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 6. Schema.org JSON-LD
    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

  }, [title, description, keywords, image, url, type, schema]);

  return null;
};

// Button Component
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  to,
  className = '',
  type = 'button'
}) => {
  const navigate = useNavigate();

  // REFINED DESIGN RULES (Applied):
  // Common: Rounded 8px, Padding 14px 28px, Font Semibold, Transition 300ms

  const baseStyles = "inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy px-7 py-3.5 text-base w-full sm:w-auto transform hover:-translate-y-0.5 active:translate-y-0";

  const variants = {
    // 1. Primary Button (e.g. "Apply Now" on light bg)
    // Background: Navy Blue (#0A2A43), Text: White, Hover: Gold BG/Navy Text
    primary: "bg-navy text-white hover:bg-gold hover:text-navy shadow-lg shadow-navy/20 border-2 border-transparent",

    // 2. Secondary Button (e.g. "For Schools")
    // Background: Transparent, Border: 2px Gold, Text: Gold, Hover: Gold BG/Navy Text
    secondary: "bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-navy shadow-none hover:shadow-lg",

    // 3. Accent Button (High Contrast for Dark Backgrounds)
    // Background: Gold, Text: Navy, Hover: White BG/Navy Text
    accent: "bg-gold text-navy hover:bg-white hover:text-navy shadow-lg shadow-gold/20 border-2 border-gold hover:border-white",

    // Text Link
    text: "text-navy hover:text-gold underline underline-offset-8 decoration-2 px-0 py-2 hover:no-underline shadow-none w-auto transform-none hover:translate-y-0 border-none bg-transparent"
  };

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  const finalBaseStyles = variant === 'text'
    ? "inline-flex items-center font-sans font-semibold tracking-wide transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy text-base w-auto"
    : baseStyles;

  // Fallback to primary if variant not found
  const variantClasses = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      className={`${finalBaseStyles} ${variantClasses} ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

// Section Wrapper
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: 'white' | 'lightGrey' | 'navy';
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id, bg = 'white' }) => {
  const bgColors = {
    white: 'bg-white',
    lightGrey: 'bg-lightGrey',
    navy: 'bg-navy text-white'
  };

  // REFINED SPACING: 80-120px vertical spacing strictly applied
  return (
    <section
      id={id}
      className={`py-24 md:py-32 px-6 md:px-12 lg:px-24 ${bgColors[bg]} ${className} relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto opacity-0 animate-fade-in-up">
        {children}
      </div>
    </section>
  );
};

// Card Component
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  // REFINED CARD: White bg, soft shadow, 8px rounding, equal internal padding
  return (
    <div className={`bg-white p-8 md:p-10 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(10,42,67,0.08)] transition-all duration-300 h-full flex flex-col border border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

// Typography Helpers
interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
  color?: 'navy' | 'white';
}

export const SectionHeading: React.FC<HeadingProps> = ({ children, className = '', align = 'left', color = 'navy' }) => (
  <div className={`mb-14 md:mb-20 ${align === 'center' ? 'text-center flex flex-col items-center' : 'text-left'} ${className}`}>
    <h2 className={`text-3xl md:text-5xl font-serif font-bold leading-tight mb-6 ${color === 'white' ? 'text-white' : 'text-navy'}`}>{children}</h2>
    <div className={`w-20 h-1 bg-gold rounded-full ${align === 'center' ? 'mx-auto' : ''}`}></div>
  </div>
);

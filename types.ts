import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: object;
}

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'text';
  to?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

// FIX: Import React to resolve 'Cannot find namespace 'React'' error.
import type React from 'react';

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Feature {
  // FIX: Changed icon type to React.ReactElement to be compatible with React.cloneElement.
  // FIX: The type for React.ReactElement must include the component's props to be used with React.cloneElement.
  icon: React.ReactElement<{ className?: string }>;
  title:string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

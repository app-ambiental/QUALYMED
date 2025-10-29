
import React, { useState } from 'react';
import { QualymedLogoIcon } from './icons/Icons';

const Logo: React.FC = () => (
    <a href="#" className="flex items-center space-x-2" aria-label="Qualymed homepage">
        <QualymedLogoIcon className="w-9 h-9 text-cyan-700" />
        <span className="text-2xl font-bold text-gray-800">Qualymed</span>
    </a>
);


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: 'Nossos Serviços' },
    { href: '#why-us', label: 'Sobre Nós' },
    { href: '#testimonials', label: 'Depoimentos' },
    { href: '#contact', label: 'Contato' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-600 hover:text-cyan-600 transition-colors duration-300 font-medium">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
             <a href="#contact" className="hidden sm:inline-block bg-cyan-600 text-white font-bold py-2 px-6 rounded-full hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Solicitar Proposta
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-cyan-600 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {/* Hamburger Icon */}
                <path
                  className={`transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"
                />
                {/* Close Icon (X) */}
                <path
                  className={`transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="mobile-menu"
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <nav className="flex flex-col space-y-4 mt-4 pb-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-cyan-600 transition-colors duration-300 py-2 text-center">
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-full text-center hover:bg-cyan-700 transition-all duration-300 shadow-lg">
              Solicitar Proposta
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

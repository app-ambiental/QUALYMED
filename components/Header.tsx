
import React, { useState } from 'react';
import { QualymedLogoIcon } from './icons/Icons';

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        // O offset pode ser ajustado se o cabeçalho fixo cobrir parte da seção
        const headerOffset = 80; // Altura aproximada do cabeçalho
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
};

const Logo: React.FC = () => (
    <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="flex items-center space-x-2" aria-label="Qualymed homepage">
        <QualymedLogoIcon className="w-12 h-12 text-cyan-700" />
        <span className="text-3xl font-bold text-cyan-700">QualyMed</span>
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothScroll(e, href);
    setIsMenuOpen(false); // Fecha o menu móvel no clique
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleSmoothScroll(e, link.href)} className="text-gray-600 hover:text-cyan-600 transition-colors duration-300 font-medium">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
             <a href="https://wa.me/5521995607848" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-block bg-cyan-600 text-white font-bold py-2 px-6 rounded-full hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
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
              <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="text-gray-600 hover:text-cyan-600 transition-colors duration-300 py-2 text-center">
                {link.label}
              </a>
            ))}
            <a href="https://wa.me/5521995607848" target="_blank" rel="noopener noreferrer" className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-full text-center hover:bg-cyan-700 transition-all duration-300 shadow-lg">
              Solicitar Proposta
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

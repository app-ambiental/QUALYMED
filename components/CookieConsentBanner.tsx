
import React, { useState, useEffect } from 'react';

interface CookieConsentBannerProps {
  onOpenPolicy: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onOpenPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (consent: 'accepted' | 'declined') => {
    setIsClosing(true);
    localStorage.setItem('cookie_consent', consent);
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // Match animation duration
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] bg-gray-800 text-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
        isClosing ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          Este site utiliza cookies para garantir a melhor experiência de navegação. Ao continuar, você concorda com nossa{' '}
          <button onClick={onOpenPolicy} className="underline hover:text-white font-semibold">
            Política de Privacidade
          </button>
          .
        </p>
        <div className="flex-shrink-0 flex items-center gap-3">
          <button
            onClick={() => handleConsent('declined')}
            className="text-sm text-gray-400 hover:text-white px-4 py-2 rounded-md"
          >
            Recusar
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className="bg-cyan-600 text-white font-bold text-sm py-2 px-5 rounded-full hover:bg-cyan-700 transition-colors duration-300"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;

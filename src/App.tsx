
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import CtaSection from './components/CtaSection';
import ContactMap from './components/ContactMap';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const handleOpenPolicy = () => setIsPolicyModalOpen(true);
  const handleClosePolicy = () => setIsPolicyModalOpen(false);

  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <CtaSection />
        <ContactMap />
      </main>
      <Footer onOpenPolicy={handleOpenPolicy} />
      <Chatbot />
      <CookieConsentBanner onOpenPolicy={handleOpenPolicy} />
      <PrivacyPolicyModal isOpen={isPolicyModalOpen} onClose={handleClosePolicy} />
    </div>
  );
};

export default App;
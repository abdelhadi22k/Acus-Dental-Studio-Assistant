import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  useEffect(() => {
    const defaultTitle = document.title;
    const titleElement = document.querySelector('title');

    if (titleElement) {
      titleElement.setAttribute('data-default', defaultTitle);
    }

    document.title = 'ACOS Dental Studio - Creating Confident Smiles';

    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'ACOS Dental Studio provides exceptional dental care in a modern, comfortable environment. From general dentistry to cosmetic treatments, our expert team is dedicated to your smile.';
    document.head.appendChild(metaDescription);

    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'dental clinic, dentist, cosmetic dentistry, dental implants, teeth whitening, orthodontics, emergency dental care';
    document.head.appendChild(metaKeywords);

    const jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Dentist',
      name: 'ACOS Dental Studio',
      image: 'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg',
      description: 'Creating confident smiles with care. Professional dental services including general dentistry, cosmetic treatments, and emergency care.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Smile Street',
        addressLocality: 'New York',
        addressRegion: 'NY',
        postalCode: '10001',
        addressCountry: 'US',
      },
      telephone: '+1-123-456-7890',
      email: 'info@acosdentalstudio.com',
      url: 'https://acosdentalstudio.com',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '15:00',
        },
      ],
      priceRange: '$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '200',
      },
    });
    document.head.appendChild(jsonLd);

    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(metaKeywords);
      document.head.removeChild(jsonLd);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

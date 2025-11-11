import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'General Dentistry',
    'Cosmetic Dentistry',
    'Dental Implants',
    'Teeth Whitening',
    'Orthodontics',
    'Emergency Care',
  ];

  return (
    <footer className="bg-[#222222] text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-[#7ED957] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">
                ACOS <span className="text-[#7ED957]">Dental</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Creating confident smiles with care. Your trusted partner in dental health and wellness.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#7ED957] rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#7ED957] rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#7ED957] rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#7ED957] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-[#7ED957] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-[#7ED957] flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Smile Street<br />
                  Healthcare District<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-[#7ED957] flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-[#7ED957]">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-[#7ED957] flex-shrink-0" />
                <a href="mailto:info@acosdentalstudio.com" className="text-gray-400 hover:text-[#7ED957]">
                  info@acosdentalstudio.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} ACOS Dental Studio. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart size={16} className="text-[#7ED957] mx-1" /> for healthier smiles
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

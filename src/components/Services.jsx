import { motion } from 'framer-motion';
import { Smile, Sparkles, Activity, Zap, Heart, Clock } from 'lucide-react';

function Services({ detailed = false }) {
  const services = [
    {
      icon: Smile,
      title: 'General Dentistry',
      description: 'Comprehensive oral health care including cleanings, exams, and preventive treatments.',
      features: ['Routine Check-ups', 'Professional Cleaning', 'Cavity Treatment', 'Gum Disease Prevention'],
    },
    {
      icon: Sparkles,
      title: 'Cosmetic Dentistry',
      description: 'Transform your smile with veneers, bonding, and aesthetic enhancements.',
      features: ['Porcelain Veneers', 'Teeth Bonding', 'Smile Makeovers', 'Gum Contouring'],
    },
    {
      icon: Activity,
      title: 'Dental Implants',
      description: 'Permanent tooth replacement solutions that look and feel natural.',
      features: ['Single Implants', 'Full Arch Restoration', '3D Planning', 'Bone Grafting'],
    },
    {
      icon: Zap,
      title: 'Teeth Whitening',
      description: 'Professional whitening treatments for a brighter, more confident smile.',
      features: ['In-Office Whitening', 'Take-Home Kits', 'Custom Trays', 'Safe & Effective'],
    },
    {
      icon: Heart,
      title: 'Orthodontics',
      description: 'Straighten your teeth with traditional braces or clear aligners.',
      features: ['Traditional Braces', 'Clear Aligners', 'Retainers', 'Adult Orthodontics'],
    },
    {
      icon: Clock,
      title: 'Emergency Care',
      description: 'Urgent dental care when you need it most, available same-day.',
      features: ['Same-Day Appointments', 'Pain Relief', 'Tooth Repair', '24/7 Support Line'],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-4">
            Our Services
          </h2>
          <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
            Comprehensive dental care tailored to your unique needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 bg-[#EAF9EA] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#7ED957] transition-colors">
                <service.icon size={32} className="text-[#7ED957] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-[#222222] mb-3">
                {service.title}
              </h3>
              <p className="text-[#6B6B6B] mb-4 leading-relaxed">
                {service.description}
              </p>
              {detailed && (
                <ul className="space-y-2 mt-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-[#6B6B6B]">
                      <span className="w-1.5 h-1.5 bg-[#7ED957] rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

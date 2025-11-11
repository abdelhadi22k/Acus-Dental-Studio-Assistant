import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Smile Street', 'Healthcare District', 'New York, NY 10001'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['Main: (123) 456-7890', 'Emergency: (123) 456-7899'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@acosdentalstudio.com', 'appointments@acosdentalstudio.com'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon-Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 3:00 PM', 'Sun: Emergency Only'],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-[#6B6B6B] mb-8 leading-relaxed">
              Have questions or ready to schedule your appointment? We're here to help. Reach out to us using any of the methods below, and we'll get back to you promptly.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-[#EAF9EA] rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon size={24} className="text-[#7ED957]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222222] mb-2">{item.title}</h3>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-[#6B6B6B]">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold text-[#222222] mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-[#EAF9EA] hover:bg-[#7ED957] rounded-full flex items-center justify-center transition-colors group"
                  >
                    <social.icon size={20} className="text-[#7ED957] group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976389828038!3d40.697663747874524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1645654321098!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ACOS Dental Studio Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

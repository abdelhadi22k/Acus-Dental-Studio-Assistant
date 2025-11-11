import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Mail, Phone, Clock, CheckCircle } from 'lucide-react';

function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'General Dentistry',
    'Cosmetic Dentistry',
    'Dental Implants',
    'Teeth Whitening',
    'Orthodontics',
    'Emergency Care',
  ];

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Booking submitted:', formData);

    setIsSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        message: '',
      });
    }, 5000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="py-20 bg-[#EAF9EA]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mb-4">
            Book Your Appointment
          </h2>
          <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
            Schedule your visit and take the first step towards a healthier smile
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-12 shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-[#7ED957] rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={48} className="text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-[#222222] mb-4">
                Appointment Request Received!
              </h3>
              <p className="text-lg text-[#6B6B6B] mb-2">
                Thank you for choosing ACOS Dental Studio. We've received your appointment request.
              </p>
              <p className="text-[#6B6B6B]">
                Our team will contact you shortly to confirm your appointment.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-[#222222] mb-2">
                    <User size={18} className="mr-2 text-[#7ED957]" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-[#7ED957] transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-[#222222] mb-2">
                    <Mail size={18} className="mr-2 text-[#7ED957]" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-[#7ED957] transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-[#222222] mb-2">
                    <Phone size={18} className="mr-2 text-[#7ED957]" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-[#7ED957] transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="+1 (123) 456-7890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-[#222222] mb-2">
                    <Calendar size={18} className="mr-2 text-[#7ED957]" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-[#7ED957] transition-colors ${
                      errors.date ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-[#222222] mb-2">
                    <Clock size={18} className="mr-2 text-[#7ED957]" />
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-[#7ED957] transition-colors ${
                      errors.time ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-[#222222] mb-2">
                    Service Type *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-[#7ED957] transition-colors ${
                      errors.service ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">{errors.service}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold text-[#222222] mb-2 block">
                  Additional Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7ED957] transition-colors resize-none"
                  placeholder="Tell us about any specific concerns or questions..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7ED957] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#2E8B3A] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Submitting...' : 'Book Appointment'}
              </button>

              <p className="text-sm text-[#6B6B6B] text-center mt-4">
                * Required fields. We'll contact you within 24 hours to confirm your appointment.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default BookingForm;

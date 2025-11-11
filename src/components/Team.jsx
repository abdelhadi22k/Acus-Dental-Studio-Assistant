import { motion } from 'framer-motion';

function Team() {
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Dentist & Founder',
      bio: 'With over 15 years of experience, Dr. Johnson specializes in cosmetic dentistry and implantology. She is passionate about creating beautiful, healthy smiles.',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Orthodontist',
      bio: 'Dr. Chen brings expertise in orthodontics and clear aligner therapy. He loves helping patients achieve straight, confident smiles with modern techniques.',
      image: 'https://images.pexels.com/photos/6812524/pexels-photo-6812524.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Pediatric Dentist',
      bio: 'Specializing in pediatric dentistry, Dr. Rodriguez creates a fun, welcoming environment for children and helps families establish healthy dental habits.',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Dr. James Anderson',
      role: 'Oral Surgeon',
      bio: 'Dr. Anderson is our oral surgery specialist, expertly handling complex extractions, implant placements, and reconstructive procedures with precision.',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
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
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
            Experienced professionals dedicated to your dental health and comfort
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-bold text-[#222222] mb-1">
                {member.name}
              </h3>
              <p className="text-[#7ED957] font-semibold mb-3">{member.role}</p>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;

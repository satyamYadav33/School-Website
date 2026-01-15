import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Menu, X, ChevronRight, MapPin, Phone, Mail, 
  Instagram, Facebook, Youtube, Award, Users, 
  BookOpen, Star, GraduationCap, Building2, 
  Dribbble, Microscope, Globe, Clock, CheckCircle2,
  Loader2, Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type Page = 'home' | 'about' | 'academics' | 'admissions' | 'facilities' | 'gallery' | 'contact' | 'success-stories';
type Theme = 'light' | 'dark';

// --- UI Components ---

const Toast = ({ message, isVisible, onHide }: { message: string, isVisible: boolean, onHide: () => void }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: -50, x: 50 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: -50, x: 50 }}
        className="fixed top-24 right-6 z-[100] bg-vibrant-green text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 border border-white/20"
      >
        <div className="bg-white/20 p-1 rounded-full">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-sm md:text-base">{message}</span>
        <button onClick={onHide} className="ml-4 hover:opacity-70 transition-opacity p-1">
          <X size={18} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

const ThemeToggle = ({ theme, toggleTheme }: { theme: Theme, toggleTheme: () => void }) => (
  <button 
    onClick={toggleTheme}
    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10 shadow-lg active:scale-90"
    aria-label="Toggle Theme"
  >
    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-warm-gold" />}
  </button>
);

const Navbar = ({ currentPage, setCurrentPage, theme, toggleTheme }: { currentPage: Page, setCurrentPage: (p: Page) => void, theme: Theme, toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Academics', value: 'academics' },
    { label: 'Admissions', value: 'admissions' },
    { label: 'Facilities', value: 'facilities' },
    { label: 'Gallery', value: 'gallery' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-navy/95 py-2 shadow-xl backdrop-blur-md' 
        : 'bg-navy py-4 shadow-lg'
    } border-b border-white/5`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="bg-white p-2 rounded-full mr-3 shadow-inner">
              <GraduationCap className="text-navy w-6 h-6" />
            </div>
            <div>
              <h1 className="text-white font-serif text-xl font-bold leading-none tracking-tight">SGN</h1>
              <p className="text-white text-[10px] tracking-widest uppercase opacity-80">International School</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => setCurrentPage(link.value)}
                className={`text-sm font-medium transition-all relative py-1 ${
                  currentPage === link.value 
                    ? 'text-warm-gold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-warm-gold' 
                    : 'text-white hover:text-vibrant-green'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button 
              onClick={() => setCurrentPage('admissions')}
              className="bg-vibrant-green hover:bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] active:scale-95"
            >
              Apply Now
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 focus:outline-none hover:bg-white/10 rounded-lg transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy absolute w-full left-0 top-full border-t border-white/5 px-4 py-8 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => { setCurrentPage(link.value); setIsOpen(false); }}
                  className={`text-left text-lg font-semibold transition-colors ${
                    currentPage === link.value ? 'text-warm-gold' : 'text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => { setCurrentPage('admissions'); setIsOpen(false); }}
                className="w-full bg-vibrant-green text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
              >
                Admissions Open
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <footer className="bg-navy text-white pt-20 pb-10 border-t border-white/5 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center mb-6">
          <GraduationCap className="text-warm-gold w-10 h-10 mr-3" />
          <h2 className="font-serif text-2xl font-bold">SGN International</h2>
        </div>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed opacity-80">
          Nurturing the leaders of tomorrow through holistic excellence, innovative STEM programs, and a commitment to global citizenship in Ludhiana.
        </p>
        <div className="flex space-x-5">
          <Facebook className="w-5 h-5 cursor-pointer hover:text-vibrant-green transition-colors opacity-80 hover:opacity-100" />
          <Instagram className="w-5 h-5 cursor-pointer hover:text-vibrant-green transition-colors opacity-80 hover:opacity-100" />
          <Youtube className="w-5 h-5 cursor-pointer hover:text-vibrant-green transition-colors opacity-80 hover:opacity-100" />
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl font-semibold mb-6 text-warm-gold">Quick Links</h3>
        <ul className="space-y-3 text-gray-300 text-sm">
          {['About Us', 'Academics', 'Admissions', 'Success Stories', 'Facilities', 'Gallery'].map((item) => (
            <li key={item}>
              <button 
                onClick={() => {
                  const target = item.toLowerCase().replace(' us', '').replace(' ', '-') as Page;
                  setCurrentPage(target === 'success-stories' ? 'home' : target);
                }} 
                className="hover:text-vibrant-green transition-colors opacity-80 hover:opacity-100 flex items-center"
              >
                <ChevronRight size={14} className="mr-2" />
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-serif text-xl font-semibold mb-6 text-warm-gold">Connect</h3>
        <ul className="space-y-4 text-gray-300 text-sm">
          <li className="flex items-start">
            <MapPin className="w-5 h-5 mr-3 text-vibrant-green flex-shrink-0" />
            <span className="opacity-80">Ferozepur Road, Ludhiana, Punjab 141001, India</span>
          </li>
          <li className="flex items-center">
            <Phone className="w-5 h-5 mr-3 text-vibrant-green flex-shrink-0" />
            <span className="opacity-80">+91 161 4567 890</span>
          </li>
          <li className="flex items-center">
            <Mail className="w-5 h-5 mr-3 text-vibrant-green flex-shrink-0" />
            <span className="opacity-80">info@sgninternational.edu</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-serif text-xl font-semibold mb-6 text-warm-gold">Newsletter</h3>
        <p className="text-gray-300 text-sm mb-4 opacity-80">Join our mailing list for updates.</p>
        <form className="flex group" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Email address" 
            className="bg-white/10 border border-white/20 px-4 py-2.5 rounded-l-xl w-full focus:outline-none focus:border-vibrant-green text-sm placeholder:text-gray-500 transition-colors"
          />
          <button className="bg-vibrant-green px-5 py-2.5 rounded-r-xl hover:bg-green-600 transition-colors font-bold shadow-lg">
            Join
          </button>
        </form>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
      <p>&copy; 2026 SGN International School. Affiliated to CBSE. Empowering generations with wisdom.</p>
    </div>
  </footer>
);

// --- Page Content Components ---

const Hero = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <section className="relative h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000" 
        alt="School Campus" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px]"></div>
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-white"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-vibrant-green animate-pulse"></div>
          <span className="text-vibrant-green text-xs font-bold tracking-widest uppercase">Admissions 2026-27 Open</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight">
          Nurturing <span className="text-warm-gold drop-shadow-sm">Global Leaders</span> for Tomorrow.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-medium">
          SGN International School is a premium CBSE institution dedicated to providing holistic education, fostering innovation, and building character in Ludhiana.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <button 
            onClick={onCtaClick}
            className="bg-vibrant-green text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-green-600 transition-all flex items-center justify-center hover:translate-y-[-2px]"
          >
            Apply for Admission <ChevronRight className="ml-2 w-5 h-5" />
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center">
            Virtual Tour
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const QuickStats = () => {
  const stats = [
    { label: 'Successful Alumni', value: '5000+', icon: <Users className="w-8 h-8" /> },
    { label: 'Board Results', value: '98%', icon: <Award className="w-8 h-8" /> },
    { label: 'Expert Faculty', value: '120+', icon: <GraduationCap className="w-8 h-8" /> },
    { label: 'Acres of Campus', value: '15', icon: <Building2 className="w-8 h-8" /> },
  ];

  return (
    <section className="bg-white dark:bg-slate-900 py-20 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy via-vibrant-green to-warm-gold opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: idx * 0.1 }}
            className="text-center group"
          >
            <div className="text-navy dark:text-warm-gold flex justify-center mb-5 transition-transform group-hover:scale-110 duration-300">{stat.icon}</div>
            <div className="text-4xl md:text-5xl font-bold text-navy dark:text-white mb-2 tracking-tight">{stat.value}</div>
            <div className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SuccessStories = () => {
  const students = [
    {
      name: "Aarav Sharma",
      role: "Alumni 2021",
      achievement: "IIT Delhi - CS",
      bio: "Secured All India Rank 45 in JEE Advanced. International Math Olympiad Silver Medalist.",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Priya Kaur",
      role: "Class XII",
      achievement: "Young Author",
      bio: "Published 'The Silent Whispers' at age 16. National Level Debate Champion for three consecutive years.",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Ishaan Singh",
      role: "Alumni 2019",
      achievement: "Board Topper (99.2%)",
      bio: "Currently an Architect at a global firm. Led the school's robotics team to National victory.",
      img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Mehak Gill",
      role: "Class X",
      achievement: "Bal Puraskar Winner",
      bio: "Awarded by the President of India for innovation in eco-friendly irrigation systems.",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section className="bg-off-white dark:bg-slate-950 py-24 relative transition-colors duration-300" id="success-stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-navy dark:text-white font-serif text-4xl md:text-5xl font-bold mb-4">Student Spotlights</h2>
          <div className="w-24 h-1.5 bg-vibrant-green mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Our students aren't just high achievers; they are innovators, thinkers, and compassionate leaders. Discover the journeys of some of our brightest minds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {students.map((student, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -12 }}
              className="bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-700 group transition-all"
            >
              <div className="h-72 overflow-hidden relative">
                <img src={student.img} alt={student.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-5 right-5 bg-warm-gold text-navy text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  {student.achievement}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-navy dark:text-warm-gold mb-1 group-hover:text-vibrant-green transition-colors">{student.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-6 tracking-widest uppercase">{student.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic opacity-90">
                  "{student.bio}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedPrograms = () => (
  <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20">
        <div className="max-w-2xl mb-8 md:mb-0">
          <h2 className="text-navy dark:text-white font-serif text-4xl md:text-5xl font-bold mb-6">Programs of Excellence</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">Integrating technology, art, and physical wellness to create a truly balanced educational environment where children thrive.</p>
        </div>
        <button className="bg-navy/5 dark:bg-white/5 text-navy dark:text-white hover:bg-navy hover:text-white dark:hover:bg-vibrant-green px-6 py-3 rounded-full font-bold flex items-center transition-all group">
          All Programs <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { title: 'STEM & Robotics Lab', desc: 'State-of-the-art facilities for coding, 3D printing, and AI workshops designed for tomorrow.', icon: <Microscope className="w-12 h-12" /> },
          { title: 'Global Exchange', desc: 'Collaborations with international schools for cultural and academic exchange experiences.', icon: <Globe className="w-12 h-12" /> },
          { title: 'Sports Academy', desc: 'Professional coaching for 15+ sports including swimming, tennis, and championship cricket.', icon: <Dribbble className="w-12 h-12" /> },
        ].map((prog, idx) => (
          <div key={idx} className="p-12 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] hover:shadow-[0_30px_60px_rgba(30,58,138,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all bg-off-white/50 dark:bg-slate-800/50 group">
            <div className="text-navy dark:text-vibrant-green mb-8 group-hover:text-vibrant-green dark:group-hover:text-warm-gold transition-colors group-hover:scale-110 duration-300 inline-block">{prog.icon}</div>
            <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">{prog.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed opacity-90">{prog.desc}</p>
            <button className="text-warm-gold font-bold flex items-center group/btn hover:text-navy dark:hover:text-white transition-colors">
              Explore More <ChevronRight size={18} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutPage = () => (
  <div className="pt-24 dark:bg-slate-900 transition-colors">
    <section className="bg-navy py-24 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 relative z-10">About SGN International</h1>
      <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl font-medium relative z-10 px-4">A legacy of over 20 years in providing world-class education in the heart of Punjab.</p>
    </section>
    
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      <div className="order-2 md:order-1">
        <h2 className="text-4xl font-serif font-bold text-navy dark:text-white mb-8">Our Principal's Message</h2>
        <div className="w-16 h-1 bg-warm-gold mb-8 rounded-full"></div>
        <p className="text-gray-600 dark:text-gray-300 text-lg italic mb-10 leading-relaxed">
          "At SGN, we don't just teach subjects; we inspire curiosity. Our goal is to empower every child with the tools they need to navigate an ever-changing world with confidence, empathy, and integrity."
        </p>
        <div>
          <p className="font-bold text-navy dark:text-warm-gold text-xl">Dr. Satinder Kaur</p>
          <p className="text-vibrant-green font-bold text-sm tracking-widest uppercase mt-1">PhD in Educational Leadership</p>
        </div>
      </div>
      <div className="order-1 md:order-2 relative group">
        <div className="absolute -inset-4 bg-vibrant-green/10 rounded-3xl group-hover:bg-warm-gold/10 transition-colors duration-500"></div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" alt="Principal" />
        </div>
      </div>
    </section>

    <section className="bg-off-white dark:bg-slate-950 py-24 border-y border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-serif font-bold text-navy dark:text-white mb-20">Our Core Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Excellence', desc: 'Striving for the highest standards in every academic and extracurricular pursuit.', icon: <Star className="w-14 h-14" /> },
            { title: 'Integrity', desc: 'Building strong moral foundations and ethical leadership through daily practice.', icon: <CheckCircle2 className="w-14 h-14" /> },
            { title: 'Innovation', desc: 'Encouraging students to think outside the box and solve real-world problems.', icon: <BookOpen className="w-14 h-14" /> },
          ].map((v, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-12 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] text-center group border border-transparent hover:border-vibrant-green/20 transition-all">
              <div className="flex justify-center mb-8 text-vibrant-green group-hover:scale-110 transition-transform duration-300">{v.icon}</div>
              <h3 className="text-2xl font-bold text-navy dark:text-white mb-5">{v.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const AcademicsPage = () => (
  <div className="pt-24 dark:bg-slate-900 transition-colors">
    <section className="bg-vibrant-green py-24 text-white text-center relative">
       <div className="absolute inset-0 bg-black/10"></div>
      <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 relative z-10">Academic Excellence</h1>
      <p className="max-w-2xl mx-auto text-white opacity-95 text-xl font-medium relative z-10 px-4">Rigorous CBSE curriculum integrated with international pedagogical standards.</p>
    </section>
    
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-serif font-bold text-navy dark:text-white mb-10">Curriculum Pathways</h2>
          <div className="space-y-8">
            {[
              { level: 'Pre-Primary (Nursery - UKG)', focus: 'Play-way method, sensory integration, and early literacy through discovery.' },
              { level: 'Primary (Grades I - V)', focus: 'Foundational numeracy, literacy, environmental awareness and character building.' },
              { level: 'Middle School (Grades VI - VIII)', focus: 'In-depth sciences, multiple languages, and specialized digital arts programs.' },
              { level: 'Senior Secondary (Grades IX - XII)', focus: 'Expert CBSE preparation with customized streams in Medical, Non-Med, Commerce, and Arts.' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border-l-8 border-warm-gold bg-off-white dark:bg-slate-800 rounded-r-[2rem] shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-bold text-navy dark:text-warm-gold mb-3">{item.level}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{item.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="bg-navy dark:bg-slate-800 p-10 rounded-[3rem] text-white shadow-2xl h-fit sticky top-32 border border-white/10">
          <div className="flex items-center mb-8">
            <Clock className="w-8 h-8 text-warm-gold mr-3" />
            <h3 className="text-3xl font-serif font-bold">Academic Calendar</h3>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-gray-300 font-medium">Session Starts</span>
              <span className="font-bold text-warm-gold text-lg">April 5th</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-gray-300 font-medium">Summer Break</span>
              <span className="font-bold text-warm-gold text-lg">June 1st - 30th</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-gray-300 font-medium">Mid-Term Assessment</span>
              <span className="font-bold text-warm-gold text-lg">September</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-gray-300 font-medium">Winter Vacations</span>
              <span className="font-bold text-warm-gold text-lg">Dec 25th - Jan 5th</span>
            </div>
            <button className="w-full mt-10 bg-white dark:bg-vibrant-green text-navy dark:text-white py-4 rounded-2xl font-extrabold text-lg hover:bg-warm-gold hover:text-navy transition-all flex items-center justify-center group">
              Download Full Schedule <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const AdmissionsPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-24 dark:bg-slate-900 transition-colors">
      <section className="bg-warm-gold py-24 text-navy text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 relative z-10">Admissions 2026-27</h1>
        <p className="max-w-2xl mx-auto font-bold opacity-80 text-xl relative z-10 px-4 uppercase tracking-widest">Your gateway to a global future.</p>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-4xl font-serif font-bold text-navy dark:text-white mb-12">The Journey to SGN</h2>
            <div className="space-y-16">
              {[
                { step: '01', title: 'Submit Inquiry', desc: 'Fill out our online inquiry form to receive our personalized admissions kit.' },
                { step: '02', title: 'Visit & Explore', desc: 'Tour our futuristic campus and engage in a dialogue with our academic leads.' },
                { step: '03', title: 'Skills Insight', desc: 'Students participate in a collaborative learning assessment to gauge potential.' },
                { step: '04', title: 'Interactive Dialogue', desc: 'A concluding session between the Principal, the student, and the parents.' },
              ].map((s, i) => (
                <div key={i} className="flex items-start group">
                  <div className="bg-navy dark:bg-slate-800 text-white text-2xl font-extrabold w-16 h-16 flex items-center justify-center rounded-[1.5rem] flex-shrink-0 mr-8 group-hover:bg-vibrant-green transition-colors shadow-lg">
                    {s.step}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-navy dark:text-warm-gold mb-3">{s.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-12 rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-100 dark:border-slate-700 sticky top-32">
            <h3 className="text-3xl font-serif font-bold text-navy dark:text-white mb-10">Admission Inquiry</h3>
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="bg-green-100 dark:bg-green-900/30 text-vibrant-green w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle2 size={56} />
                </div>
                <h4 className="text-3xl font-bold text-navy dark:text-white mb-3">Submission Received!</h4>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Our dedicated counselor will reach out to you within the next 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-10 text-navy dark:text-warm-gold font-bold underline hover:text-vibrant-green transition-colors">Submit another inquiry</button>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Parent's Name</label>
                    <input type="text" required className="w-full p-4 bg-off-white dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-2xl focus:outline-none focus:border-navy dark:focus:border-vibrant-green focus:bg-white dark:focus:bg-slate-950 transition-all shadow-sm text-navy dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Email Address</label>
                    <input type="email" required className="w-full p-4 bg-off-white dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-2xl focus:outline-none focus:border-navy dark:focus:border-vibrant-green focus:bg-white dark:focus:bg-slate-950 transition-all shadow-sm text-navy dark:text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Phone Number</label>
                  <input type="tel" required className="w-full p-4 bg-off-white dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-2xl focus:outline-none focus:border-navy dark:focus:border-vibrant-green focus:bg-white dark:focus:bg-slate-950 transition-all shadow-sm text-navy dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Grade Seeking</label>
                  <select className="w-full p-4 bg-off-white dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-2xl focus:outline-none focus:border-navy dark:focus:border-vibrant-green focus:bg-white dark:focus:bg-slate-950 transition-all shadow-sm appearance-none cursor-pointer text-navy dark:text-white">
                    <option>Select Grade</option>
                    <option>Pre-Primary (Nursery-UKG)</option>
                    <option>Primary (Grades I-V)</option>
                    <option>Middle (Grades VI-VIII)</option>
                    <option>Senior (Grades IX-XII)</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-navy dark:bg-vibrant-green text-white py-5 rounded-2xl font-bold text-xl hover:bg-navy/90 dark:hover:bg-green-600 transition-all shadow-[0_20px_40px_rgba(30,58,138,0.2)] hover:translate-y-[-2px] active:scale-95 mt-4">
                  Send Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }, 1200);
  };

  return (
    <div className="pt-24 dark:bg-slate-900 transition-colors">
      <Toast 
        message="Request sent successfully! We'll get back to you soon." 
        isVisible={showToast} 
        onHide={() => setShowToast(false)} 
      />
      
      <section className="bg-navy py-24 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dot-grid.png')] opacity-10"></div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 relative z-10">Connect With Us</h1>
        <p className="max-w-2xl mx-auto opacity-80 text-xl font-medium relative z-10 px-4">Open lines for communication, collaboration, and constant improvement.</p>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-16">
            <div>
              <h2 className="text-4xl font-serif font-bold text-navy dark:text-white mb-10">Our Location</h2>
              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="bg-navy dark:bg-slate-800 p-4 rounded-2xl text-white mr-8 group-hover:bg-warm-gold transition-colors shadow-lg">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy dark:text-warm-gold text-xl mb-1">Campus Address</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">Ferozepur Road, Mullanpur Dakha, Ludhiana, Punjab 141001, India</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="bg-navy dark:bg-slate-800 p-4 rounded-2xl text-white mr-8 group-hover:bg-warm-gold transition-colors shadow-lg">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy dark:text-warm-gold text-xl mb-1">Direct Helpline</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-medium">+91 161 4567 890 / +91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="bg-navy dark:bg-slate-800 p-4 rounded-2xl text-white mr-8 group-hover:bg-warm-gold transition-colors shadow-lg">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy dark:text-warm-gold text-xl mb-1">Official Inquiry</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-medium">info@sgninternational.edu</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-96 bg-gray-100 dark:bg-slate-800 rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white dark:border-slate-800 group">
              <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200" alt="Map Location" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-navy/20 flex items-center justify-center backdrop-blur-sm group-hover:backdrop-blur-0 transition-all">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl flex flex-col items-center">
                  <MapPin className="text-vibrant-green w-10 h-10 mb-2" />
                  <p className="font-bold text-navy dark:text-white text-lg">Ludhiana Campus</p>
                  <button className="mt-3 text-xs font-bold text-vibrant-green hover:underline">Get Directions</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-off-white dark:bg-slate-800 p-12 rounded-[3.5rem] border border-gray-100 dark:border-slate-700 shadow-xl sticky top-32">
            <h3 className="text-3xl font-serif font-bold text-navy dark:text-white mb-10">Send a Detailed Message</h3>
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Your Name</label>
                <input type="text" required className="w-full p-4 bg-white dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-2xl shadow-sm focus:outline-none focus:border-navy dark:focus:border-vibrant-green text-navy dark:text-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Email Address</label>
                <input type="email" required className="w-full p-4 bg-white dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-2xl shadow-sm focus:outline-none focus:border-navy dark:focus:border-vibrant-green text-navy dark:text-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Subject</label>
                <input type="text" required className="w-full p-4 bg-white dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-2xl shadow-sm focus:outline-none focus:border-navy dark:focus:border-vibrant-green text-navy dark:text-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Message</label>
                <textarea rows={5} required className="w-full p-4 bg-white dark:bg-slate-900 border border-transparent dark:border-slate-700 rounded-2xl shadow-sm focus:outline-none focus:border-navy dark:focus:border-vibrant-green text-navy dark:text-white transition-all"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-navy dark:bg-vibrant-green text-white py-5 rounded-2xl font-bold text-xl hover:bg-navy/90 dark:hover:bg-green-600 transition-all shadow-[0_20px_40px_rgba(30,58,138,0.2)] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Request <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const FacilitiesPage = () => (
  <div className="pt-24 dark:bg-slate-900 transition-colors">
    <section className="bg-navy py-24 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 relative z-10">World-Class Facilities</h1>
      <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl font-medium relative z-10 px-4">Providing the infrastructure that supports and enhances the learning journey of every student.</p>
    </section>

    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { title: 'Digital Classrooms', desc: 'Smart boards, high-speed internet, and ergonomic seating in every classroom.', icon: <Building2 className="w-12 h-12" /> },
          { title: 'Advanced Science Labs', desc: 'Separate, fully-equipped labs for Physics, Chemistry, and Biology.', icon: <Microscope className="w-12 h-12" /> },
          { title: 'Olympic-Size Pool', desc: 'State-of-the-art swimming facilities with professional life guards and coaches.', icon: <Dribbble className="w-12 h-12" /> },
          { title: 'Resource Library', desc: 'Over 15,000 books, digital archives, and quiet study zones for all ages.', icon: <BookOpen className="w-12 h-12" /> },
          { title: 'Safe Transportation', desc: 'GPS-tracked fleet of air-conditioned buses covering all major routes.', icon: <MapPin className="w-12 h-12" /> },
          { title: 'Indoor Sports Complex', desc: 'Facilities for badminton, table tennis, and yoga to ensure physical wellbeing.', icon: <Award className="w-12 h-12" /> },
        ].map((facility, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 dark:border-slate-700 group hover:border-warm-gold/30 transition-all"
          >
            <div className="text-navy dark:text-vibrant-green mb-8 group-hover:text-vibrant-green dark:group-hover:text-warm-gold transition-colors">{facility.icon}</div>
            <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">{facility.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{facility.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

const GalleryPage = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", title: "Smart Classroom" },
    { src: "https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=800", title: "Modern Library" },
    { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800", title: "Science Experiment" },
    { src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800", title: "Sports Day" },
    { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800", title: "Computer Lab" },
    { src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800", title: "Campus Architecture" },
    { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800", title: "Art & Craft" },
    { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800", title: "Group Discussion" },
    { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", title: "Learning Fun" },
  ];

  return (
    <div className="pt-24 dark:bg-slate-900 transition-colors">
      <section className="bg-navy py-24 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 relative z-10">Visual Journey</h1>
        <p className="max-w-2xl mx-auto opacity-80 text-xl font-medium relative z-10 px-4">Moments of discovery, joy, and achievement at SGN International.</p>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-[2rem] overflow-hidden group shadow-xl dark:shadow-none h-80"
            >
              <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                <h4 className="text-white text-xl font-bold mb-2">{img.title}</h4>
                <button className="bg-warm-gold text-navy px-6 py-2 rounded-full font-bold text-sm">View Larger</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onCtaClick={() => setCurrentPage('admissions')} />
            <QuickStats />
            <SuccessStories />
            <FeaturedPrograms />
            <section className="bg-navy py-24 relative overflow-hidden">
               <div className="absolute inset-0 bg-white/5 opacity-10"></div>
              <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-white font-serif text-4xl md:text-5xl font-bold mb-10 leading-tight">Empower Your Child with a<br/><span className="text-warm-gold">Global Perspective.</span></h2>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button 
                    onClick={() => setCurrentPage('admissions')}
                    className="bg-vibrant-green text-white px-12 py-5 rounded-full font-bold text-2xl hover:bg-green-600 transition-all shadow-2xl hover:translate-y-[-4px]"
                  >
                    Apply Now
                  </button>
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold text-2xl hover:bg-white hover:text-navy transition-all"
                  >
                    Contact Office
                  </button>
                </div>
              </div>
            </section>
          </>
        );
      case 'about': return <AboutPage />;
      case 'academics': return <AcademicsPage />;
      case 'admissions': return <AdmissionsPage />;
      case 'facilities': return <FacilitiesPage />;
      case 'gallery': return <GalleryPage />;
      case 'contact': return <ContactPage />;
      case 'success-stories': return (
        <div className="pt-10 dark:bg-slate-900 transition-colors">
          <SuccessStories />
        </div>
      );
      default: return <Hero onCtaClick={() => setCurrentPage('admissions')} />;
    }
  };

  return (
    <div className={`min-h-screen selection:bg-vibrant-green selection:text-white transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-off-white dark:bg-slate-900 transition-colors duration-300">
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
        <main>
          {renderPage()}
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
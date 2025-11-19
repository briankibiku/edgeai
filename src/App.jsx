import React, { useState, createContext, useContext, useEffect } from 'react';
import {
  Menu, X, ArrowRight, TrendingUp, Cpu, Users, Mail, Phone, MapPin, BarChart, Sun, Moon, MessageSquareText, ScanEye, Waypoints, Zap } from 'lucide-react';
import logo from './assets/edgeaiblack.png';
import logoWhite from './assets/edgeaiwhite.png';
// import SolutionsSection from './components/SolutionsSection';
// import ContactSection from './components/Contact';

// --- Global Constants and Logo ---

// The logo provided is white. For light mode, we invert the colors of the image
// to maintain visibility on a white background.
const LOGO_URL = "uploaded:edgeaiwhite.png-4712083e-c80c-4541-81b9-642b8883e8f4";

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Impact', href: '#impact' },
  { name: 'Contact', href: '#contact' },
];

// --- Theme Context (Best Practice for Global State) ---
const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  getClasses: () => '', // Utility function for dynamic class generation
});

// Utility hook to access theme
const useTheme = () => useContext(ThemeContext);

// Utility function to map semantic elements to specific Tailwind classes based on theme
const getThemeClasses = (theme, element) => {
  const isDark = theme === 'dark';
  
  // Theme-Agnostic Defaults for common elements
  switch (element) {
    case 'bg-main': return isDark ? 'bg-black text-white' : 'bg-blue-50 text-gray-900';
    case 'bg-secondary': return isDark ? 'bg-gray-950 text-white border-gray-800' : 'bg-gray-50 text-gray-900 border-gray-200';
    case 'text-primary': return isDark ? 'text-white' : 'text-gray-900';
    case 'text-secondary': return isDark ? 'text-gray-400' : 'text-gray-600';
    case 'text-highlight': return isDark ? 'text-gray-300' : 'text-gray-600';
    case 'card-bg': return isDark ? 'bg-gray-900 border-gray-800 hover:border-white' : 'bg-white border-gray-200 hover:border-black shadow-lg';
    case 'button-primary': return isDark ? 'text-black bg-white hover:bg-gray-200' : 'text-white bg-black hover:bg-gray-800';
    // FIX: Added a proper semantic class for the outline button used in SolutionsSection
    case 'button-secondary-outline':
      return isDark 
        ? 'text-white border-white hover:bg-gray-900' 
        : 'text-gray-900 border-gray-900 hover:bg-gray-100';
    case 'input-bg': return isDark ? 'bg-gray-800 border-gray-700 text-white focus:ring-white focus:border-white' : 'bg-gray-100 border-gray-300 text-gray-900 focus:ring-black focus:border-black';
    case 'border-separator': return isDark ? 'border-gray-800' : 'border-gray-200';
    case 'icon-bg': return isDark ? 'bg-gray-700' : 'bg-gray-200';
    default: return '';
  }
};


// --- 1. Navbar Component (Responsive) ---

const Navbar = () => {
  const { theme, toggleTheme, getClasses } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isDark = theme === 'dark'; // Defined locally for convenience
  
  // Utility function for smooth scrolling
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close menu on mobile after selection
  };
  
  const navBg = isDark ? 'bg-black/90 shadow-xl' : 'bg-white/90 shadow-md';
  const navText = isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black';
  const logoFilter = isDark ? '' : 'filter invert'; // Invert white logo for light mode

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" onClick={() => scrollToSection('#home')} className="flex items-center space-x-2">
              <img
                src={isDark ?  logoWhite : logo}
                alt="EdgeAI Logo"
                className="h-30 w-auto sm:h-30 md:h-34 lg:h-36 object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className={`transition duration-300 px-3 py-2 rounded-md text-sm font-medium ${navText}`}
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                className={`ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm transition duration-300 ${getClasses(theme, 'button-primary')}`}
              >
                Start AI Journey
              </button>
              
              {/* Theme Toggle Button (Desktop) */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition duration-300 ${isDark ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button and Theme Toggle (Combined for Mobile) */}
          <div className="md:hidden flex items-center space-x-2">
            <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition duration-300 ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-black hover:bg-gray-200'}`}
              >
                {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700 focus:ring-white' : 'text-gray-600 hover:text-black hover:bg-gray-200 focus:ring-black'}`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className={`md:hidden ${isDark ? 'bg-black/95' : 'bg-white/95'} border-t ${getClasses(theme, 'border-separator')}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className={`block px-3 py-2 rounded-md text-base font-medium transition duration-300 ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'}`}
              >
                {item.name}
              </a>
            ))}
            <button 
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                className={`mt-2 block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-full shadow-sm transition duration-300 ${getClasses(theme, 'button-primary')}`}
              >
                Start AI Journey
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// --- 2. Hero Component ---

const HeroSection = () => {
  const { theme, getClasses } = useTheme();
  return (
    <section id="home" className={`pt-20 min-h-screen flex items-center justify-center ${getClasses(theme, 'bg-main')}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-tight">
          Gain the <span className={getClasses(theme, 'text-highlight')}>Edge</span> with AI.
        </h1>
        <p className={`text-xl sm:text-2xl max-w-3xl mx-auto mb-10 ${getClasses(theme, 'text-secondary')}`}>
          Empowering large enterprises and ambitious SMEs with bespoke, cutting-edge AI solutions for real-world impact and exponential growth.
        </p>
        <button 
          onClick={(e) => { e.preventDefault(); document.querySelector('#solutions').scrollIntoView({ behavior: 'smooth' }); }}
          className={`inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg transition duration-300 transform hover:scale-105 ${getClasses(theme, 'button-primary')}`}
        >
          Explore Our AI Solutions <ArrowRight className="ml-3 h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

// --- 3. About Component ---

const AboutSection = () => {
  const { theme, getClasses } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <section id="about" className={`py-24 ${getClasses(theme, 'bg-secondary')} border-t ${getClasses(theme, 'border-separator')}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h2 className={`text-4xl sm:text-5xl font-extrabold mb-6 ${getClasses(theme, 'text-primary')}`}>
              Pioneering <span className={getClasses(theme, 'text-highlight')}>Intelligent Transformation</span>
            </h2>
            <p className={`text-lg mb-8 ${getClasses(theme, 'text-secondary')}`}>
              EdgeAI was founded on the principle that transformative AI should be accessible, practical, and tailored. We move beyond generic tools, focusing instead on deep integration and customized models that solve your most pressing business challenges—from supply chain optimization for multinational corporations to smart customer engagement for growing SMEs.
            </p>
            <div className="space-y-4">
              <p className={`flex items-start ${getClasses(theme, 'text-primary')}`}>
                <TrendingUp className={`h-6 w-6 ${getClasses(theme, 'text-primary')} mr-3 mt-1 flex-shrink-0`} />
                <span className='font-semibold'>Focused Expertise:</span> We specialize exclusively in business AI, ensuring our strategies are relevant and results-driven.
              </p>
              <p className={`flex items-start ${getClasses(theme, 'text-primary')}`}>
                <Cpu className={`h-6 w-6 ${getClasses(theme, 'text-primary')} mr-3 mt-1 flex-shrink-0`} />
                <span className='font-semibold'>Custom Solutions:</span> Our models are built from the ground up to fit your unique operational context and data ecosystem.
              </p>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative">
            {/* Clean, abstract visual representation of data/AI */}
            <div className={`p-8 rounded-lg shadow-2xl relative overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className={`absolute top-0 left-0 w-full h-full opacity-10 ${isDark ? 'bg-white/10' : 'bg-black/10'} pointer-events-none`}></div>
              <p className={`text-4xl font-mono mb-4 ${isDark ? 'text-white/50' : 'text-gray-400'}`}>&lt;DataPipeline&gt;</p>
              <div className={`space-y-4 ${getClasses(theme, 'text-secondary')}`}>
                <div className={`flex justify-between border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} pb-2`}>
                  <span className="font-mono">OptimizationModel.run()</span>
                  <span className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>STATUS: COMPLETE</span>
                </div>
                <div className={`flex justify-between border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} pb-2`}>
                  <span className="font-mono">PredictiveEngine.query('Q3_Revenue')</span>
                  <span className={`font-semibold ${getClasses(theme, 'text-primary')}`}>$12.4M Predicted</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">CustomerSegmentation.analyze()</span>
                  <span className={`font-semibold ${getClasses(theme, 'text-highlight')}`}>4 Segments Identified</span>
                </div>
              </div>
              <p className={`text-4xl font-mono mt-4 text-right ${isDark ? 'text-white/50' : 'text-gray-400'}`}>&lt;/DataPipeline&gt;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 4. Solutions Component ---

const solutionsData = [
  { 
    title: "Lora", 
    description: "Custom-trained chatbots that understand your specific business context, enabling natural, accurate 24/7 customer and internal support.", 
    icon: MessageSquareText 
  },
  { 
    title: "Iris360", 
    description: "Advanced OCR APIs that digitize documents, extract key data points, and automate entry from invoices, receipts, and forms instantly.", 
    icon: ScanEye 
  },
  { 
    title: "Nexus", 
    description: "Autonomous agentic workflows that chain complex reasoning tasks together to execute multi-step business processes without human intervention.", 
    icon: Waypoints 
  },
  { 
    title: "GenPulse", 
    description: "Generative AI automations for creative content, code generation, and personalized marketing campaigns at enterprise scale.", 
    icon: Zap 
  },
];

 
const SolutionsSection = () => {
  const { theme, getClasses } = useTheme();
  return (
    <section id="solutions" className={`py-24 ${getClasses(theme, 'bg-main')} border-t ${getClasses(theme, 'border-separator')}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-4xl sm:text-5xl font-extrabold text-center mb-4 ${getClasses(theme, 'text-primary')}`}>
          Our AI <span className={getClasses(theme, 'text-highlight')}>Solution Suite</span>
        </h2>
        <p className={`text-xl text-center mb-16 max-w-3xl mx-auto ${getClasses(theme, 'text-secondary')}`}>
          We deliver modular, scalable solutions designed to integrate seamlessly into your existing infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutionsData.map((solution, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl shadow-lg transition duration-500 transform hover:translate-y-[-5px] ${getClasses(theme, 'card-bg')}`}
            >
              <solution.icon className={`h-10 w-10 ${getClasses(theme, 'text-primary')} mb-4 p-1 rounded-full ${getClasses(theme, 'icon-bg')}`} />
              <h3 className={`text-xl font-semibold mb-3 ${getClasses(theme, 'text-primary')}`}>{solution.title}</h3>
              <p className={`text-sm ${getClasses(theme, 'text-secondary')}`}>{solution.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button 
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); }}
            // FIX: Replaced broken class string with the new semantic utility class
            className={`inline-flex items-center px-6 py-3 text-sm font-medium rounded-full transition duration-300 border ${getClasses(theme, 'button-secondary-outline')}`}
          >
            Request a Customized Demo <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

{/* <SolutionsSection /> */}
// --- 5. Statistics/Impact Component ---

const statsData = [
  { value: "45%", label: "Average Efficiency Increase" },
  { value: "3.2x", label: "ROI on AI Investments" },
  { value: "150+", label: "Businesses Transformed" },
  { value: "99.8%", label: "Data Model Accuracy" },
];

const StatsSection = () => {
  const { theme, getClasses } = useTheme();
  return (
    <section id="impact" className={`py-24 ${getClasses(theme, 'bg-secondary')} border-t ${getClasses(theme, 'border-separator')}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-4xl sm:text-5xl font-extrabold text-center mb-12 ${getClasses(theme, 'text-primary')}`}>
          Measureable <span className={getClasses(theme, 'text-highlight')}>Business Impact</span>
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {statsData.map((stat, index) => (
            <div key={index} className="p-4">
              <p className={`text-5xl sm:text-6xl font-extrabold mb-2 ${getClasses(theme, 'text-primary')}`}>{stat.value}</p>
              <p className={`text-lg ${getClasses(theme, 'text-secondary')}`}>{stat.label}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <h3 className={`text-3xl font-semibold mb-4 ${getClasses(theme, 'text-highlight')}`}>Future-Proof Your Business.</h3>
          <p className={`text-lg ${getClasses(theme, 'text-secondary')}`}>
            The future of business is intelligent. Partner with EdgeAI to ensure your organization stays competitive, maximizes resource utilization, and uncovers new revenue streams through data-driven insight.
          </p>
        </div>
      </div>
    </section>
  );
};

// --- 6. Contact Us Component ---

const ContactSection = () => {
  const { theme, getClasses } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus(''); // Clear status on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock API call
    if (!formData.name || !formData.email || !formData.message) {
        setStatus("Please fill in all fields.");
        return;
    }
    
    setStatus('Sending...');
    
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setStatus('Message sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    }, 1500);
  };

  const InputField = ({ label, name, type = 'text', required = true }) => (
    <div>
      <label htmlFor={name} className={`block text-sm font-medium ${getClasses(theme, 'text-highlight')}`}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        value={formData[name]}
        onChange={handleChange}
        className={`mt-1 block w-full px-4 py-3 rounded-lg shadow-sm sm:text-sm transition duration-300 ${getClasses(theme, 'input-bg')}`}
      />
    </div>
  );

  const isDark = theme === 'dark';

  return (
    <section id="contact" className={`py-24 ${getClasses(theme, 'bg-main')} border-t ${getClasses(theme, 'border-separator')}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-4xl sm:text-5xl font-extrabold text-center mb-4 ${getClasses(theme, 'text-primary')}`}>
          Ready to <span className={getClasses(theme, 'text-highlight')}>Connect?</span>
        </h2>
        <p className={`text-xl text-center mb-16 max-w-2xl mx-auto ${getClasses(theme, 'text-secondary')}`}>
          Schedule a consultation with our AI strategists to map out your digital transformation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <div className={`lg:col-span-1 space-y-8 p-6 rounded-xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
            <h3 className={`text-2xl font-semibold mb-4 ${getClasses(theme, 'text-primary')}`}>Our Details</h3>
            
            <div className="flex items-start space-x-4">
              <Mail className={`h-6 w-6 ${getClasses(theme, 'text-primary')} flex-shrink-0 mt-1`} />
              <div>
                <p className={`font-medium ${getClasses(theme, 'text-highlight')}`}>Email Us</p>
                <a href="mailto:info@edgeai.com" className={`${getClasses(theme, 'text-secondary')} hover:${isDark ? 'text-white' : 'text-black'} transition duration-300`}>info@edgeai.com</a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Phone className={`h-6 w-6 ${getClasses(theme, 'text-primary')} flex-shrink-0 mt-1`} />
              <div>
                <p className={`font-medium ${getClasses(theme, 'text-highlight')}`}>Call Us</p>
                <a href="tel:+18005550199" className={`${getClasses(theme, 'text-secondary')} hover:${isDark ? 'text-white' : 'text-black'} transition duration-300`}>+1 (800) 555-0199</a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <MapPin className={`h-6 w-6 ${getClasses(theme, 'text-primary')} flex-shrink-0 mt-1`} />
              <div>
                <p className={`font-medium ${getClasses(theme, 'text-highlight')}`}>Our Headquarters</p>
                <p className={getClasses(theme, 'text-secondary')}>101 AI Drive, Suite 200, Silicon Valley, CA</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className={`lg:col-span-2 p-6 rounded-xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" name="name" />
                <InputField label="Work Email" name="email" type="email" />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium ${getClasses(theme, 'text-highlight')}`}>Message / Project Summary</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-3 rounded-lg shadow-sm sm:text-sm transition duration-300 ${getClasses(theme, 'input-bg')}`}
                ></textarea>
              </div>

              {status && (
                <div 
                  className={`p-3 rounded-lg text-sm ${
                    status.includes('successfully') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}
                >
                  {status}
              </div>
              )}

              <button
                type="submit"
                disabled={status.includes('Sending')}
                className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm transition duration-300 disabled:opacity-50 ${getClasses(theme, 'button-primary')}`}
              >
                {status.includes('Sending') ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
{/* <ContactSection /> */}

// --- 7. Footer Component ---

const Footer = () => {
  const { theme, getClasses } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`${getClasses(theme, 'bg-secondary')} border-t ${getClasses(theme, 'border-separator')}`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          
          <div className="flex justify-center md:order-2 space-x-6">
            {/* Social Icons Placeholder */}
            <a href="#" className={`${getClasses(theme, 'text-secondary')} hover:${isDark ? 'text-white' : 'text-black'} transition duration-300`}>LinkedIn</a>
            <a href="#" className={`${getClasses(theme, 'text-secondary')} hover:${isDark ? 'text-white' : 'text-black'} transition duration-300`}>Twitter</a>
          </div>
          
          <div className="mt-8 md:mt-0 md:order-1">
            <p className={`text-center text-base ${getClasses(theme, 'text-secondary')}`}>
              &copy; {new Date().getFullYear()} EdgeAI, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};


// --- 8. Main App Component (Provides Context) ---

const App = () => {
  const [theme, setTheme] = useState('light'); // Default to dark mode

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const themeContextValue = {
    theme,
    toggleTheme,
    getClasses: getThemeClasses, // Exporting the utility function for consumption
  };
  
  // Use a class on the body to handle background transitions and ensure the whole page adapts
  useEffect(() => {
    document.documentElement.className = theme; // Applies 'dark' or 'light' class
  }, [theme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`min-h-screen font-sans transition-colors duration-500 ${theme === 'dark' ? 'bg-black' : 'bg-blue-50'}`}>
        <style>{`
          /* Custom scroll behavior for the entire app */
          html {
            scroll-behavior: smooth;
          }
          /* Theme-specific body background */
          html.dark {
            background-color: #000000;
          }
          html.light {
            background-color: #ffffff;
          }
          /* Hide scrollbar for a cleaner look while allowing scrolling */
          body {
            scrollbar-width: none; /* Firefox */
          }
          body::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
        
        <Navbar />
        
        <main>
          <HeroSection />
          <AboutSection />
          <SolutionsSection />
          <StatsSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
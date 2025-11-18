
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Menu, X, ArrowRight, TrendingUp, Cpu, Users, Mail, Phone, MapPin, BarChart, Sun, Moon } from 'lucide-react';


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
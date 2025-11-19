import React from 'react';
import { ArrowRight, MessageSquareText, ScanEye, Waypoints, Zap } from 'lucide-react';

// --- INSTRUCTIONS FOR LOCAL USE ---
// 1. Uncomment the import line below.
// 2. Ensure the path '../App' points to your App.jsx file.
// 3. Delete the "Mock useTheme" block below.
// ----------------------------------

// import { useTheme } from '../App';

// --- MOCK useTheme (FOR PREVIEW ONLY - DELETE THIS IN LOCAL PROJECT) ---
const useTheme = () => ({
  theme: 'light', 
  getClasses: (theme, element) => {
    const isDark = theme === 'dark';
    switch (element) {
      case 'bg-main': return isDark ? 'bg-black text-white' : 'bg-white text-gray-900';
      case 'text-primary': return isDark ? 'text-white' : 'text-gray-900';
      case 'text-highlight': return isDark ? 'text-gray-300' : 'text-gray-600';
      case 'text-secondary': return isDark ? 'text-gray-400' : 'text-gray-600';
      case 'card-bg': return isDark ? 'bg-gray-900 border-gray-800 hover:border-white' : 'bg-white border-gray-200 hover:border-black shadow-lg';
      case 'icon-bg': return isDark ? 'bg-gray-700' : 'bg-gray-200';
      case 'button-secondary-outline': return isDark ? 'text-white border-white hover:bg-gray-900' : 'text-gray-900 border-gray-900 hover:bg-gray-100';
      case 'border-separator': return isDark ? 'border-gray-800' : 'border-gray-200';
      default: return '';
    }
  }
});
// ----------------------------------------------------------------------

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
  // Using the hook (either the real one locally, or the mock one here)
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
            className={`inline-flex items-center px-6 py-3 text-sm font-medium rounded-full transition duration-300 border ${getClasses(theme, 'button-secondary-outline')}`}
          >
            Request a Customized Demo <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
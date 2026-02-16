import React, { useEffect } from 'react';
import { Shield, Lock, Eye, FileText, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = ({ theme, getClasses }) => {
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Introduction",
      icon: Shield,
      content: "Welcome to EdgeAI. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you. This policy is compliant with the Kenya Data Protection Act 2019."
    },
    {
      title: "2. Data We Collect",
      icon: FileText,
      content: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: \n• Identity Data: Includes name, username or similar identifier.\n• Contact Data: Includes billing address, delivery address, email address and telephone numbers.\n• Technical Data: Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.\n• Usage Data: Includes information about how you use our website, products and services."
    },
    {
      title: "3. How We Use Your Data",
      icon: Eye,
      content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: \n• To register you as a new customer.\n• To process and deliver your order.\n• To manage our relationship with you.\n• To enable you to partake in a prize draw, competition or complete a survey.\n• To improve our website, products/services, marketing or customer relationships."
    },
    {
      title: "4. Legal Basis (Kenya Data Protection Act 2019)",
      icon: Shield,
      content: "Under the Data Protection Act 2019 of Kenya, we process your data based on your explicit consent, for the performance of a contract, to comply with legal obligations, or for our legitimate business interests. You have the right to withdraw consent at any time."
    },
    {
      title: "5. Data Security",
      icon: Lock,
      content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know."
    },
    {
      title: "6. Your Legal Rights",
      icon: Shield,
      content: "Under certain circumstances, you have rights under the Kenya Data Protection Act 2019 in relation to your personal data, including the right to: \n• Request access to your personal data.\n• Request correction of your personal data.\n• Request erasure of your personal data (the right to be forgotten).\n• Object to processing of your personal data.\n• Request restriction of processing.\n• Request transfer of your personal data."
    },
    {
      title: "7. Contact Us",
      icon: Mail,
      content: "If you have any questions about this privacy policy or our privacy practices, please contact us at:"
    }
  ];

  return (
    <div className={`min-h-screen pt-24 pb-12 transition-colors duration-500 ${isDark ? 'bg-black text-white' : 'bg-blue-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/')}
          className={`flex items-center space-x-2 mb-8 transition duration-300 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Home</span>
        </button>

        <div className={`p-8 sm:p-12 rounded-2xl shadow-2xl border ${getClasses(theme, 'card-bg')}`}>
          <div className="text-center mb-12">
            <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${getClasses(theme, 'text-primary')}`}>
              Privacy <span className={getClasses(theme, 'text-highlight')}>Policy</span>
            </h1>
            <p className={`${getClasses(theme, 'text-secondary')} text-lg`}>
              Last updated: {new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getClasses(theme, 'icon-bg')}`}>
                    <section.icon className={`h-6 w-6 ${getClasses(theme, 'text-primary')}`} />
                  </div>
                  <h2 className={`text-2xl font-bold ${getClasses(theme, 'text-primary')}`}>
                    {section.title}
                  </h2>
                </div>
                <div className={`whitespace-pre-line leading-relaxed ${getClasses(theme, 'text-secondary')}`}>
                  {section.content}
                </div>
                {section.title === "7. Contact Us" && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className={`h-5 w-5 ${getClasses(theme, 'text-primary')}`} />
                      <span className={getClasses(theme, 'text-secondary')}>edgeaiinc@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className={`h-5 w-5 ${getClasses(theme, 'text-primary')}`} />
                      <span className={getClasses(theme, 'text-secondary')}>+254 724 609 783</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className={`h-5 w-5 ${getClasses(theme, 'text-primary')}`} />
                      <span className={getClasses(theme, 'text-secondary')}>Delta Tower, Westlands, Nairobi, Kenya.</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`mt-16 pt-8 border-t ${getClasses(theme, 'border-separator')} text-center`}>
            <p className={`text-sm ${getClasses(theme, 'text-secondary')}`}>
              © {new Date().getFullYear()} OpsflowAI, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

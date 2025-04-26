
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-mechanical-gray text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m14.5 9.5-5 5" />
                <path d="m9.5 9.5 5 5" />
              </svg>
              MechCraft Studio
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Interactive 3D mechanical part configurator
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700 text-sm text-center text-gray-400">
          &copy; {new Date().getFullYear()} MechCraft Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

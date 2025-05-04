
import React from 'react';
import { Cog, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-mechanical-gray text-white">
      {/* Newsletter section */}
      <div className="bg-mechanical-blue/20 py-10">
        <div className="container mx-auto px-4">
          <div className="bg-mechanical-darkblue rounded-xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070')] opacity-10 bg-cover bg-center"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Join Our Engineering Newsletter</h3>
                <p className="text-white/80 max-w-md">Get the latest design tips, material insights, and manufacturing techniques.</p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-2.5 w-full sm:w-64 text-sm text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20" 
                  />
                  <Button type="submit" className="bg-white hover:bg-white/90 text-mechanical-darkblue font-medium">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1.5 mr-2">
                <Cog className="h-6 w-6 text-mechanical-blue" />
              </div>
              <h2 className="text-xl font-bold">MechCraft Studio</h2>
            </div>
            <p className="text-sm text-gray-300">
              MechCraft Studio provides precision engineering tools for designers and manufacturers, streamlining the creation of custom mechanical components.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-mechanical-lightblue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-mechanical-lightblue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-mechanical-lightblue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
            
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-mechanical-lightblue" />
                <span>123 Engineering Way, Tech City, CA 91234</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-mechanical-lightblue" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-mechanical-lightblue" />
                <span>contact@mechcraft.io</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Configurator</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Component Gallery</Link></li>
              <li><Link to="/compare" className="text-gray-300 hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Material Comparison</Link></li>
              <li><Link to="/history" className="text-gray-300 hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Design History</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Manufacturing API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />API Reference</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Material Database</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Engineering Standards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Manufacturing Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Professional Services</h3>
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-2">Enterprise Solutions</h4>
              <p className="text-sm text-gray-300 mb-3">
                Customized solutions for engineering departments with advanced simulation and collaboration features.
              </p>
              <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
            
            <Alert className="bg-mechanical-blue/20 border-mechanical-lightblue/30 text-white">
              <AlertDescription className="text-sm">
                Looking for custom development? Our engineering team can help build specialized tools for your workflow.
              </AlertDescription>
            </Alert>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400">
            &copy; {currentYear} MechCraft Studio. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

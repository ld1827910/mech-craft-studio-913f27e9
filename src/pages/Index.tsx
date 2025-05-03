
import React from 'react';
import Header from '@/components/Header';
import Configurator from '@/components/Configurator';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Code, 
  History, 
  Image, 
  Layers, 
  Package,
  Scale,
  Settings
} from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-mechanical-darkblue to-mechanical-blue py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Precision 3D Mechanical Part Configurator
            </h1>
            <p className="text-xl md:text-2xl md:w-3/4 mx-auto opacity-90 mb-8">
              Design customized mechanical components with engineering-grade precision
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#configurator" 
                className="bg-white text-mechanical-blue px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Start Configuring
              </a>
              
              <div className="flex gap-2">
                <Link to="/gallery">
                  <Button variant="outline" className="border-white/50 text-white hover:bg-white/10">
                    <Image className="mr-2 h-4 w-4" />
                    Browse Gallery
                  </Button>
                </Link>
                
                <Link to="/compare">
                  <Button variant="outline" className="border-white/50 text-white hover:bg-white/10">
                    <Scale className="mr-2 h-4 w-4" />
                    Compare Materials
                  </Button>
                </Link>
                
                <Link to="/history">
                  <Button variant="outline" className="border-white/50 text-white hover:bg-white/10">
                    <History className="mr-2 h-4 w-4" />
                    My Designs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div id="configurator" className="scroll-mt-16">
          <Configurator />
        </div>
        
        <div className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-mechanical-blue/10 dark:bg-mechanical-blue/20 text-mechanical-blue rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">API Integration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect to manufacturing APIs to get real-time quotes and production timelines.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-mechanical-blue/10 dark:bg-mechanical-blue/20 text-mechanical-blue rounded-lg flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Assembly Builder</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Combine multiple components into complete mechanical assemblies with constraints.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-mechanical-blue/10 dark:bg-mechanical-blue/20 text-mechanical-blue rounded-lg flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simulation Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Run stress tests and motion simulations on your designs before manufacturing.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-mechanical-blue/10 dark:bg-mechanical-blue/20 text-mechanical-blue rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Export Options</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Export designs in multiple formats compatible with popular CAD and CAM systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import Header from '@/components/Header';
import Configurator from '@/components/Configurator';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
            <div className="flex justify-center gap-4">
              <a 
                href="#configurator" 
                className="bg-white text-mechanical-blue px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Start Configuring
              </a>
              <a 
                href="#how-it-works" 
                className="border border-white/50 px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        
        <div id="configurator" className="scroll-mt-16">
          <Configurator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import Header from '@/components/Header';
import Configurator from '@/components/Configurator';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-mechanical-blue py-12 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Interactive 3D Gear Configurator
            </h1>
            <p className="text-xl md:w-3/4 mx-auto opacity-90">
              Customize mechanical components in real-time with our powerful 3D editor.
              Adjust parameters and see changes instantly.
            </p>
          </div>
        </div>
        
        <Configurator />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

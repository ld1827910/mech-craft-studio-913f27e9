
import React from 'react';
import Header from '@/components/Header';
import Configurator from '@/components/Configurator';
import Footer from '@/components/Footer';
import { 
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-mechanical-darkblue to-mechanical-blue py-16 md:py-20 lg:py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="fade-in">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full mb-6">
                Professional Engineering Tools
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto">
                Precision 3D Mechanical Part Configurator
              </h1>
              <p className="text-xl md:text-2xl md:w-3/4 mx-auto opacity-90 mb-10">
                Design customized mechanical components with engineering-grade precision and reliability
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a 
                  href="#configurator" 
                  className="bg-white text-mechanical-blue px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center shadow-lg border border-white"
                >
                  Start Designing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
              <path fill="#F9FAFB" fillOpacity="1" d="M0,128L80,149.3C160,171,320,213,480,208C640,203,800,149,960,133.3C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>
        </div>
        
        <div id="configurator" className="scroll-mt-16 pt-8">
          <Configurator />
        </div>

        <div className="bg-mechanical-blue py-16 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Designing?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of engineers using our platform to create precision mechanical components
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#configurator" 
                className="bg-white text-mechanical-blue px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg border border-white"
              >
                Get Started Free
              </a>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

import React from 'react';
import Header from '@/components/Header';
import Configurator from '@/components/Configurator';
import Footer from '@/components/Footer';
import { 
  Code, 
  Layers, 
  Package,
  Settings,
  ArrowRight,
  Users,
  LineChart,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
        
        <div className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Our professional-grade platform offers a suite of powerful tools to handle even the most complex engineering challenges.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border border-gray-100 dark:border-gray-700 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-mechanical-blue/10 dark:bg-mechanical-blue/20 text-mechanical-blue rounded-lg flex items-center justify-center mb-5">
                    <Code className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">API Integration</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Connect to manufacturing APIs to get real-time quotes and production timelines from trusted suppliers.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 dark:border-gray-700 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-mechanical-blue/10 dark:bg-mechanical-blue/20 text-mechanical-blue rounded-lg flex items-center justify-center mb-5">
                    <Layers className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Assembly Builder</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Combine multiple components into complete mechanical assemblies with constraint-based positioning.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 dark:border-gray-700 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-mechanical-blue/10 dark:bg-mechanical-blue/20 text-mechanical-blue rounded-lg flex items-center justify-center mb-5">
                    <Settings className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Simulation Tools</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Run stress tests and motion simulations on your designs before manufacturing to verify performance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-100 dark:border-gray-700 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-mechanical-blue/10 dark:bg-mechanical-blue/20 text-mechanical-blue rounded-lg flex items-center justify-center mb-5">
                    <Package className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Export Options</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Export designs in multiple formats compatible with popular CAD and CAM systems for seamless workflow.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 relative">
                  <div className="absolute -top-4 -left-4 bg-mechanical-blue text-white text-xs px-3 py-1 rounded-md">
                    Enterprise Ready
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-6">Why Engineering Teams Trust Us</h2>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-mechanical-blue/10 dark:bg-mechanical-blue/20 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-mechanical-blue" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">ISO/ANSI Standards Compliance</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          All components meet or exceed international engineering standards for reliability and safety.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-mechanical-blue/10 dark:bg-mechanical-blue/20 flex items-center justify-center">
                          <Users className="h-5 w-5 text-mechanical-blue" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Team Collaboration</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Real-time collaborative editing and version control for seamless team coordination.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-mechanical-blue/10 dark:bg-mechanical-blue/20 flex items-center justify-center">
                          <LineChart className="h-5 w-5 text-mechanical-blue" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Performance Analytics</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Advanced simulations provide critical performance data before manufacturing.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Button className="bg-mechanical-blue hover:bg-mechanical-darkblue">
                      Request a Demo
                    </Button>
                    <Button variant="outline">
                      View Case Studies
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Serving aerospace, automotive, and medical device industries with specialized engineering tools built for demanding applications.
                </p>
                
                <div className="relative">
                  <div className="aspect-video bg-mechanical-darkblue rounded-xl flex items-center justify-center overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070')] opacity-20 bg-cover bg-center"></div>
                    <div className="relative z-10 p-8 text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">Watch Demo</h3>
                      <p className="mb-6 opacity-90">See how our platform enables teams to design with precision</p>
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto cursor-pointer hover:bg-white/30 transition-colors">
                        <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 max-w-xs hidden md:block">
                    <div className="flex items-start gap-3">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="text-sm italic">"The configurator has revolutionized our prototyping process, reducing time-to-market by 45%."</p>
                        <p className="text-xs text-mechanical-blue mt-2 font-medium">— Sarah Chen, Lead Engineer at AeroTech</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

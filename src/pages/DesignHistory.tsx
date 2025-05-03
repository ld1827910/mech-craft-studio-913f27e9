
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Clock, Download, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface HistoryItem {
  id: string;
  title: string;
  partType: string;
  timestamp: string;
  material: string;
  parameters: { name: string; value: string }[];
}

const historyItems: HistoryItem[] = [
  {
    id: '1',
    title: 'Precision Gear 42T',
    partType: 'gear',
    timestamp: '2025-05-02 14:32',
    material: 'Steel',
    parameters: [
      { name: 'teeth', value: '42' },
      { name: 'radius', value: '7.5 cm' },
      { name: 'thickness', value: '1.2 cm' },
    ],
  },
  {
    id: '2',
    title: 'Hydraulic Pipe',
    partType: 'pipe',
    timestamp: '2025-05-01 09:15',
    material: 'Brass',
    parameters: [
      { name: 'length', value: '12 cm' },
      { name: 'radius', value: '1.5 cm' },
      { name: 'thickness', value: '0.3 cm' },
    ],
  },
  {
    id: '3',
    title: 'Compact Spring',
    partType: 'spring',
    timestamp: '2025-04-29 16:45',
    material: 'Titanium',
    parameters: [
      { name: 'radius', value: '2.2 cm' },
      { name: 'coils', value: '8' },
      { name: 'height', value: '6.5 cm' },
    ],
  },
  {
    id: '4',
    title: 'Heavy Duty Bolt',
    partType: 'bolt',
    timestamp: '2025-04-28 11:20',
    material: 'Stainless Steel',
    parameters: [
      { name: 'headRadius', value: '1.2 cm' },
      { name: 'length', value: '8.5 cm' },
      { name: 'shaftRadius', value: '0.6 cm' },
    ],
  },
];

const DesignHistory: React.FC = () => {
  const { toast } = useToast();
  
  const handleDelete = (id: string) => {
    toast({
      title: "Design removed",
      description: "The design has been deleted from history",
      duration: 2000,
    });
  };
  
  const handleRestore = (id: string) => {
    toast({
      title: "Design restored",
      description: "The design has been loaded in the configurator",
      duration: 2000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center mb-8">
            <Link to="/">
              <Button variant="ghost" className="mr-4">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Configurator
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Design History</h1>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Recent Designs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historyItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <Badge variant="outline" className="ml-2 capitalize">
                            {item.partType}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.timestamp} · Material: {item.material}
                        </p>
                        
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {item.parameters.map((param) => (
                            <div key={param.name} className="text-xs">
                              <span className="font-medium">{param.name}: </span>
                              <span className="text-gray-600 dark:text-gray-300">{param.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-3 md:mt-0">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRestore(item.id)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">Restore</span>
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Download className="h-4 w-4" />
                          <span className="hidden sm:inline">Export</span>
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                    {index < historyItems.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DesignHistory;

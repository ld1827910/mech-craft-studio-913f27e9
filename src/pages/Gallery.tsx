
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Download, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface GalleryItem {
  id: string;
  title: string;
  type: string;
  material: string;
  image: string;
  likes: number;
  downloads: number;
  designer: string;
  tags: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Precision Gear 42T',
    type: 'gear',
    material: 'Steel',
    image: 'https://images.unsplash.com/photo-1569815913216-287e99aada9c?q=80&w=300&auto=format&fit=crop',
    likes: 245,
    downloads: 89,
    designer: 'EngineerPro',
    tags: ['industrial', 'high-torque', 'durable'],
  },
  {
    id: '2',
    title: 'Lightweight Spring',
    type: 'spring',
    material: 'Titanium',
    image: 'https://images.unsplash.com/photo-1612690669207-fed642192c40?q=80&w=300&auto=format&fit=crop',
    likes: 132,
    downloads: 45,
    designer: 'MechDesigns',
    tags: ['aerospace', 'lightweight', 'high-tensile'],
  },
  {
    id: '3',
    title: 'Hydraulic Pipe Fitting',
    type: 'pipe',
    material: 'Brass',
    image: 'https://images.unsplash.com/photo-1613482184972-f9c1033daef0?q=80&w=300&auto=format&fit=crop',
    likes: 98,
    downloads: 32,
    designer: 'PlumbingGuru',
    tags: ['plumbing', 'pressure-resistant', 'corrosion-free'],
  },
  {
    id: '4',
    title: 'Heavy Duty Bolt',
    type: 'bolt',
    material: 'Stainless Steel',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=300&auto=format&fit=crop',
    likes: 176,
    downloads: 67,
    designer: 'FastenerPro',
    tags: ['construction', 'weatherproof', 'high-strength'],
  },
  {
    id: '5',
    title: 'Fine Thread Nut',
    type: 'nut',
    material: 'Aluminum',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=300&auto=format&fit=crop',
    likes: 84,
    downloads: 29,
    designer: 'NutsMaster',
    tags: ['precision', 'lightweight', 'fine-thread'],
  },
  {
    id: '6',
    title: 'Industrial Gear System',
    type: 'gear',
    material: 'Carbon Steel',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=300&auto=format&fit=crop',
    likes: 312,
    downloads: 124,
    designer: 'IndustrialDesigns',
    tags: ['heavy-duty', 'industrial', 'high-load'],
  },
];

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const { toast } = useToast();
  
  const handleLike = (id: string) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ));
    toast({
      title: "Design liked",
      description: "This design has been added to your favorites",
      duration: 2000,
    });
  };
  
  const handleDownload = (id: string) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, downloads: item.downloads + 1 } : item
    ));
    toast({
      title: "Download started",
      description: "Your file will be ready shortly",
      duration: 2000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link to="/">
                <Button variant="ghost" className="mr-4">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Configurator
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Component Gallery</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Latest</Button>
              <Button variant="outline" size="sm">Popular</Button>
              <Button variant="outline" size="sm">My Designs</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          By {item.designer} · {item.material}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t flex justify-between">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="flex items-center gap-1"
                          onClick={() => handleLike(item.id)}
                        >
                          <Heart className="h-4 w-4" />
                          <span>{item.likes}</span>
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="flex items-center gap-1"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button 
                        size="sm" 
                        onClick={() => handleDownload(item.id)}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>{item.downloads}</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;

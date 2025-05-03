
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  children, 
  defaultOpen = true,
  className
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className={cn("w-full border rounded-md overflow-hidden mb-4", className)}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
        <h3 className="text-lg font-medium">{title}</h3>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 bg-white">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleSection;

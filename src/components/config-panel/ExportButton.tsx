
import React from 'react';

const ExportButton: React.FC = () => {
  return (
    <div className="mt-8 pt-4 border-t">
      <button
        className="w-full bg-mechanical-blue hover:bg-mechanical-darkblue text-white py-3 rounded font-medium transition-colors"
      >
        Export Configuration
      </button>
    </div>
  );
};

export default ExportButton;

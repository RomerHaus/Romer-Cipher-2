import React from 'react';
import { RoemerCiphIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-950 border-b border-green-500/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/10 text-green-400 p-2 rounded-lg border border-green-500/30">
              <RoemerCiphIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-200 tracking-tight">
                Römer-Ciph v1.0
              </h1>
              <p className="text-sm text-green-400/80 -mt-1">
                The hidden layer that names the build.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
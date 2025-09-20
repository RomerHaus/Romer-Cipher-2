import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black/70 text-white w-full p-4 text-center">
      <h1 className="text-2xl font-bold">Römer-Ciph v1.0</h1>
      <p className="text-sm text-green-400">The hidden layer that names the build.</p>
    </header>
  );
};

export default Header;

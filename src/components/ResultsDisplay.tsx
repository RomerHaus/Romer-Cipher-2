import React from 'react';

interface ResultsDisplayProps {
  result: { count: number; productName: string } | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-gray-950/50 border-2 border-dashed border-green-500/20 rounded-lg p-8 flex items-center justify-center text-center h-full">
        <div className="text-green-400/60">
          <h2 className="text-xl font-semibold">Awaiting build parameters...</h2>
          <p className="mt-2 text-sm">Fill out the form and generate variants.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6 shadow-lg animate-fade-in h-full flex flex-col justify-center">
        <p className="text-sm text-green-400 font-mono">Build Status</p>
        <h2 className="text-3xl font-bold text-gray-100 mt-2">
            Build Successful
        </h2>
        <p className="text-gray-300 mt-4 text-base leading-relaxed">
            Successfully generated <span className="text-green-400 font-bold">{result.count}</span> new variant{result.count > 1 ? 's' : ''} for <span className="text-white font-semibold">"{result.productName}"</span>.
        </p>
        <p className="text-gray-400 mt-2 text-sm">
            All generated SKUs have been added to the build history below.
        </p>
    </div>
  );
};

export default ResultsDisplay;

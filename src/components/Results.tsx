import React from 'react';

interface ResultsProps {
  wpm: number;
  accuracy: number;
}

const Results: React.FC<ResultsProps> = ({ wpm, accuracy }) => {
  return (
    <div className="mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Test Results</h2>
      <p className="text-xl">WPM: {Math.round(wpm)}</p>
      <p className="text-xl">Accuracy: {accuracy.toFixed(2)}%</p>
    </div>
  );
};

export default Results;
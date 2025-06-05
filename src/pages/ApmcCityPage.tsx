import React from 'react';
import { useParams } from 'react-router-dom';

const ApmcCityPage = () => {
  const { cityId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">APMC Market - {cityId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Content will be added later */}
        <p className="text-gray-600">Market information for {cityId} will be displayed here.</p>
      </div>
    </div>
  );
};

export default ApmcCityPage;
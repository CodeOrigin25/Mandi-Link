import React from 'react';
import { useParams } from 'react-router-dom';

const TraderProfilePage = () => {
  const { traderId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trader Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Content will be added later */}
        <p className="text-gray-600">Profile information for trader {traderId} will be displayed here.</p>
      </div>
    </div>
  );
};

export default TraderProfilePage;
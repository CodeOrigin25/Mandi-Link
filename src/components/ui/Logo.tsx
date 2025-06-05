import React from 'react';
import { Store } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
      <Store className="h-6 w-6 text-green-700" />
    </div>
  );
};

export default Logo;
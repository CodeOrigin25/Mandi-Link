import React from 'react';
import { UserType } from '../../contexts/AuthContext';
import { Store, Truck, ShoppingBasket } from 'lucide-react';

interface RoleCardProps {
  type: UserType;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  type,
  title,
  description,
  icon,
  selected,
  onClick
}) => (
  <div 
    className={`relative cursor-pointer rounded-lg border-2 p-3 transition-all ${
      selected 
        ? 'border-green-600 bg-green-50' 
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}
    onClick={onClick}
  >
    <div className="flex items-start gap-3">
      <div className={`rounded-full p-2 ${selected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
    {selected && (
      <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-green-600 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-white"></div>
      </div>
    )}
  </div>
);

interface RoleSelectionProps {
  selectedRole: UserType | null;
  onRoleSelect: (role: UserType) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ selectedRole, onRoleSelect }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Select your role</h2>
      <div className="flex flex-col gap-4">
        <RoleCard
          type="trader"
          title="APMC Trader"
          icon={<Store size={20} />}
          selected={selectedRole === 'trader'}
          onClick={() => onRoleSelect('trader')}
        />
        <RoleCard
          type="producer"
          title="Producer"
          icon={<Truck size={20} />}
          selected={selectedRole === 'producer'}
          onClick={() => onRoleSelect('producer')}
        />
        <RoleCard
          type="consumer"
          title="Consumer"
          icon={<ShoppingBasket size={20} />}
          selected={selectedRole === 'consumer'}
          onClick={() => onRoleSelect('consumer')}
        />
      </div>
    </div>
  );
};

export default RoleSelection;
import React from 'react';

const EmptyState = ({ message, subMessage, icon }) => {
  return (
    <div className="card text-center py-12">
      {icon && <div className="mb-4">{icon}</div>}
      <p className="text-gray-300">{message}</p>
      {subMessage && <p className="text-sm text-gray-500 mt-2">{subMessage}</p>}
    </div>
  );
};

export default EmptyState;

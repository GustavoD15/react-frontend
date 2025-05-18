import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <header className="bg-background-light shadow-md">
      <div className="container-custom py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <img src="/logo.png" alt="DTM Logo" className="h-10 mr-3" />
            <h1 className="text-xl font-bold text-primary">DTM</h1>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <p className="text-sm text-gray-300">Olá, {user.nome || 'Usuário'}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            
            <button 
              onClick={onLogout}
              className="btn btn-secondary text-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

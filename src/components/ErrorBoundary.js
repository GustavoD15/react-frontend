import React from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const errorHandler = (error) => {
      setHasError(true);
      setError(error.message || 'Ocorreu um erro inesperado');
      console.error('Erro capturado pela ErrorBoundary:', error);
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="card max-w-md w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-primary mb-2">Ops! Algo deu errado</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setHasError(false);
              setError(null);
              window.location.href = '/';
            }}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;

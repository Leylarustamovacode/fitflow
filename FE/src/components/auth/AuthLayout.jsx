import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Uygulamaya Hoş Geldiniz
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

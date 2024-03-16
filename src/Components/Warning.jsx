import React from 'react';
import { Link } from 'react-router-dom';

const Warning = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Warning</h1>
        <p className="text-lg mb-8">
          You are not authorized to access this page. Please log in to continue.
        </p>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Login
        </Link>
      </div>
    )
}

export default Warning;
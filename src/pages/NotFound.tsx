
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from '../components/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <div className="neo-border bg-neo-yellow p-6 mb-8 transform -rotate-2">
          <p className="text-xl font-bold">Oops! Page not found</p>
        </div>
        <p className="text-xl mb-8">We couldn't find the page you're looking for.</p>
        <Link to="/" className="neo-button-blue">
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;

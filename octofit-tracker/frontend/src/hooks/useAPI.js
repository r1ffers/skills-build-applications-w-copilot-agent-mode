import { useState, useEffect } from 'react';

// Build API base URL
const getAPIBaseURL = () => {
  // Check if we're in a browser with Codespaces URL
  if (typeof window !== 'undefined' && window.location.hostname.includes('app.github.dev')) {
    // Extract codespace name from URL like: supreme-memory-759rwv6qj6vfw5xq-5173.app.github.dev
    const hostname = window.location.hostname;
    const codespaceName = hostname.split('-5173')[0]; // Remove the port part
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to environment variable or localhost
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
};

const API_BASE_URL = getAPIBaseURL();

export const useAPI = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

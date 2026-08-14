import { useState, useEffect } from 'react';

/**
 * Build API base URL using Vite environment variables
 * 
 * Priority:
 * 1. VITE_CODESPACE_NAME (if set) → https://{codespace}-8000.app.github.dev
 * 2. VITE_API_BASE_URL (if set) → uses custom base URL
 * 3. Fallback → http://localhost:8000
 * 
 * Requires: Set VITE_CODESPACE_NAME in .env.local for Codespaces deployment
 * Example: VITE_CODESPACE_NAME=supreme-memory-759rwv6qj6vfw5xq
 */
const getAPIBaseURL = () => {
  // Check if VITE_CODESPACE_NAME is set (Codespaces deployment)
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName !== 'your-codespace-name-here') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to explicit VITE_API_BASE_URL
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Default to localhost for development
  return 'http://localhost:8000';
};

const API_BASE_URL = getAPIBaseURL();

console.log('🔌 API Base URL:', API_BASE_URL);

/**
 * Custom hook for fetching data from OctoFit API endpoints
 * 
 * Handles both array responses and paginated responses
 * Returns data as array regardless of response format
 * 
 * @param {string} endpoint - API endpoint path (e.g., '/api/users')
 * @returns {object} { data (array), loading (boolean), error (string|null) }
 */
export const useAPI = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `${API_BASE_URL}${endpoint}`;
        console.log(`📡 Fetching: ${url}`);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Handle both array and paginated responses
        // If result is an array, use it directly
        // If result has a 'data' field (pagination), use that
        // Otherwise, wrap result in an array
        const arrayData = Array.isArray(result)
          ? result
          : result.data && Array.isArray(result.data)
            ? result.data
            : Array.isArray(result) ? result : [result];
        
        setData(arrayData);
        setError(null);
      } catch (err) {
        console.error(`❌ API Error (${endpoint}):`, err.message);
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

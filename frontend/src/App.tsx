import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const checkApiHealth = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/health');
      setApiResponse(JSON.stringify(response.data, null, 2));
    } catch (err) {
      setError('Failed to fetch API health.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend</h1>
        <button onClick={checkApiHealth}>Check API</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {apiResponse && (
          <div>
            <h2>API Response:</h2>
            <pre>{apiResponse}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

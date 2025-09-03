import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import { useAuthStore } from '../stores/authStore';

const Login = () => {
  const [username, setUsername] = useState('admin'); // Default for easy testing
  const [password, setPassword] = useState('admin123'); // Default for easy testing
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await apiClient.post('/auth/login', { username, password });
      if (response.data.ok) {
        const { token, user } = response.data;
        setAuth(token, user);
        navigate('/app/dashboard');
      } else {
        setError(response.data.message || 'Login failed.');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error(err);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="card-title text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

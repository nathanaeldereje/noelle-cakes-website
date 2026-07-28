import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { error } = await login(email, password);

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-brand-pink flex items-center justify-center p-4 font-body">
      <div className="bg-white rounded-2xl shadow-xl border border-brand-divider p-8 sm:p-10 w-full max-w-md space-y-6">
        
        <div className="text-center space-y-2">
          <h1 className="font-heading text-4xl text-brand-maroon">Betty's Portal</h1>
          <p className="text-brand-muted text-sm">Sign in to manage Noelle Cakes menu & specials</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="betty@noellecakes.com"
              className="w-full px-4 py-3 rounded-lg border border-brand-divider focus:outline-none focus:border-brand-maroon text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">
              Password
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-brand-divider focus:outline-none focus:border-brand-maroon text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-maroon text-brand-pink font-semibold py-3.5 rounded-lg hover:bg-brand-body transition-colors shadow-md disabled:opacity-50"
          >
            {isSubmitting ? 'Signing In...' : 'Log In to Dashboard'}
          </button>
        </form>

        <div className="text-center pt-2">
          <a href="/" className="text-xs text-brand-muted hover:text-brand-maroon underline">
            ← Back to Public Website
          </a>
        </div>

      </div>
    </div>
  );
}
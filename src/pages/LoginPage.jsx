import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import FormField from '../components/auth/FormField';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, loading, error, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const from = location.state?.from?.pathname || '/';
  const sessionExpired = searchParams.get('session') === 'expired';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!username.trim() || !password) {
      setLocalError('Username and password are required.');
      return;
    }

    try {
      await login(username.trim(), password);
      navigate(from, { replace: true });
    } catch {
      /* error set in context */
    }
  };

  return (
    <AuthCard
      title="Sign in"
      subtitle="Access your catalog and saved items. Test account details are in the README."
    >
      {sessionExpired && (
        <p
          className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200"
          role="alert"
        >
          Your session expired. Please sign in again.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-1">
        <FormField
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          autoComplete="username"
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          autoComplete="current-password"
        />

        <ErrorAlert message={localError || error} />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-amber-500 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Continue'}
        </button>
      </form>

      {loading && <LoadingSpinner label="Authenticating…" />}

      <p className="mt-8 text-center text-sm text-slate-500">
        New here?{' '}
        <Link to="/register" className="font-medium text-amber-400 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}

import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import FormField from '../components/auth/FormField';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register, login, loading, error, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    age: '25',
  });
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    const { firstName, lastName, email, username, password } = form;
    if (!firstName || !lastName || !email || !username || !password) {
      setLocalError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    try {
      await register(form);
      setSuccess(true);
      await login(username, password);
      navigate('/', { replace: true });
    } catch {
      /* handled in context */
    }
  };

  return (
    <AuthCard
      wide
      title="Create account"
      subtitle="Register a new account to start shopping. You'll be signed in automatically."
    >
      {success && (
        <p className="mb-4 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-400" role="status">
          Account created! Redirecting…
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-0 sm:grid-cols-2 sm:gap-4">
          <FormField
            id="firstName"
            label="First name"
            value={form.firstName}
            onChange={update('firstName')}
            disabled={loading}
          />
          <FormField
            id="lastName"
            label="Last name"
            value={form.lastName}
            onChange={update('lastName')}
            disabled={loading}
          />
        </div>

        <FormField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={update('email')}
          disabled={loading}
          autoComplete="email"
        />
        <FormField
          id="reg-username"
          label="Username"
          value={form.username}
          onChange={update('username')}
          disabled={loading}
          autoComplete="username"
        />

        <div className="grid gap-0 sm:grid-cols-2 sm:gap-4">
          <FormField
            id="reg-password"
            label="Password"
            type="password"
            value={form.password}
            onChange={update('password')}
            disabled={loading}
            autoComplete="new-password"
          />
          <FormField
            id="age"
            label="Age"
            type="number"
            value={form.age}
            onChange={update('age')}
            disabled={loading}
            min={18}
            max={120}
          />
        </div>

        <ErrorAlert message={localError || error} />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-amber-500 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      {loading && <LoadingSpinner label="Registering…" />}

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}

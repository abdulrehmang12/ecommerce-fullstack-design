import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { setAuth } from '../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [authView, setAuthView] = useState('auth');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetTokenPreview, setResetTokenPreview] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const payload = mode === 'signup' ? { name, email, password } : { email, password };
      const response = mode === 'signup'
        ? await authApi.signup(payload)
        : await authApi.login(payload);

      setAuth(response);
      navigate(response.user.role === 'admin' ? '/admin/products' : '/');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const requestReset = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const response = await authApi.requestPasswordReset(email);
      setMessage(response.message);
      setResetTokenPreview(response.resetToken || '');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const response = await authApi.resetPassword({ token: resetToken, newPassword });
      setMessage(response.message);
      setResetToken('');
      setNewPassword('');
      setAuthView('auth');
      setMode('login');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {authView === 'auth' ? (
          <>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {mode === 'signup' ? 'Create account' : 'Login'}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {mode === 'signup' ? 'Sign up to continue shopping' : 'Welcome back to Estore'}
            </p>

            <div className="mt-4 flex gap-2 rounded-lg bg-slate-100 p-1 text-sm font-semibold">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 rounded-md py-2 ${mode === 'login' ? 'bg-white text-slate-900' : 'text-slate-500'}`}
              >
                Login
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 rounded-md py-2 ${mode === 'signup' ? 'bg-white text-slate-900' : 'text-slate-500'}`}
              >
                Sign up
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={submit}>
              {mode === 'signup' && (
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                  required
                />
              )}

              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                required
              />

              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                required
              />

              {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}
              {message && <p className="text-sm font-semibold text-emerald-700">{message}</p>}

              <button
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Login'}
              </button>
            </form>

            <button
              onClick={() => {
                setAuthView('forgot');
                setError('');
                setMessage('');
              }}
              className="mt-4 text-xs font-bold text-blue-700"
            >
              Forgot password?
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-slate-900">Reset password</h1>
            <p className="mt-1 text-sm text-slate-500">Request a token, then set a new password</p>

            <form className="mt-5 space-y-3" onSubmit={requestReset}>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                required
              />
              <button
                disabled={loading}
                className="w-full rounded-lg border border-blue-600 px-4 py-2.5 text-sm font-bold text-blue-700"
              >
                Request reset token
              </button>
            </form>

            {resetTokenPreview && (
              <p className="mt-3 rounded bg-amber-50 p-2 text-xs font-semibold text-amber-800">
                Demo reset token: {resetTokenPreview}
              </p>
            )}

            <form className="mt-4 space-y-3" onSubmit={resetPassword}>
              <input
                value={resetToken}
                onChange={(event) => setResetToken(event.target.value)}
                type="text"
                placeholder="Reset token"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                required
              />
              <input
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                type="password"
                placeholder="New password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                required
              />
              {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}
              {message && <p className="text-sm font-semibold text-emerald-700">{message}</p>}
              <button
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white"
              >
                Reset password
              </button>
            </form>

            <button
              onClick={() => {
                setAuthView('auth');
                setError('');
                setMessage('');
              }}
              className="mt-4 text-xs font-bold text-blue-700"
            >
              Back to login
            </button>
          </>
        )}

        <p className="mt-4 text-xs text-slate-500">
          Admin demo: admin@estore.com / admin123
        </p>
      </div>
    </section>
  );
}

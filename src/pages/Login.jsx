import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';
import Container from '../components/Container.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { useToast } from '../components/Toast.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const loc = useLocation();
  const toast = useToast();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      const to = loc.state?.from?.pathname || '/profile';
      toast?.push('Ласкаво просимо!', 'success');
      navigate(to, { replace: true });
    } catch (err) {
      setError(err.uiMessage || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container style={{ padding: '60px 0', display: 'grid', placeItems: 'center', flex: 1 }}>
      <div
        className="fade-in"
        style={{
          width: '100%',
          maxWidth: 440,
          padding: 32,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--surface-2)',
          boxShadow: 'var(--shadow-soft)',
          border: '1px solid var(--border)',
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>З поверненням 👋</h1>
        <p className="muted" style={{ marginBottom: 28 }}>
          Увійди, щоб продовжити пошук дому
        </p>

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16 }}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="current-password"
          />
          {error ? (
            <div
              style={{
                padding: 12,
                background: 'rgba(225,29,72,0.08)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--danger)',
                fontSize: 14,
              }}
            >
              {error}
            </div>
          ) : null}
          <Button type="submit" loading={busy}>
            Увійти
          </Button>
        </form>

        <p style={{ marginTop: 22, fontSize: 14 }} className="muted">
          Ще не маєш акаунту?{' '}
          <Link to="/register" style={{ color: 'var(--accent-mint-strong)', fontWeight: 600 }}>
            Зареєструватися
          </Link>
        </p>
      </div>
    </Container>
  );
}

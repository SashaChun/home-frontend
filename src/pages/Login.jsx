import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, isFirebaseConfigured } from '../auth/firebase.js';
import Container from '../components/Container.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { useToast } from '../components/Toast.jsx';

const FIREBASE_ERROR_LABELS = {
  'auth/invalid-credential': 'Невірний email або пароль',
  'auth/user-not-found': 'Користувача не знайдено',
  'auth/wrong-password': 'Невірний пароль',
  'auth/too-many-requests': 'Забагато спроб. Спробуйте пізніше',
  'auth/invalid-email': 'Невірний формат email',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const loc = useLocation();
  const toast = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!isFirebaseConfigured) {
      setError('Firebase не налаштовано. Заповніть VITE_FIREBASE_* у client/.env');
      return;
    }
    setBusy(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      const to = loc.state?.from?.pathname || '/profile';
      toast?.push('Ласкаво просимо!', 'success');
      navigate(to, { replace: true });
    } catch (err) {
      setError(FIREBASE_ERROR_LABELS[err.code] || err.message);
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

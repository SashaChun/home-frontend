import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';
import Container from '../components/Container.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { useToast } from '../components/Toast.jsx';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const { register } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) { setError('Паролі не співпадають'); return; }
    if (password.length < 8) { setError('Пароль має містити мінімум 8 символів'); return; }
    setBusy(true);
    try {
      await register(name, email, password);
      toast?.push('Акаунт створено!', 'success');
      navigate('/profile', { replace: true });
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
          maxWidth: 460,
          padding: 32,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--surface-2)',
          boxShadow: 'var(--shadow-soft)',
          border: '1px solid var(--border)',
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Створи акаунт ✨</h1>
        <p className="muted" style={{ marginBottom: 28 }}>
          Це безкоштовно і займе менше хвилини
        </p>

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16 }}>
          <Input
            label="Ім'я"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={60}
          />
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
            autoComplete="new-password"
            hint="Мінімум 8 символів"
          />
          <Input
            label="Підтвердження пароля"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
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
            Зареєструватися
          </Button>
        </form>

        <p style={{ marginTop: 22, fontSize: 14 }} className="muted">
          Уже маєш акаунт?{' '}
          <Link to="/login" style={{ color: 'var(--accent-mint-strong)', fontWeight: 600 }}>
            Увійти
          </Link>
        </p>
      </div>
    </Container>
  );
}

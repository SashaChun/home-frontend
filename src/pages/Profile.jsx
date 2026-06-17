import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';
import Container from '../components/Container.jsx';
import Button from '../components/Button.jsx';
import MyListings from './MyListings.jsx';

const TABS = [
  { id: 'listings', label: 'Мої оголошення' },
  { id: 'favorites', label: 'Обране' },
  { id: 'settings', label: 'Налаштування' },
];

export default function Profile() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('listings');

  return (
    <Container style={{ padding: '40px 0' }}>
      <div
        className="fade-in"
        style={{
          padding: 28,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--gradient-button)',
            color: '#042f2e',
            display: 'grid',
            placeItems: 'center',
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          {(profile?.displayName || user?.email || '?').slice(0, 1).toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>
            {profile?.displayName || 'Без імені'}
          </h1>
          <p className="muted">{user?.email}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button onClick={() => navigate('/profile/listings/new')}>+ Додати оголошення</Button>
          <Button variant="outline" onClick={logout}>
            Вийти
          </Button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: 6,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          width: 'fit-content',
          marginBottom: 24,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              fontSize: 14,
              fontWeight: 600,
              background: tab === t.id ? 'var(--gradient-button)' : 'transparent',
              color: tab === t.id ? '#042f2e' : 'var(--text-muted)',
              transition: 'background .15s ease, color .15s ease',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'listings' ? (
        <MyListings />
      ) : tab === 'favorites' ? (
        <div
          style={{
            padding: 60,
            textAlign: 'center',
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-2)',
            color: 'var(--text-muted)',
          }}
        >
          Обране зʼявиться у Plan D
        </div>
      ) : (
        <div
          style={{
            padding: 24,
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-2)',
            color: 'var(--text-muted)',
          }}
        >
          Налаштування профілю — у Plan E (повна версія)
        </div>
      )}
    </Container>
  );
}

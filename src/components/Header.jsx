import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth.js';
import Button from './Button.jsx';

const navStyle = ({ isActive }) => ({
  padding: '8px 14px',
  borderRadius: 'var(--radius-pill)',
  fontSize: 14,
  fontWeight: 500,
  color: isActive ? '#042f2e' : 'var(--text-on-dark)',
  background: isActive ? 'rgba(255,255,255,0.92)' : 'transparent',
  transition: 'background .2s ease, color .2s ease',
});

export default function Header() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(4,47,46,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
          color: 'var(--text-on-dark)',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: '-0.02em',
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'var(--gradient-button)',
              display: 'inline-block',
            }}
          />
          Domivka
        </Link>

        <nav style={{ display: 'flex', gap: 4 }}>
          <NavLink to="/catalog" style={navStyle}>
            Каталог
          </NavLink>
          <NavLink to="/map" style={navStyle}>
            Карта
          </NavLink>
          <NavLink to="/about" style={navStyle}>
            Про нас
          </NavLink>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/profile/listings/new')}>
                + Додати
              </Button>
              <Link
                to="/profile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px 6px 6px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'var(--text-on-dark)',
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--gradient-button)',
                    color: '#042f2e',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {(profile?.displayName || user.email || '?').slice(0, 1).toUpperCase()}
                </span>
                {profile?.displayName || 'Профіль'}
              </Link>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                Вийти
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Увійти
              </Button>
              <Button size="sm" onClick={() => navigate('/register')}>
                Реєстрація
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

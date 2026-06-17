import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container.jsx';
import Button from '../components/Button.jsx';
import { CITIES } from '../../../shared/constants.js';

export default function Home() {
  const [city, setCity] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (priceMax) params.set('priceMax', priceMax);
    navigate(`/catalog${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const fieldStyle = {
    flex: 1,
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.10)',
    border: '1px solid rgba(255,255,255,0.18)',
    color: 'var(--text-on-dark)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 15,
    outline: 'none',
    fontFamily: 'inherit',
  };

  return (
    <>
      <section
        style={{
          position: 'relative',
          color: 'var(--text-on-dark)',
          background: 'var(--gradient-hero)',
          padding: '80px 0 110px',
          overflow: 'hidden',
        }}
      >
        <Container>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.18)',
              fontSize: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: 22,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent-mint)',
              }}
            />
            Знайди дім
          </div>
          <h1
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              maxWidth: 880,
              lineHeight: 1.05,
              marginBottom: 18,
            }}
          >
            Твій новий{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 500 }}>дім</span>
            <br />
            чекає на тебе
          </h1>
          <p style={{ maxWidth: 560, fontSize: 18, opacity: 0.85, marginBottom: 36 }}>
            Тисячі квартир, будинків, кімнат і студій у твоєму місті. Швидкий пошук, чесні власники, реальні фото.
          </p>

          <form
            onSubmit={onSearch}
            className="glass-strong"
            style={{
              display: 'flex',
              gap: 8,
              padding: 8,
              maxWidth: 720,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={fieldStyle}
            >
              <option value="" style={{ color: '#042f2e' }}>📍 Будь-яке місто</option>
              {CITIES.map((c) => (
                <option key={c} value={c} style={{ color: '#042f2e' }}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              placeholder="💰 Макс. бюджет, ₴"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              style={{ ...fieldStyle, minWidth: 180 }}
            />
            <Button size="md" type="submit">
              Шукати
            </Button>
          </form>
        </Container>
      </section>

      <section style={{ padding: '80px 0' }}>
        <Container>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 40 }}>Як це працює</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {[
              { n: '01', t: 'Зареєструйся', d: 'Швидка реєстрація через email та пароль.' },
              { n: '02', t: 'Шукай і фільтруй', d: 'Місто, ціна, кімнати, зручності — будь-які фільтри.' },
              { n: '03', t: 'Зв’язуйся з власником', d: 'Внутрішній чат у реальному часі. Без посередників.' },
            ].map((s) => (
              <div
                key={s.n}
                style={{
                  padding: 24,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--accent-mint-strong)',
                    marginBottom: 12,
                    letterSpacing: 2,
                  }}
                >
                  {s.n}
                </div>
                <h3 style={{ fontSize: 22, marginBottom: 8 }}>{s.t}</h3>
                <p className="muted" style={{ fontSize: 15 }}>
                  {s.d}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/catalog">
              <Button size="lg">Перейти до каталогу</Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

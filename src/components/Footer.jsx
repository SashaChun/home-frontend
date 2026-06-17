import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        background: 'var(--bg-deep)',
        color: 'var(--text-on-dark)',
        padding: '40px 0 24px',
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 24,
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Domivka</div>
          <p style={{ opacity: 0.7, fontSize: 14, lineHeight: 1.6 }}>
            Сучасна платформа для пошуку та оренди житла в Україні.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.6, marginBottom: 12 }}>
            Сервіс
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8, fontSize: 14, opacity: 0.85 }}>
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/map">Карта</Link></li>
            <li><Link to="/about">Про нас</Link></li>
            <li><Link to="/contact">Контакти</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.6, marginBottom: 12 }}>
            Допомога
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8, fontSize: 14, opacity: 0.85 }}>
            <li>Підтримка</li>
            <li>Умови</li>
            <li>Конфіденційність</li>
          </ul>
        </div>
      </div>
      <div
        className="container"
        style={{
          marginTop: 32,
          paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontSize: 13,
          opacity: 0.6,
        }}
      >
        © {new Date().getFullYear()} Domivka. Усі права захищені.
      </div>
    </footer>
  );
}

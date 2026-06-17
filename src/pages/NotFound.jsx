import { Link } from 'react-router-dom';
import Container from '../components/Container.jsx';
import Button from '../components/Button.jsx';

export default function NotFound() {
  return (
    <Container style={{ padding: '120px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 'clamp(64px, 12vw, 120px)', color: 'var(--accent-mint-strong)' }}>404</h1>
      <p style={{ fontSize: 20, marginBottom: 24 }}>Здається, такої сторінки немає</p>
      <Link to="/">
        <Button>На головну</Button>
      </Link>
    </Container>
  );
}

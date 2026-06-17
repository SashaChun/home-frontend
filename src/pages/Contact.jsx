import { useState } from 'react';
import Container from '../components/Container.jsx';
import Input from '../components/Input.jsx';
import Textarea from '../components/Textarea.jsx';
import Button from '../components/Button.jsx';
import { useToast } from '../components/Toast.jsx';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setName('');
      setEmail('');
      setMessage('');
      toast?.push('Дякуємо! Ми звʼяжемося з вами.', 'success');
    }, 600);
  };

  return (
    <Container style={{ padding: '40px 0', maxWidth: 720 }}>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 8 }}>Контакти</h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        Маєш питання? Напиши нам — відповімо протягом доби.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          marginBottom: 28,
        }}
      >
        <InfoCard icon="✉" title="Email" value="hi@domivka.app" />
        <InfoCard icon="📞" title="Телефон" value="+380 (44) 555 12 34" />
      </div>

      <form
        onSubmit={onSubmit}
        style={{
          display: 'grid',
          gap: 16,
          padding: 24,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <Input
          label="Імʼя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Textarea
          label="Повідомлення"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
        />
        <Button type="submit" loading={busy}>
          Надіслати
        </Button>
      </form>
    </Container>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div
      style={{
        padding: 18,
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
      }}
    >
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>
        {title}
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{value}</div>
    </div>
  );
}

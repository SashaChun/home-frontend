import Container from '../components/Container.jsx';

export default function About() {
  return (
    <>
      <section
        style={{
          background: 'var(--gradient-hero)',
          color: 'var(--text-on-dark)',
          padding: '60px 0',
        }}
      >
        <Container>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', maxWidth: 800 }}>
            Про <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Domivka</span>
          </h1>
          <p style={{ fontSize: 18, maxWidth: 700, opacity: 0.85, marginTop: 16 }}>
            Ми робимо пошук житла зрозумілим, чесним і людським. Без посередників, без зайвої комісії, без обману.
          </p>
        </Container>
      </section>

      <Container style={{ padding: '60px 0', maxWidth: 880 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
            marginBottom: 40,
          }}
        >
          {[
            { n: '12 482', t: 'оголошень' },
            { n: '38', t: 'міст України' },
            { n: '94%', t: 'успішних угод' },
          ].map((s) => (
            <div
              key={s.t}
              style={{
                padding: 22,
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--accent-mint-strong)' }}>
                {s.n}
              </div>
              <div className="muted" style={{ marginTop: 4 }}>
                {s.t}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 28, marginBottom: 12 }}>Наша місія</h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
          Domivka — це сучасна платформа, де орендарі та власники зустрічаються напряму. Ми розробили
          інтуїтивний пошук з фільтрами, додали внутрішній чат у реальному часі та зробили все, щоб ти знайшов
          ідеальне житло за лічені хвилини.
        </p>
        <h2 style={{ fontSize: 28, marginTop: 36, marginBottom: 12 }}>Чому Domivka</h2>
        <ul style={{ paddingLeft: 20, lineHeight: 1.8, fontSize: 16 }}>
          <li>Без комісій і прихованих платежів</li>
          <li>Реальні фото і чесні описи</li>
          <li>Чат із власником у застосунку</li>
          <li>Гнучкі фільтри і пошук на карті</li>
          <li>Підтримка довгострокової та подобової оренди</li>
        </ul>
      </Container>
    </>
  );
}

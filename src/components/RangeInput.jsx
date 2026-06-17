export default function RangeInput({ label, valueMin, valueMax, onChange, suffix }) {
  const setMin = (e) => onChange({ min: e.target.value, max: valueMax });
  const setMax = (e) => onChange({ min: valueMin, max: e.target.value });
  return (
    <div>
      <span style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="number"
          inputMode="numeric"
          placeholder="Від"
          value={valueMin ?? ''}
          onChange={setMin}
          style={fieldStyle}
        />
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</span>
        <input
          type="number"
          inputMode="numeric"
          placeholder="До"
          value={valueMax ?? ''}
          onChange={setMax}
          style={fieldStyle}
        />
        {suffix ? <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{suffix}</span> : null}
      </div>
    </div>
  );
}

const fieldStyle = {
  flex: 1,
  width: '100%',
  padding: '10px 12px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border)',
  background: 'var(--surface-2)',
  fontSize: 14,
  outline: 'none',
};

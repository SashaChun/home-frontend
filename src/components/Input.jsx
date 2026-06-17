import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, hint, style, containerStyle, ...rest },
  ref,
) {
  return (
    <label style={{ display: 'block', ...containerStyle }}>
      {label ? (
        <span
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 6,
            color: 'var(--text-primary)',
          }}
        >
          {label}
        </span>
      ) : null}
      <input
        ref={ref}
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: 'var(--radius-sm)',
          border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
          background: 'var(--surface-2)',
          fontSize: 15,
          outline: 'none',
          transition: 'border-color .15s ease, box-shadow .15s ease',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = error ? 'var(--danger)' : 'var(--accent-mint-strong)';
          e.currentTarget.style.boxShadow = `0 0 0 4px ${error ? 'rgba(225,29,72,.15)' : 'rgba(45,212,191,.18)'}`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? 'var(--danger)' : 'var(--border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...rest}
      />
      {error ? (
        <span style={{ display: 'block', fontSize: 12, color: 'var(--danger)', marginTop: 6 }}>
          {error}
        </span>
      ) : hint ? (
        <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
          {hint}
        </span>
      ) : null}
    </label>
  );
});

export default Input;

import { forwardRef } from 'react';

const Select = forwardRef(function Select(
  { label, error, hint, children, style, containerStyle, ...rest },
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
      <select
        ref={ref}
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: 'var(--radius-sm)',
          border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
          background: 'var(--surface-2)',
          fontSize: 15,
          outline: 'none',
          appearance: 'none',
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\'><path d=\'M1 1l5 5 5-5\' stroke=\'%23475569\' stroke-width=\'2\' fill=\'none\'/></svg>")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
          paddingRight: 36,
          ...style,
        }}
        {...rest}
      >
        {children}
      </select>
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

export default Select;

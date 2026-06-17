const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '12px 22px',
  borderRadius: 'var(--radius-pill)',
  fontWeight: 600,
  fontSize: 15,
  transition: 'transform .15s ease, box-shadow .2s ease, background .2s ease, opacity .2s ease',
  whiteSpace: 'nowrap',
};

const variants = {
  primary: {
    background: 'var(--gradient-button)',
    color: '#042f2e',
    boxShadow: '0 8px 24px rgba(45,212,191,0.35)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-on-dark)',
    border: '1px solid rgba(255,255,255,0.25)',
  },
  light: {
    background: '#fff',
    color: 'var(--text-primary)',
    boxShadow: '0 4px 14px rgba(2,44,42,0.10)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
  },
  danger: {
    background: 'var(--danger)',
    color: '#fff',
  },
};

const sizes = {
  sm: { padding: '8px 14px', fontSize: 13 },
  md: {},
  lg: { padding: '16px 28px', fontSize: 16 },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled,
  loading,
  children,
  style,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      style={{
        ...baseStyle,
        ...variants[variant],
        ...sizes[size],
        opacity: disabled || loading ? 0.65 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      {...rest}
    >
      {loading ? <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> : null}
      {children}
    </button>
  );
}

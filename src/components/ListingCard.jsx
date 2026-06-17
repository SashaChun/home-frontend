import { Link } from 'react-router-dom';
import { HOUSING_TYPE_LABELS } from '../../../shared/constants.js';

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="%232dd4bf"/><stop offset="1" stop-color="%2338bdf8"/></linearGradient></defs><rect width="400" height="300" fill="url(%23g)"/><text x="200" y="160" font-family="Manrope" font-size="22" fill="white" text-anchor="middle" font-weight="700">Domivka</text></svg>';

export default function ListingCard({ listing }) {
  const photo = listing.photos?.[0] || PLACEHOLDER;

  return (
    <Link
      to={`/listing/${listing.id}`}
      style={{
        display: 'block',
        background: 'var(--surface-2)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
        transition: 'transform .2s ease, box-shadow .2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          background: `url(${photo}) center/cover no-repeat`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            padding: '4px 12px',
            background: 'rgba(255,255,255,0.92)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-pill)',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {HOUSING_TYPE_LABELS[listing.type] || listing.type}
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 4,
            color: 'var(--text-primary)',
          }}
        >
          {listing.price?.toLocaleString('uk-UA')} ₴
          <span className="muted" style={{ fontSize: 13, fontWeight: 500 }}>
            {listing.rentTerm === 'daily' ? ' / доба' : ' / міс'}
          </span>
        </div>
        <h3
          style={{
            fontSize: 16,
            marginBottom: 8,
            color: 'var(--text-primary)',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {listing.title}
        </h3>
        <div className="muted" style={{ fontSize: 13, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <span>📍 {listing.city}</span>
          {listing.rooms ? <span>· {listing.rooms} {listing.rooms === 1 ? 'кімн.' : 'кімн.'}</span> : null}
          {listing.area ? <span>· {listing.area} м²</span> : null}
        </div>
      </div>
    </Link>
  );
}

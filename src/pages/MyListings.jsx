import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listingsApi } from '../hooks/useListings.js';
import ListingCard from '../components/ListingCard.jsx';
import Button from '../components/Button.jsx';

export default function MyListings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listingsApi
      .list({ mine: '1', limit: 60 })
      .then((r) => setItems(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div style={{ display: 'grid', placeItems: 'center', padding: 80 }}>
        <div className="spinner" />
      </div>
    );

  if (items.length === 0)
    return (
      <div
        style={{
          padding: 60,
          textAlign: 'center',
          border: '1px dashed var(--border)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--surface-2)',
        }}
      >
        <h3 style={{ fontSize: 22, marginBottom: 8 }}>Ще немає оголошень</h3>
        <p className="muted" style={{ marginBottom: 20 }}>
          Додай перше за хвилину
        </p>
        <Link to="/profile/listings/new">
          <Button>+ Додати оголошення</Button>
        </Link>
      </div>
    );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 18,
      }}
    >
      {items.map((l) => (
        <div key={l.id} style={{ position: 'relative' }}>
          <ListingCard listing={l} />
          <Link
            to={`/profile/listings/${l.id}/edit`}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255,255,255,0.95)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            ✎ Редагувати
          </Link>
        </div>
      ))}
    </div>
  );
}

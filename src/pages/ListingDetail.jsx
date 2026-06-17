import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listingsApi } from '../hooks/useListings.js';
import { useAuth } from '../auth/useAuth.js';
import Container from '../components/Container.jsx';
import Button from '../components/Button.jsx';
import Gallery from '../components/Gallery.jsx';
import MapEmbed from '../components/MapEmbed.jsx';
import {
  HOUSING_TYPE_LABELS,
  RENT_TERM_LABELS,
  AMENITY_LABELS,
} from '../../../shared/constants.js';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    listingsApi
      .getOne(id)
      .then((r) => setListing(r.data))
      .catch((e) => setError(e.uiMessage || 'Помилка'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Container style={{ padding: '60px 0', display: 'grid', placeItems: 'center' }}>
        <div className="spinner" />
      </Container>
    );
  if (error)
    return <Container style={{ padding: '60px 0', color: 'var(--danger)' }}>{error}</Container>;
  if (!listing) return null;

  const isOwner = user && listing.ownerId === user.uid;

  return (
    <Container style={{ padding: '40px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, alignItems: 'start' }}>
        <Gallery photos={listing.photos} />

        <div>
          <div className="muted" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>
            {HOUSING_TYPE_LABELS[listing.type]} · {RENT_TERM_LABELS[listing.rentTerm]}
          </div>
          <h1 style={{ fontSize: 32, margin: '8px 0 12px' }}>{listing.title}</h1>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-mint-strong)' }}>
            {listing.price?.toLocaleString('uk-UA')} ₴
            <span className="muted" style={{ fontSize: 14, fontWeight: 500 }}>
              {listing.rentTerm === 'daily' ? ' / доба' : ' / місяць'}
            </span>
          </div>

          <div className="muted" style={{ marginTop: 12 }}>
            📍 {[listing.city, listing.district, listing.address].filter(Boolean).join(', ')}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            {isOwner ? (
              <>
                <Button onClick={() => navigate(`/profile/listings/${listing.id}/edit`)}>
                  Редагувати
                </Button>
                <Button variant="outline">Це ваше оголошення</Button>
              </>
            ) : (
              <>
                <Button>✉ Написати власнику</Button>
                <Button variant="outline">❤ В обране</Button>
              </>
            )}
          </div>

          <div
            style={{
              marginTop: 24,
              padding: 18,
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
              fontSize: 14,
            }}
          >
            <div>
              <div className="muted">Кімнат</div>
              <div style={{ fontWeight: 600 }}>{listing.rooms}</div>
            </div>
            <div>
              <div className="muted">Площа</div>
              <div style={{ fontWeight: 600 }}>{listing.area} м²</div>
            </div>
            <div>
              <div className="muted">Тип</div>
              <div style={{ fontWeight: 600 }}>{HOUSING_TYPE_LABELS[listing.type]}</div>
            </div>
            <div>
              <div className="muted">Термін</div>
              <div style={{ fontWeight: 600 }}>{RENT_TERM_LABELS[listing.rentTerm]}</div>
            </div>
          </div>

          {listing.amenities?.length ? (
            <div style={{ marginTop: 20 }}>
              <h3 style={{ fontSize: 16, marginBottom: 10 }}>Зручності</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {listing.amenities.map((a) => (
                  <span
                    key={a}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(45,212,191,0.12)',
                      color: 'var(--accent-mint-strong)',
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {AMENITY_LABELS[a] || a}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 24, marginBottom: 12 }}>Опис</h2>
        <p style={{ whiteSpace: 'pre-wrap', fontSize: 16, lineHeight: 1.7 }}>
          {listing.description}
        </p>
      </section>

      {listing.location ? (
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, marginBottom: 12 }}>На карті</h2>
          <MapEmbed listings={[listing]} center={listing.location} zoom={15} height={360} />
        </section>
      ) : null}

      <section
        style={{
          marginTop: 40,
          padding: 24,
          borderRadius: 'var(--radius-md)',
          background: 'var(--surface-2)',
          border: '1px dashed var(--border)',
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}
      >
        Відгуки і чат зʼявляться у Plan D.
      </section>

      <div style={{ marginTop: 24 }}>
        <Link to="/catalog">← До каталогу</Link>
      </div>
    </Container>
  );
}

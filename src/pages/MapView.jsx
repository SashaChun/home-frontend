import { useEffect, useState } from 'react';
import { listingsApi } from '../hooks/useListings.js';
import { useUrlFilters } from '../hooks/useUrlFilters.js';
import Container from '../components/Container.jsx';
import ListingCard from '../components/ListingCard.jsx';
import MapEmbed from '../components/MapEmbed.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';

export default function MapView() {
  const { filters, setFilter, setMany, reset, toApiParams } = useUrlFilters();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listingsApi
      .list({ ...toApiParams(), limit: 60 })
      .then((r) => setItems(r.data))
      .finally(() => setLoading(false));
  }, [toApiParams]);

  return (
    <Container style={{ padding: '24px 0' }}>
      <h1 style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: 16 }}>Карта</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 280px) 1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <FilterSidebar filters={filters} setFilter={setFilter} setMany={setMany} reset={reset} />

        <div style={{ display: 'grid', gap: 18 }}>
          <MapEmbed listings={items} height={460} />
          {loading ? (
            <div style={{ display: 'grid', placeItems: 'center', padding: 60 }}>
              <div className="spinner" />
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 18,
              }}
            >
              {items.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

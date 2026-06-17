import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listingsApi } from '../hooks/useListings.js';
import { useUrlFilters } from '../hooks/useUrlFilters.js';
import { useAuth } from '../auth/useAuth.js';
import Container from '../components/Container.jsx';
import ListingCard from '../components/ListingCard.jsx';
import Button from '../components/Button.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import SortSelect from '../components/SortSelect.jsx';
import Input from '../components/Input.jsx';

export default function Catalog() {
  const { filters, setFilter, setMany, reset, toApiParams } = useUrlFilters();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(filters.q || '');

  useEffect(() => {
    setLoading(true);
    listingsApi
      .list({ ...toApiParams(), limit: 24 })
      .then((r) => {
        setItems(r.data);
        setNextCursor(r.nextCursor);
      })
      .catch((e) => setError(e.uiMessage || 'Не вдалося завантажити'))
      .finally(() => setLoading(false));
  }, [toApiParams]);

  const loadMore = async () => {
    if (!nextCursor) return;
    setLoadingMore(true);
    try {
      const r = await listingsApi.list({ ...toApiParams(), limit: 24, after: nextCursor });
      setItems((prev) => [...prev, ...r.data]);
      setNextCursor(r.nextCursor);
    } finally {
      setLoadingMore(false);
    }
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setFilter('q', searchInput.trim());
  };

  return (
    <Container style={{ padding: '32px 0' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 280px) 1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <FilterSidebar filters={filters} setFilter={setFilter} setMany={setMany} reset={reset} />

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              marginBottom: 16,
              flexWrap: 'wrap',
            }}
          >
            <h1 style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}>Каталог</h1>
            {user ? (
              <Link to="/profile/listings/new">
                <Button size="sm">+ Додати оголошення</Button>
              </Link>
            ) : null}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 220px',
              gap: 12,
              marginBottom: 18,
            }}
          >
            <form onSubmit={submitSearch}>
              <Input
                placeholder="🔍 Шукати за заголовком, описом, адресою..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
            <SortSelect value={filters.sort} onChange={(v) => setFilter('sort', v)} />
          </div>

          <p className="muted" style={{ marginBottom: 18, fontSize: 14 }}>
            Знайдено: {items.length}
            {nextCursor ? '+' : ''}
          </p>

          {loading ? (
            <div style={{ display: 'grid', placeItems: 'center', padding: 80 }}>
              <div className="spinner" />
            </div>
          ) : error ? (
            <div style={{ color: 'var(--danger)' }}>{error}</div>
          ) : items.length === 0 ? (
            <div
              style={{
                padding: 60,
                textAlign: 'center',
                border: '1px dashed var(--border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-2)',
              }}
            >
              <h3 style={{ fontSize: 22, marginBottom: 8 }}>Нічого не знайдено</h3>
              <p className="muted" style={{ marginBottom: 20 }}>
                Спробуй змінити фільтри
              </p>
              <Button variant="outline" onClick={reset}>
                Скинути фільтри
              </Button>
            </div>
          ) : (
            <>
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
              {nextCursor ? (
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                  <Button variant="outline" loading={loadingMore} onClick={loadMore}>
                    Завантажити ще
                  </Button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Container>
  );
}

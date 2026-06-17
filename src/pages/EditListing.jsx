import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { listingsApi } from '../hooks/useListings.js';
import Container from '../components/Container.jsx';
import ListingForm from '../components/ListingForm.jsx';
import Button from '../components/Button.jsx';
import { useToast } from '../components/Toast.jsx';

export default function EditListing() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('new') === '1';
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    listingsApi
      .getOne(id)
      .then((r) => setListing(r.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const r = await listingsApi.update(id, payload);
      setListing(r.data);
      toast?.push('Збережено', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const r = await listingsApi.uploadPhoto(id, file);
      setListing(r.data);
      toast?.push('Фото додано', 'success');
    } catch (err) {
      toast?.push(err.uiMessage || 'Не вдалося завантажити', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePhotoDelete = async (url) => {
    if (!confirm('Видалити фото?')) return;
    try {
      const r = await listingsApi.deletePhoto(id, url);
      setListing(r.data);
    } catch (err) {
      toast?.push(err.uiMessage || 'Помилка', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Видалити оголошення?')) return;
    try {
      await listingsApi.remove(id);
      toast?.push('Оголошення видалено', 'success');
      navigate('/profile', { replace: true });
    } catch (err) {
      toast?.push(err.uiMessage || 'Помилка', 'error');
    }
  };

  if (loading)
    return (
      <Container style={{ padding: '60px 0', display: 'grid', placeItems: 'center' }}>
        <div className="spinner" />
      </Container>
    );
  if (!listing) return null;

  const formInitial = {
    title: listing.title,
    description: listing.description,
    type: listing.type,
    rentTerm: listing.rentTerm,
    price: String(listing.price ?? ''),
    rooms: String(listing.rooms ?? ''),
    area: String(listing.area ?? ''),
    city: listing.city,
    district: listing.district || '',
    address: listing.address || '',
    lat: String(listing.location?.lat ?? ''),
    lng: String(listing.location?.lng ?? ''),
    amenities: listing.amenities || [],
    videoUrl: listing.videoUrl || '',
  };

  return (
    <Container style={{ padding: '40px 0', maxWidth: 760 }}>
      <h1 style={{ fontSize: 32, marginBottom: 6 }}>Редагування оголошення</h1>
      {isNew ? (
        <p style={{ marginBottom: 24, color: 'var(--accent-mint-strong)' }}>
          Оголошення створено! Додай фото нижче.
        </p>
      ) : null}

      <section
        style={{
          marginBottom: 28,
          padding: 18,
          borderRadius: 'var(--radius-md)',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
        }}
      >
        <h3 style={{ fontSize: 18, marginBottom: 12 }}>Фото</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 10,
            marginBottom: 14,
          }}
        >
          {listing.photos?.map((url) => (
            <div
              key={url}
              style={{
                position: 'relative',
                aspectRatio: '4 / 3',
                borderRadius: 'var(--radius-sm)',
                background: `url(${url}) center/cover no-repeat`,
              }}
            >
              <button
                type="button"
                onClick={() => handlePhotoDelete(url)}
                style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  fontSize: 16,
                  display: 'grid',
                  placeItems: 'center',
                }}
                aria-label="Видалити фото"
              >
                ×
              </button>
            </div>
          ))}
          {!listing.photos?.length ? (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: 30,
                textAlign: 'center',
                border: '1px dashed var(--border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-muted)',
              }}
            >
              Поки немає фото
            </div>
          ) : null}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: 'none' }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          loading={uploading}
        >
          Додати фото
        </Button>
      </section>

      <ListingForm
        initial={formInitial}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Зберегти зміни"
      />

      <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <Button variant="danger" onClick={handleDelete}>
          Видалити оголошення
        </Button>
      </div>
    </Container>
  );
}

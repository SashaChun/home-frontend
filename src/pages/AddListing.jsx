import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingsApi } from '../hooks/useListings.js';
import Container from '../components/Container.jsx';
import ListingForm from '../components/ListingForm.jsx';
import { useToast } from '../components/Toast.jsx';

export default function AddListing() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const r = await listingsApi.create(payload);
      toast?.push('Оголошення створено!', 'success');
      navigate(`/profile/listings/${r.data.id}/edit?new=1`, { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container style={{ padding: '40px 0', maxWidth: 760 }}>
      <h1 style={{ fontSize: 32, marginBottom: 6 }}>Нове оголошення</h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        Заповни параметри. Фото додаси на наступному кроці.
      </p>
      <ListingForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Створити оголошення" />
    </Container>
  );
}

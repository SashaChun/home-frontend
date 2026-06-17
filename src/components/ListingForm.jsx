import { useState } from 'react';
import Input from './Input.jsx';
import Select from './Select.jsx';
import Textarea from './Textarea.jsx';
import Button from './Button.jsx';
import {
  HOUSING_TYPES,
  HOUSING_TYPE_LABELS,
  RENT_TERMS,
  RENT_TERM_LABELS,
  AMENITIES,
  AMENITY_LABELS,
  CITIES,
} from '../shared/constants.js';

const empty = {
  title: '',
  description: '',
  type: 'apartment',
  rentTerm: 'long',
  price: '',
  rooms: '1',
  area: '',
  city: CITIES[0],
  district: '',
  address: '',
  lat: '50.4501',
  lng: '30.5234',
  amenities: [],
  videoUrl: '',
};

export default function ListingForm({ initial, onSubmit, submitting, submitLabel = 'Зберегти' }) {
  const [v, setV] = useState({ ...empty, ...initial });
  const [error, setError] = useState(null);

  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const toggleAmenity = (a) =>
    setV((s) => ({
      ...s,
      amenities: s.amenities.includes(a)
        ? s.amenities.filter((x) => x !== a)
        : [...s.amenities, a],
    }));

  const submit = (e) => {
    e.preventDefault();
    setError(null);
    const lat = Number(v.lat);
    const lng = Number(v.lng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      setError('Координати мають бути числами');
      return;
    }
    const payload = {
      title: v.title.trim(),
      description: v.description.trim(),
      type: v.type,
      rentTerm: v.rentTerm,
      price: Number(v.price),
      rooms: Number(v.rooms),
      area: Number(v.area),
      city: v.city,
      district: v.district || null,
      address: v.address || null,
      location: { lat, lng },
      amenities: v.amenities,
      videoUrl: v.videoUrl || null,
    };
    onSubmit(payload).catch((e) => setError(e.uiMessage || e.message));
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 18 }}>
      <Input label="Заголовок" value={v.title} onChange={set('title')} required minLength={4} maxLength={120} />
      <Textarea
        label="Опис"
        value={v.description}
        onChange={set('description')}
        required
        minLength={10}
        rows={6}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
        <Select label="Тип житла" value={v.type} onChange={set('type')}>
          {HOUSING_TYPES.map((t) => (
            <option key={t} value={t}>
              {HOUSING_TYPE_LABELS[t]}
            </option>
          ))}
        </Select>
        <Select label="Термін оренди" value={v.rentTerm} onChange={set('rentTerm')}>
          {RENT_TERMS.map((t) => (
            <option key={t} value={t}>
              {RENT_TERM_LABELS[t]}
            </option>
          ))}
        </Select>
        <Input
          label="Ціна (₴)"
          type="number"
          min={0}
          value={v.price}
          onChange={set('price')}
          required
        />
        <Input
          label="Кімнат"
          type="number"
          min={0}
          max={50}
          value={v.rooms}
          onChange={set('rooms')}
          required
        />
        <Input
          label="Площа (м²)"
          type="number"
          min={1}
          value={v.area}
          onChange={set('area')}
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        <Select label="Місто" value={v.city} onChange={set('city')}>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Input label="Район" value={v.district} onChange={set('district')} />
        <Input label="Адреса" value={v.address} onChange={set('address')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        <Input label="Широта (lat)" value={v.lat} onChange={set('lat')} required hint="Plan C: можна буде вибрати на карті" />
        <Input label="Довгота (lng)" value={v.lng} onChange={set('lng')} required />
      </div>

      <div>
        <span
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Зручності
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {AMENITIES.map((a) => (
            <button
              type="button"
              key={a}
              onClick={() => toggleAmenity(a)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                border: v.amenities.includes(a)
                  ? '1px solid var(--accent-mint-strong)'
                  : '1px solid var(--border)',
                background: v.amenities.includes(a)
                  ? 'rgba(45,212,191,0.12)'
                  : 'var(--surface-2)',
                color: v.amenities.includes(a)
                  ? 'var(--accent-mint-strong)'
                  : 'var(--text-primary)',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {AMENITY_LABELS[a]}
            </button>
          ))}
        </div>
      </div>

      <Input label="Посилання на відео (необовʼязково)" value={v.videoUrl} onChange={set('videoUrl')} />

      {error ? (
        <div
          style={{
            padding: 12,
            background: 'rgba(225,29,72,0.08)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--danger)',
            fontSize: 14,
          }}
        >
          {error}
        </div>
      ) : null}

      <Button type="submit" loading={submitting}>
        {submitLabel}
      </Button>
    </form>
  );
}

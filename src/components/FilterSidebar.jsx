import RangeInput from './RangeInput.jsx';
import Select from './Select.jsx';
import Button from './Button.jsx';
import {
  CITIES,
  HOUSING_TYPES,
  HOUSING_TYPE_LABELS,
  RENT_TERMS,
  RENT_TERM_LABELS,
  AMENITIES,
  AMENITY_LABELS,
} from '../shared/constants.js';

const SECTION = {
  borderBottom: '1px solid var(--border)',
  padding: '18px 0',
};

const SECTION_TITLE = {
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: 2,
  fontWeight: 700,
  color: 'var(--text-muted)',
  marginBottom: 12,
};

export default function FilterSidebar({ filters, setFilter, setMany, reset }) {
  const setRange = (minKey, maxKey) => ({ min, max }) => {
    setMany({ [minKey]: min, [maxKey]: max });
  };

  const toggleAmenity = (a) => {
    const current = filters.amenities || [];
    const next = current.includes(a) ? current.filter((x) => x !== a) : [...current, a];
    setFilter('amenities', next);
  };

  return (
    <aside
      style={{
        position: 'sticky',
        top: 88,
        alignSelf: 'start',
        padding: 22,
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
        display: 'grid',
        gap: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 18 }}>Фільтри</h3>
        <button
          type="button"
          onClick={reset}
          style={{
            fontSize: 13,
            color: 'var(--accent-mint-strong)',
            fontWeight: 600,
            padding: 0,
          }}
        >
          Скинути
        </button>
      </div>

      <div style={SECTION}>
        <Select
          label="Місто"
          value={filters.city || ''}
          onChange={(e) => setFilter('city', e.target.value)}
        >
          <option value="">Усі міста</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <div style={SECTION}>
        <RangeInput
          label="Ціна, ₴"
          valueMin={filters.priceMin}
          valueMax={filters.priceMax}
          onChange={setRange('priceMin', 'priceMax')}
        />
      </div>

      <div style={SECTION}>
        <RangeInput
          label="Кімнат"
          valueMin={filters.roomsMin}
          valueMax={filters.roomsMax}
          onChange={setRange('roomsMin', 'roomsMax')}
        />
      </div>

      <div style={SECTION}>
        <RangeInput
          label="Площа, м²"
          valueMin={filters.areaMin}
          valueMax={filters.areaMax}
          onChange={setRange('areaMin', 'areaMax')}
        />
      </div>

      <div style={SECTION}>
        <div style={SECTION_TITLE}>Тип житла</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <Chip
            active={!filters.type}
            onClick={() => setFilter('type', '')}
            label="Будь-який"
          />
          {HOUSING_TYPES.map((t) => (
            <Chip
              key={t}
              active={filters.type === t}
              onClick={() => setFilter('type', t)}
              label={HOUSING_TYPE_LABELS[t]}
            />
          ))}
        </div>
      </div>

      <div style={SECTION}>
        <div style={SECTION_TITLE}>Термін</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <Chip
            active={!filters.rentTerm}
            onClick={() => setFilter('rentTerm', '')}
            label="Будь-який"
          />
          {RENT_TERMS.map((t) => (
            <Chip
              key={t}
              active={filters.rentTerm === t}
              onClick={() => setFilter('rentTerm', t)}
              label={RENT_TERM_LABELS[t]}
            />
          ))}
        </div>
      </div>

      <div style={{ ...SECTION, borderBottom: 'none', paddingBottom: 6 }}>
        <div style={SECTION_TITLE}>Зручності</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {AMENITIES.map((a) => (
            <Chip
              key={a}
              active={(filters.amenities || []).includes(a)}
              onClick={() => toggleAmenity(a)}
              label={AMENITY_LABELS[a]}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function Chip({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 12px',
        borderRadius: 'var(--radius-pill)',
        fontSize: 13,
        fontWeight: 600,
        border: active ? '1px solid var(--accent-mint-strong)' : '1px solid var(--border)',
        background: active ? 'rgba(45,212,191,0.14)' : 'var(--surface-2)',
        color: active ? 'var(--accent-mint-strong)' : 'var(--text-primary)',
      }}
    >
      {label}
    </button>
  );
}

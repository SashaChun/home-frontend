import { useEffect, useState } from 'react';

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="%232dd4bf"/><stop offset="1" stop-color="%2338bdf8"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23g)"/><text x="600" y="420" font-family="Manrope" font-size="72" fill="white" text-anchor="middle" font-weight="800">Domivka</text></svg>';

export default function Gallery({ photos = [] }) {
  const list = photos.length ? photos : [PLACEHOLDER];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (active >= list.length) setActive(0);
  }, [list.length, active]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % list.length);
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + list.length) % list.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, list.length]);

  return (
    <div>
      <div
        onClick={() => list[active] !== PLACEHOLDER && setLightbox(true)}
        style={{
          aspectRatio: '16 / 10',
          borderRadius: 'var(--radius-lg)',
          background: `url(${list[active]}) center/cover no-repeat`,
          cursor: list[active] === PLACEHOLDER ? 'default' : 'zoom-in',
          boxShadow: 'var(--shadow-card)',
        }}
      />
      {list.length > 1 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(list.length, 6)}, 1fr)`,
            gap: 8,
            marginTop: 10,
          }}
        >
          {list.slice(0, 6).map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              style={{
                aspectRatio: '4 / 3',
                borderRadius: 'var(--radius-sm)',
                background: `url(${src}) center/cover no-repeat`,
                border: i === active ? '2px solid var(--accent-mint-strong)' : '2px solid transparent',
                outline: 'none',
                padding: 0,
              }}
            />
          ))}
        </div>
      ) : null}

      {lightbox ? (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2,44,42,0.92)',
            zIndex: 1000,
            display: 'grid',
            placeItems: 'center',
            padding: 24,
          }}
        >
          <img
            src={list[active]}
            alt=""
            style={{ maxWidth: '92vw', maxHeight: '92vh', borderRadius: 'var(--radius-md)' }}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a - 1 + list.length) % list.length);
            }}
            style={navBtnStyle('left')}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a + 1) % list.length);
            }}
            style={navBtnStyle('right')}
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
}

function navBtnStyle(side) {
  return {
    position: 'fixed',
    [side]: 24,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.16)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.25)',
    fontSize: 30,
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
  };
}

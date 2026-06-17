import Select from './Select.jsx';

export default function SortSelect({ value, onChange }) {
  return (
    <Select
      value={value || 'newest'}
      onChange={(e) => onChange(e.target.value)}
      containerStyle={{ minWidth: 200 }}
    >
      <option value="newest">Спочатку нові</option>
      <option value="price_asc">Дешевші спочатку</option>
      <option value="price_desc">Дорожчі спочатку</option>
    </Select>
  );
}

const inputClass =
  'w-full rounded-xl border border-white/[0.08] bg-slate-950/60 px-3.5 py-2.5 text-slate-100 transition focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60';

export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  disabled,
  autoComplete,
  min,
  max,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        min={min}
        max={max}
        className={inputClass}
      />
    </div>
  );
}

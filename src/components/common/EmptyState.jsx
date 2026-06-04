export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="glass-panel flex flex-col items-center px-6 py-16 text-center">
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 text-2xl">
          {icon}
        </div>
      )}
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {description && <p className="mt-2 max-w-sm text-sm text-slate-400">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

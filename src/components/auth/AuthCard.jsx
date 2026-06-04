export default function AuthCard({ title, subtitle, children, wide = false }) {
  return (
    <div className="flex min-h-[calc(100dvh-10rem)] items-center justify-center px-4 py-10">
      <div
        className={`relative w-full overflow-hidden rounded-2xl p-[1px] shadow-2xl shadow-black/40 ${wide ? 'max-w-lg' : 'max-w-md'}`}
        style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.4), rgba(139,92,246,0.2), rgba(255,255,255,0.08))',
        }}
      >
        <div className="rounded-2xl bg-slate-950/95 p-8 backdrop-blur-xl sm:p-10">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{subtitle}</p>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

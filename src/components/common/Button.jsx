const variants = {
  primary:
    'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.98] disabled:opacity-60',
  secondary:
    'border border-white/10 bg-slate-800/80 text-slate-100 hover:bg-slate-700/80 active:scale-[0.98]',
  ghost: 'text-slate-400 hover:bg-slate-800/50 hover:text-white bg-transparent',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center font-semibold transition-all disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function AppFooter() {
  return (
    <footer className="mt-auto border-t border-white/[0.06] py-6 text-center">
      <p className="text-xs text-slate-600">
        Electro Pi · Demo storefront · Data from{' '}
        <a
          href="https://dummyjson.com"
          target="_blank"
          rel="noreferrer"
          className="text-slate-500 underline-offset-2 hover:text-amber-500/80 hover:underline"
        >
          DummyJSON
        </a>
      </p>
    </footer>
  );
}

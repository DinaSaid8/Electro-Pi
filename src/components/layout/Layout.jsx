import { Outlet } from 'react-router-dom';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

export default function Layout() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-amber-500/[0.07] blur-3xl" />
        <div className="absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-violet-600/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-amber-600/[0.04] blur-3xl" />
      </div>

      <AppHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:py-10">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}

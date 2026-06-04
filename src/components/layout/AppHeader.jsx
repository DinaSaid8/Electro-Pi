import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import Button from '../common/Button';

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 no-underline transition-colors ${
    isActive
      ? 'bg-amber-500/15 font-medium text-amber-300'
      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
  }`;

export default function AppHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useFavorites();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link
          to="/"
          className="mr-auto flex items-center gap-2.5 font-bold text-white no-underline transition-opacity hover:opacity-90"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20">
            PS
          </span>
          <span className="hidden text-lg sm:inline">Prodexa Store</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {isAuthenticated ? (
            <>
              <NavLink to="/" end className={navClass}>
                Shop
              </NavLink>
              <NavLink to="/saved" className={navClass}>
                Saved
                {count > 0 && (
                  <span className="ml-1.5 inline-flex min-w-[1.25rem] justify-center rounded-full bg-amber-500/20 px-1.5 text-xs font-semibold text-amber-300">
                    {count}
                  </span>
                )}
              </NavLink>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-1">
                Log out
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                Log in
              </NavLink>
              <Link to="/register" className="no-underline">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </nav>

        {isAuthenticated && user && (
          <div
            className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-slate-900/80 py-1 pl-1 pr-3 md:flex"
            title={user.email}
          >
            {user.image ? (
              <img src={user.image} alt="" className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-700" />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-700 text-xs font-bold">
                {(user.firstName?.[0] || user.username?.[0] || '?').toUpperCase()}
              </span>
            )}
            <span className="max-w-[120px] truncate text-sm text-slate-400">
              {user.firstName || user.username}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}

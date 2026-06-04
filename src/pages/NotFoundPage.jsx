import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <p className="bg-gradient-to-br from-slate-600 to-slate-800 bg-clip-text text-8xl font-black text-transparent">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1>
      <p className="mt-2 max-w-sm text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link to="/" className="mt-10 no-underline">
        <Button>Back to shop</Button>
      </Link>
    </div>
  );
}

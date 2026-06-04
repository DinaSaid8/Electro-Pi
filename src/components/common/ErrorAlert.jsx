import Button from './Button';

export default function ErrorAlert({ message, onRetry }) {
  if (!message) return null;

  return (
    <div
      className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-200"
      role="alert"
    >
      <p className="font-medium">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="mt-4">
          Try again
        </Button>
      )}
    </div>
  );
}

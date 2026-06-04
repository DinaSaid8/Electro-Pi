import { Component } from 'react';
import Button from './Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-md py-20 text-center">
          <h1 className="mb-2 text-xl font-bold text-white">Something went wrong</h1>
          <p className="mb-6 text-slate-400">
            An unexpected error occurred. Try refreshing the page.
          </p>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

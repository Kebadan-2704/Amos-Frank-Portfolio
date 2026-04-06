import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
          padding: '40px',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎵</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 700 }}>
              Something went wrong
            </h2>
            <p style={{ color: '#a0a0a0', marginBottom: '24px', maxWidth: '400px' }}>
              We hit an unexpected note. Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #e50914, #ff4444)',
                color: 'white',
                border: 'none',
                borderRadius: '28px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

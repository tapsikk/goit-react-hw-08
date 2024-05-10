import { Suspense } from 'react';
import { AppBar } from './AppBar/AppBar';
import Navigation from './Navigation/Navigation';

export const Layout = ({ children, isLoggedIn, onLogout }) => {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
      <AppBar>
        <Navigation isLoggedIn={isLoggedIn} onLogout={onLogout} />
      </AppBar>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
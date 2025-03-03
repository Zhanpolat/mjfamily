import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import './App.css'
import { LanguageProvider } from './components/Language';

function ErrorFallback({ error }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <LanguageProvider>
        <RouterProvider router={routes} />
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
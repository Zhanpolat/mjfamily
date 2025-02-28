import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import './App.css'

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
      <RouterProvider router={routes} />
    </ErrorBoundary>
  );
}

export default App;
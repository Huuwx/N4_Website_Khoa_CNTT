import { useEffect } from 'react';
import AppRoutes from './routes';

function App() {
  useEffect(() => {
    document.title = 'CSE University - Excellence in Education';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AppRoutes />
    </div>
  );
}

export default App;

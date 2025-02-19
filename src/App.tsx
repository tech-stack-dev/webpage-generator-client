import { Toaster } from 'react-hot-toast';
import { Link, Outlet } from 'react-router';

export const App = () => {
  return (
    <div>
      <nav
        style={{
          padding: '10px',
        }}
      >
        <Link to="publish">Publish</Link>
      </nav>
      <Outlet />
      <Toaster />
    </div>
  );
};

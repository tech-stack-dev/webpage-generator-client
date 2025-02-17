import { Toaster } from 'react-hot-toast';
import { Link, Outlet } from 'react-router';

export const App = () => {
  return (
    <div>
      <nav>
        <Link to="publish">Publish</Link>
      </nav>
      <Outlet />
      <Toaster />
    </div>
  );
};

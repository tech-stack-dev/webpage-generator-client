import { Toaster } from 'react-hot-toast';
import { Link, Outlet } from 'react-router';
import styles from './App.module.css';

export const App = () => {
  return (
    <div>
      <nav
        style={{
          padding: '10px',
        }}
      >
        <div className={styles.navbar_container}>
          <Link to="/">Home</Link>
          {'/'}
          <Link to="publish">Publish</Link>
        </div>
      </nav>
      <Outlet />
      <Toaster />
    </div>
  );
};

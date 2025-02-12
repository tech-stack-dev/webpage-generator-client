import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

export const App = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

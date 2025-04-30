import { createBrowserRouter, RouterProvider } from 'react-router';
import { App } from '../App';
import { ContentGeneratorPage } from '@pages/contentGenerator/ContentGeneratorPage';
import { PublishPage } from '@/pages/publish';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        // NOTE: means it renders into an <Outlet/> of <App />
        // cannot contain children & doesn't have a path
        index: true,
        Component: ContentGeneratorPage,
      },
      {
        path: 'publish',
        Component: PublishPage,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

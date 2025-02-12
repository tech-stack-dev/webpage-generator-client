import { Route } from 'react-router';
import { HashRouter, Routes } from 'react-router';
import { App } from '../App';
import { OldGenerator } from '@pages/oldGenerator/OldGenerator';
import { ContentGeneratorPage } from '@pages/contentGenerator/ContentGeneratorPage';

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ContentGeneratorPage />} />
        </Route>
        <Route path="old-generator" element={<OldGenerator />} />
      </Routes>
    </HashRouter>
  );
};

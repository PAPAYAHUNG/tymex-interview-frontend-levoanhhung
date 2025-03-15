import { ConfigProvider, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { Suspense, lazy } from 'react';
import MainLayout from './components/Layout/MainLayout';
import PageSkeleton from './components/Skeleton/PageSkeleton';
import './App.css';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Teams = lazy(() => import('./pages/Teams'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const Whitepaper = lazy(() => import('./pages/Whitepaper'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#ff1cf7',
            borderRadius: 8,
            colorBgContainer: '#1a1a1a',
            colorBgElevated: '#2a2a2a',
            colorText: 'rgba(255, 255, 255, 0.85)',
            colorTextSecondary: 'rgba(255, 255, 255, 0.45)',
          },
        }}
      >
        <Router>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <MainLayout>
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/whitepaper" element={<Whitepaper />} />
                </Routes>
              </Suspense>
            </MainLayout>
          </QueryParamProvider>
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;

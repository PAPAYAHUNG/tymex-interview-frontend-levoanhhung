import { ConfigProvider, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Teams from './pages/Teams';
import Marketplace from './pages/Marketplace';
import Roadmap from './pages/Roadmap';
import Whitepaper from './pages/Whitepaper';
import './App.css';

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
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/whitepaper" element={<Whitepaper />} />
            </Routes>
          </MainLayout>
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;

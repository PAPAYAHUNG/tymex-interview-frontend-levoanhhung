import { ConfigProvider, theme } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import './App.css';

function App() {
  return (
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
      <MainLayout>
        {/* Your main content components will go here */}
        <div style={{ textAlign: 'center' }}>
          <h1>Welcome to the Marketplace</h1>
        </div>
      </MainLayout>
    </ConfigProvider>
  );
}

export default App;

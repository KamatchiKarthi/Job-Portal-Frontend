import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from "antd";
import { AuthProvider } from './Context/Authcontext';
import { AppRoutes } from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/global.css';


function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 6,
        },
      }}
    >
      <AntdApp>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import PlayerLayout from './components/layout/PlayerLayout';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <PrivateRoute>
              <PlayerLayout />
            </PrivateRoute>
          }>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
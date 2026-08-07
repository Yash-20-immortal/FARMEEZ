import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Farm from './pages/Farm';
import Learn from './pages/Learn';
import Lesson from './pages/Lesson';
import Quiz from './pages/Quiz';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Achievements from './pages/Achievements';
import Login from './pages/Login';
import FarmSupply from './pages/Store';
import GlobalOnboarding from './components/GlobalOnboarding';
import { GameProvider } from './components/GameContext';
import { AgriMentorProvider } from './components/AgriMentorContext';

function App() {
  return (
    <GameProvider>
      <AgriMentorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="learn" element={<Learn />} />
              <Route path="learn/:courseId/:lessonId" element={<Lesson />} />
              <Route path="quiz/:courseId/:lessonId" element={<Quiz />} />
              <Route path="market" element={<Marketplace />} />
              <Route path="store" element={<FarmSupply />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="achievements" element={<Achievements />} />
            </Route>
            <Route path="/app/farm" element={<Farm />} />
          </Routes>
          <GlobalOnboarding />
        </BrowserRouter>
      </AgriMentorProvider>
    </GameProvider>
  )
}

export default App;

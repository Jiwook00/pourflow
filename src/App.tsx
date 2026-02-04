import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import PrepCountdown from './components/BrewTimer/PrepCountdown';
import BrewTimer from './components/BrewTimer/BrewTimer';
import Completion from './components/Completion/Completion';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/recipe/:id/prep" element={<PrepCountdown />} />
            <Route path="/recipe/:id/timer" element={<BrewTimer />} />
            <Route path="/recipe/:id/complete" element={<Completion />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

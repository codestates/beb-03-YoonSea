import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  // eth, klaytn (팀원과 협의) => eth rospten
  // server, db가 들어갈 부분? => 안쓴다
  // ipfs에서 이미지를 가져오는데 시간이 많이 걸린다?

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

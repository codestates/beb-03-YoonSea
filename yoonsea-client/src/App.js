import React, { useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Web3 from 'web3';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage';
import { Context } from './context/index';
import { SET_WEB3 } from './context/action';

function App() {
  // eth, klaytn (팀원과 협의) => eth rospten
  // server, db가 들어갈 부분? => 안쓴다
  // ipfs에서 이미지를 가져오는데 시간이 많이 걸린다?
  //  const [web3, setWeb3] = useState();
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web = new Web3(window.ethereum);
        dispatch({
          type: SET_WEB3,
          payload: web,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [dispatch]);

  console.log('app_web3', state.web3);
  console.log('app_account', state.account);
  return (
    <div className="app">
      <h1 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 mt-4">
        Hello world!
      </h1>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

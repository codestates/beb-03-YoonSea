import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from './context/index';
import { SET_WEB3 } from './context/action';
import Web3 from 'web3';
import { ethers } from 'ethers';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/MarketplacePage';
import Create from './components/create/Create';
import ExplorePage from './pages/ExplorePage';
import MyListedItems from './components/explore/MyListedItems';
import MyPurchases from './components/explore/MyPurchases';
import ProfilePage from './pages/ProfilePage';
import MarketplacePage from './pages/MarketplacePage';
import Navigation from './components/common/Navbar.js';
import MarketplaceAbi from './scripts/contractsData/Marketplace.json';
import MarketplaceAddress from './scripts/contractsData/Marketplace-address.json';
import NFTAbi from './scripts/contractsData/NFT.json';
import NFTAddress from './scripts/contractsData/NFT-address.json';

import './App.css';
import Loading from './components/common/Loading';

function App() {
  // eth, klaytn (팀원과 협의) => eth rospten
  // server, db가 들어갈 부분? => 안쓴다
  // ipfs에서 이미지를 가져오는데 시간이 많이 걸린다?

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  // const web3Handler = async () => {
  //   const accounts = await window.ethereum.request({
  //     method: 'eth_requestAccounts',
  //   });
  //   setAccount(accounts[0]);
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();

  //   window.ethereum.on('chainChanged', (chainId) => {
  //     window.location.reload();
  //   });

  //   window.ethereum.on('accountsChanged', async function (accounts) {
  //     setAccount(accounts[0]);
  //     await web3Handler();
  //   });
  //   loadContracts(signer);
  // };
  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };

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

  return (
    <div className="app">
      <Header />
      <div>
        {/* {loading ? (
          <Loading />
        ) : ( */}
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route
            path="/create"
            element={<Create marketplace={marketplace} nft={nft} />}
          />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/marketplace"
            element={<MarketplacePage marketplace={marketplace} nft={nft} />}
          />
          <Route
            path="/my-listed-items"
            element={
              <MyListedItems
                marketplace={marketplace}
                nft={nft}
                account={account}
              />
            }
          />
          <Route
            path="/my-purchases"
            element={
              <MyPurchases
                marketplace={marketplace}
                nft={nft}
                account={account}
              />
            }
          />
        </Routes>
        {/* )} */}
      </div>
      <Footer />
    </div>
  );
}

export default App;

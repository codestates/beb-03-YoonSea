import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/MarketplacePage';
import Create from './components/create/Create';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import MarketplacePage from './pages/MarketplacePage';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navbar.js';
import MarketplaceAbi from './scripts/contractsData/Marketplace.json';
import MarketplaceAddress from './scripts/contractsData/Marketplace-address.json';
import NFTAbi from './scripts/contractsData/NFT.json';
import NFTAddress from './scripts/contractsData/NFT-address.json';
import { useState } from 'react';
import { ethers } from 'ethers';

import './App.css';
// import Web3 from 'web3';

const style = {
  wrapper: `min-h-screen`,
};

function App() {
  // eth, klaytn (팀원과 협의) => eth rospten
  // server, db가 들어갈 부분? => 안쓴다
  // ipfs에서 이미지를 가져오는데 시간이 많이 걸린다?
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
    //  const [web3, setWeb3] = useState();
    const { dispatch } = useContext(Context);

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };
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

  return (
    <div className="app">
      <Header />
      <>
        <Navigation web3Handler={web3Handler} account={account} />
      </>
      <div>
        {loading ? (
          <div>
            <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/create"
              element={<Create marketplace={marketplace} nft={nft} />}
            />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* <Route
              path="/marketplace"
              element={<MarketplacePage marketplace={marketplace} nft={nft} />}
            /> */}
          </Routes>
        )}
      </div>
      <Footer />
      {/* <div className={style.wrapper}>
        <Header />
        <main className={style.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div> */}
    </div>
  );
}

export default App;

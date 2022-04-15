/*
Done
- connect to metamask wallet
- display all NFTs that current token owner has
- disconnect current wallet address
- connect link to etherscan page when click wallet address
- display newly NFTs when wallet address is altered
- copy button of wallet address

TBD
- profile setting: setting username and bio, email adress when matamask signature is done
- filtering by certain conditions
- devide collected NFTs / created NFTs
- take NFTs which build upon another contract
- send NFT for free (concept of present)
- implementation of sell/buy NFT
*/

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/index';
// import Web3 from 'web3';
// import erc721Abi from '../../contracts/erc721Abi';
import Erc721 from './Erc721';

// const contract = '0x65de69392011009cb52216A8C190aF60B3e856f0';
// basic account 0xa03f8230eae03394cd760ceb355b14ab14eb6c13
// other account 0xe904394333347C17c10894a626a16C91BDE36C6E

const profileBasicImg =
  'https://storage.googleapis.com/opensea-static/opensea-profile/21.png';

const Profile = () => {
  // const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('');
  const [isConnect, setIsConnect] = useState(false);
  const [erc721List, setErc721List] = useState([]);
  const [name, setName] = useState('');
  const { state } = useContext(Context);
  const web3 = state.web3;
  const newErc721addr = state.contractAddr;
  const abi = state.abi;

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (web3) {
      addNewErc721Token();
    }
  }, [web3]);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setIsConnect(true);
    setAccount(accounts[0]);
    setName('Unnamed');
  };

  const disconnectWallet = async () => {
    setIsConnect(false);
    setAccount('');
    setErc721List([]);
  };

  const addNewErc721Token = async () => {
    const tokenContract = await new web3.eth.Contract(abi, newErc721addr);
    console.log('tokenContract', tokenContract);
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();

    const arr = [];
    for (let i = 1; i <= totalSupply; i++) {
      arr.push(i);
    }

    setErc721List([]);
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    for (let tokenId of arr) {
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
      if (String(tokenOwner).toLowerCase() === accounts[0]) {
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        setErc721List((prevState) => {
          return [...prevState, { name, symbol, tokenId, tokenURI }];
        });
      }
    }
  };

  const copyWalletAccount = async () => {
    await navigator.clipboard.writeText(account);
    alert('Wallet address is coppied!');
  };

  return (
    <div className="mypage">
      <div className="profileDisplayed">
        {isConnect ? (
          <div className="m-10">
            <div className="mx-auto">
              <img
                className="mx-auto h-50 w-50 rounded-full"
                src={profileBasicImg}
                alt="basicProfileImg"
              />
            </div>
            <div className="flex justify-center mx-auto w-80">
              <img
                src="https://cdn.worldvectorlogo.com/logos/metamask.svg"
                alt="metamaskIcon"
                width="22"
                height="22"
              />
              <div className="m-5 uppercase tracking-wide text-3xl text-black font-semibold text-center">
                {name}{' '}
              </div>
              <button
                onClick={() => {
                  disconnectWallet();
                }}
              >
                <img
                  src="https://img.icons8.com/ios/344/exit.png"
                  alt="copyImg"
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <div className="uppercase tracking-wide text-l text-black font-semibold text-center">
              <a href={`https://ropsten.etherscan.io/address/${account}`}>
                {account}{' '}
              </a>

              <button
                className="copyBtn"
                onClick={() => {
                  copyWalletAccount();
                }}
              >
                <img
                  src="https://img.icons8.com/ios/344/copy.png"
                  alt="copyImg"
                  width="13"
                  height="13"
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="m-10 flex justify-center h-100">
            <button
              className="mx-aute"
              onClick={() => {
                connectWallet();
                addNewErc721Token();
              }}
            >
              Connect to MetaMask Wallet
            </button>
          </div>
        )}
      </div>
      {isConnect && (
        <div className="md:flex flex-wrap">
          {erc721List.map((token, index) => {
            return (
              <Erc721 key={index} token={token} web3={web3} account={account} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;

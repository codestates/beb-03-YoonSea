import React, { useContext, useEffect, useState } from 'react';
// import Web3 from 'web3';
import { Context } from '../../context/index';
import { ListBlock } from './styles/Explore.styles';
import Erc721 from './Erc721';

const Explore = () => {
  // user scenario
  // 모든 NFT, 판매중인 NFT를 버튼에 따라 렌더링 되게 해야한다
  // 발행된 모든 NFT를 확인할 수 있어야 한다 <- 현재 contract
  // 발행된 NFT중 판매중인 NFT를 확인할 수 있어야 한다 <- 현재 contract
  // 판매중인 NFT를 구매할 수 있어야 한다 <-

  // 어떤 주소를 검색? (팀원과 협의) => 지갑주소
  // 해당 주소에서 보유하고있는 모든 NFT?
  // 페이지에서 발행된 모든 NFT?

  // ifps

  // web3 객체 상태 관리
  // const [web3, setWeb3] = useState(null);
  // metamask 지갑 주소 관리
  const [account, setAccount] = useState(null);
  // erc721 토큰리스트 관리
  const [erc721List, setErc721List] = useState([]);

  const { state } = useContext(Context);
  const web3 = state.web3;
  const newErc721addr = state.contractAddr;
  const abi = state.abi;

  console.log('newErc721addr', newErc721addr);

  // erc721List 상태 세팅 (비동기)
  useEffect(async () => {
    if (state.web3) {
      // erc721List 초기화
      await resetErc721List();
      const tokenContract = await new web3.eth.Contract(abi, newErc721addr);

      const name = await tokenContract.methods.name().call();
      const symbol = await tokenContract.methods.symbol().call();
      const totalSupply = await tokenContract.methods.totalSupply().call();

      let arr = [];
      for (let i = 1; i <= totalSupply; i++) {
        arr.push(i);
      }

      for (let tokenId of arr) {
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        setErc721List((prevState) => {
          return [...prevState, { name, symbol, tokenId, tokenURI }];
        });
      }
    }
  }, [web3]);

  // ERC721List 상태를 초기화
  const resetErc721List = () => {
    setErc721List([]);
  };

  // 메타마스크 지갑 연결
  // const connectWallet = async () => {
  //   const accounts = await window.ethereum.request({
  //     method: 'eth_requestAccounts',
  //   });
  //   setAccount(accounts[0]);
  // };

  return (
    <div>
      {/* Explore Components
      <button
        onClick={() => {
          connectWallet();
        }}
      >
        connect to MetaMask
      </button> */}
      {/* Button All(자신의 것을 포함한), Sell(Approve 된 것들) */}
      <div className="md:flex flex-wrap justify-center">
        {erc721List.map((token) => {
          return (
            <Erc721
              key={token.tokenId}
              token={token}
              web3={web3}
              account={account}
              newErc721addr={newErc721addr}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Explore;

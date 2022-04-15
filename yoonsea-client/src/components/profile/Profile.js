/*
Done
- connect to metamask wallet
- disconnect current wallet address
- copy button of wallet address
TBD
- profile setting: setting username and bio, email adress when matamask signature is done
- filtering by certain conditions
- devide collected NFTs / created NFTs
*/

// user scenario
// metamask 데이터를 가져와야 한다.
// 해당하는 주소가 보유중인 NFT를 가져와야 한다
// 판매를 원하는 NFT는 판매 기능를 활성화 시킬 수 있어야 한다
// 판매를 위한 처리를 해줘야 한다 <-
// 판매를 원하는 가격을 입력할 수 있어야 한다
// 판매 가격을 위한 처리를 해줘야 한다 <-
// 선물을 원하는 NFT는 선물 기능을 활성화 시킬 수 있어야 한다
// 선물을 원하는 주소를 입력할 수 있어야 한다
// NFT를 입력한 주소로 보내야 한다

// 해당 컨트랙트에서 만든 NFT만 가져올 것인지 (팀원과 협의) // => 저희가 만든 NFT만
// 다른 컨트랙트에서 만든 NFT도 가져올 것인지 (까다로움) (팀원과 협의) // advanced
// web3

import React from 'react';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import erc721Abi from '../../contracts/erc721Abi';
import TokenList from './TokenList';
// import PersonalInfo from './personalize';
// import { ListBlock } from './styles/Explore.styles';

const contract = '0x65de69392011009cb52216A8C190aF60B3e856f0';
// basic account 0xa03f8230eae03394cd760ceb355b14ab14eb6c13
// other account 0xe904394333347C17c10894a626a16C91BDE36C6E

// const profileImg = 'https://storage.googleapis.com/opensea-static/opensea-profile/21.png';

const Profile = () => {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('');
  const [isConnect, setIsConnect] = useState(false);
  // const [newErc721Addr, setNewErc721Addr] = useState('');
  const [erc721List, setErc721List] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    if (typeof window.ethereum != 'undefined') {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (e) {
        console.log(e);
      }
    }
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
    const tokenContract = await new web3.eth.Contract(erc721Abi, contract);
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
      ProfilePage
      {isConnect ? (
        <div className="disconnect">
          <div className="userName">유저명: {name}</div>
          <span className="userInfo">주소: {account}</span>{' '}
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
          </button>{' '}
          <button
            className="metaWalletDisconnect"
            onClick={() => {
              disconnectWallet();
            }}
          >
            <img
              src="https://img.icons8.com/ios/344/exit.png"
              alt="copyImg"
              width="30"
              height="30"
            />
          </button>
          {/* <button className="personalizedProfile">
            <PersonalInfo />
          </button> */}
          <TokenList
            web3={web3}
            account={account}
            erc721List={erc721List}
            addNewErc721Token={addNewErc721Token}
            newErc721Addr={contract}
          />
        </div>
      ) : (
        <div className="connect">
          <button
            className="metaWalletConnect"
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
  );
};

export default Profile;

// import React from 'react';
// import { useEffect, useState } from 'react';
// import Web3 from 'web3';
// import erc721abi from '../../contract/erc721Abi';
// import TokenList from './TokenList';
// // import { ListBlock } from './styles/Explore.styles';

// // contract 0x65de69392011009cb52216A8C190aF60B3e856f0
// // basic account 0xa03f8230eae03394cd760ceb355b14ab14eb6c13
// // other account 0xe904394333347C17c10894a626a16C91BDE36C6E

// // const profileImg = 'https://storage.googleapis.com/opensea-static/opensea-profile/21.png';

// const Profile = () => {
//   const [web3, setWeb3] = useState();
//   const [account, setAccount] = useState('');
//   const [isConnect, setIsConnect] = useState(false);
//   const [newErc721Addr, setNewErc721Addr] = useState('');
//   const [erc721List, setErc721List] = useState([]);
//   const [name, setName] = useState('');

//   useEffect(() => {
//     if (typeof window.ethereum != 'undefined') {
//       try {
//         const web = new Web3(window.ethereum);
//         setWeb3(web);
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   }, []);

//   const connectWallet = async () => {
//     const accounts = await window.ethereum.request({
//       method: 'eth_requestAccounts',
//     });
//     setIsConnect(true);
//     setAccount(accounts[0]);
//     setName('Unnamed');
//   };

//   const disconnectWallet = async () => {
//     setIsConnect(false);
//     setAccount('');
//   };

//   const addNewErc721Token = async () => {
//     const tokenContract = await new web3.eth.Contract(erc721abi, newErc721Addr);
//     const name = await tokenContract.methods.name().call();
//     const symbol = await tokenContract.methods.symbol().call();
//     const totalSupply = await tokenContract.methods.totalSupply().call();

//     const arr = [];
//     for (let i = 1; i <= totalSupply; i++) {
//       arr.push(i);
//     }

//     setErc721List([]);

//     for (let tokenId of arr) {
//       let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
//       // console.log(tokenOwner);
//       if (String(tokenOwner).toLowerCase() === account) {
//         let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
//         setErc721List((prevState) => {
//           return [...prevState, { name, symbol, tokenId, tokenURI }];
//         });
//       }
//     }
//   };

//   const copyWalletAccount = async () => {
//     await navigator.clipboard.writeText(account);
//     alert('wallet address is coppied');
//   };

//   return (
//     <div className="mypage">
//       ProfilePage
//       {isConnect ? (
//         <div className="disconnect">
//           <button
//             className="metaWalletDisconnect"
//             onClick={() => {
//               disconnectWallet();
//             }}
//           >
//             Disconnect
//           </button>
//           <div className="userName">유저명: {name}</div>
//           <div className="userInfo">주소: {account}</div>
//           <button
//             className="copyBtn"
//             onClick={() => {
//               copyWalletAccount();
//             }}
//           >
//             copy
//           </button>
//           <div className="newErc721">
//             <input
//               type="text"
//               onChange={(e) => {
//                 setNewErc721Addr(e.target.value);
//               }}
//             />
//             <button
//               onClick={() => {
//                 newErc721Addr
//                   ? newErc721Addr.slice(0, 2) === '0x'
//                     ? addNewErc721Token()
//                     : alert('insert propriate contract')
//                   : alert('contract is empty');
//               }}
//             >
//               Add new erc721
//             </button>
//           </div>
//           <TokenList
//             web3={web3}
//             account={account}
//             erc721List={erc721List}
//             newErc721Addr={newErc721Addr}
//           />
//         </div>
//       ) : (
//         <div className="connect">
//           <button
//             className="metaWalletConnect"
//             onClick={() => {
//               connectWallet();
//             }}
//           >
//             Connect to MetaMask Wallet
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

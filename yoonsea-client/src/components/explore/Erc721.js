import React, { useEffect, useState } from 'react';

import erc721Abi from '../../contract/erc721Abi';

const Erc721 = ({ token, web3, account, newErc721addr }) => {
  const [tokenOwner, setTokenOwner] = useState('');

  useEffect(async () => {
    const tokenContract = await new web3.eth.Contract(erc721Abi, newErc721addr);

    let tokenOwner = await tokenContract.methods.ownerOf(token.tokenId).call();
    let sliceTokenOwner = await setTokenAddress(tokenOwner);
    await setTokenOwner(sliceTokenOwner);
  }, []);

  const setTokenAddress = (tokenOwner) => {
    if (tokenOwner !== '') {
      let slice = tokenOwner.slice(0, 10) + '...';
      return slice;
    }
  };

  return (
    <div className="m-4 w-80 bg-white rounded-xl shadow-md">
      {/* image */}
      <img
        className="h-60 object-cover rounded-t-xl"
        src={token.tokenURI}
        alt={token.tokenURI}
      />
      <div className="p-6 text-center">
        {/* <img
          src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
          alt="eth"
          className="h-5 mr-2"
        /> */}
        {/* token name */}
        <div className="uppercase tracking-wide text-L text-black font-semibold">
          {token.name}
        </div>
        {/* token owner */}
        <div className="block mt-1 text-m leading-tight text-indigo-500 font-semibold">
          {tokenOwner}
        </div>
        {/* token content */}
        <span className="mt-2 text-xs text-gray-500">
          Welcome to the Yoon Sea page.
        </span>
      </div>
    </div>
  );
};

export default Erc721;

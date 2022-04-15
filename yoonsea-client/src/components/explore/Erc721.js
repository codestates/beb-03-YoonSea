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
    <div className="m-4">
      <div className="w-80 bg-white rounded-xl shadow-md">
        {/* image */}
        <img
          className="h-60 object-cover rounded-xl"
          src={token.tokenURI}
          alt={token.tokenURI}
        />
        <div className="p-8">
          {/* token name */}
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {token.name}
          </div>
          {/* token owner */}
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            {tokenOwner}
          </div>
          {/* token content */}
          <span className="mt-2 text-gray-500">
            Welcome to the Yoon Sea page.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Erc721;

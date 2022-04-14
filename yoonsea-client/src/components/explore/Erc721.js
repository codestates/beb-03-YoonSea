import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import {
  Block,
  ImageBlock,
  ContentBlock,
  LogoBlock,
} from './styles/Erc721.styles';

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
    <Block>
      <ImageBlock>
        <img src={token.tokenURI} alt={token.tokenURI} width={300} />
      </ImageBlock>
      <ContentBlock>
        <LogoBlock>
          <Avatar
            color={Avatar.getRandomColor(tokenOwner, ['red', 'green', 'blue'])}
            size="50"
            round="50px"
            name={token.name}
          />
        </LogoBlock>
        <div>
          <strong>{token.name}</strong>
        </div>
        <div>{tokenOwner}</div>
        <span>Welcome to the Yoon Sea page. </span>
      </ContentBlock>
    </Block>
  );
};

export default Erc721;

import Erc721 from './Erc721';
import erc721abi from '../../contract/erc721Abi';
import { useState } from 'react';
import { create } from 'ipfs-http-client';
import { ListBlock } from './styles/Profile.styles';
import { Block, ImageBlock, ContentBlock } from './styles/Erc721.styles';

const client = create('https://ipfs.infura.io:5001/api/v0');

const TokenList = ({
  erc721List,
  web3,
  account,
  newErc721Addr,
  addNewErc721Token,
}) => {
  const [fileURL, setFileURL] = useState('');

  const createURL = async function (e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const URL = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileURL(URL);
    } catch (err) {
      console.log(err);
    }
  };

  const mintOwnFile = async function () {
    let tokenContract = await new web3.eth.Contract(erc721abi, newErc721Addr);
    const minting = await tokenContract.methods.mintNFT(account, fileURL).send({
      from: account,
    });
    console.log(minting);
    addNewErc721Token();
    setFileURL('');
  };

  return (
    <div className="tokenList">
      <Block>
        Minting new NFT file
        <input type="file" onChange={createURL} />
        {fileURL && (
          <div className="mintNewNFT">
            <ImageBlock>
              <img src={fileURL} alt="uploadedImg" width="300px" />
            </ImageBlock>
            <ContentBlock>
              <button
                onClick={() => {
                  mintOwnFile();
                }}
              >
                Mint this file
              </button>
            </ContentBlock>
          </div>
        )}
      </Block>
      <div className="userNFTList">
        <ListBlock>
          {erc721List.map((token) => {
            return (
              <Erc721
                token={token}
                web3={web3}
                account={account}
                newErc721Addr={newErc721Addr}
              />
            );
          })}
        </ListBlock>
      </div>
    </div>
  );
};

export default TokenList;

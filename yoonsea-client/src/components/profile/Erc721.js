import erc721Abi from '../../contract/erc721Abi';
import { useState } from 'react';
import Avatar from 'react-avatar';
import {
  Block,
  ImageBlock,
  ContentBlock,
  LogoBlock,
} from './styles/Erc721.styles';

const Erc721 = ({ account, web3, token, newErc721Addr }) => {
  const [to, setTo] = useState('');
  const [sendBtnFlag, setSendBtnFlag] = useState(true);

  const sendToken = async (tokenAddr, tokenId) => {
    const tokenContract = await new web3.eth.Contract(erc721Abi, tokenAddr, {
      from: account,
    });
    tokenContract.methods
      .transferFrom(account, to, tokenId)
      .send({
        from: account,
      })
      .on('receipt', (receipt) => {
        setTo('');
      });
  };

  const checkValidity = (s) => {
    if (!s) {
      alert('Empty address!');
      return false;
    } else {
      const maniStr = s.trim();
      if (maniStr.length !== 42 || maniStr.slice(0, 2) !== '0x') {
        alert('Invalid address!');
        return false;
      }
    }
    return true;
  };

  return (
    <div className="erc721token">
      <Block>
        <ImageBlock>
          <img src={token.tokenURI} alt={token.tokenURI} width={300} />
        </ImageBlock>
        <ContentBlock>
          <LogoBlock>
            <Avatar
              color={Avatar.getRandomColor(['red', 'green', 'blue'])}
              size="50"
              round="50px"
              name={token.name}
            />
          </LogoBlock>
          <div>
            <strong>{token.name}</strong>
          </div>
          {sendBtnFlag ? (
            <div className="tokenTransferPending">
              <button
                className="sendErc20Btn"
                onClick={() => setSendBtnFlag(false)}
              >
                Send this token
              </button>
            </div>
          ) : (
            <div className="tokenTransferActive">
              to:{' '}
              <input
                type="text"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              />
              <button
                className="sendErc20Btn"
                onClick={() => {
                  if (checkValidity(to)) {
                    sendToken.bind(this, newErc721Addr, token.tokenId);
                  }
                }}
              >
                Send
              </button>{' '}
              <button
                className="cancelSend"
                onClick={() => {
                  setSendBtnFlag(true);
                  setTo('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </ContentBlock>
      </Block>
    </div>
  );
};

export default Erc721;

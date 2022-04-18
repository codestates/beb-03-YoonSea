import { useState } from 'react';
import erc721Abi from '../../contracts/erc721Abi';

const Erc721 = ({ web3, token, account, contAddr, addNewErc721Token }) => {
  const [to, setTo] = useState('');
  const [sendBtnFlag, setSendBtnFlag] = useState(true);

  const sendToken = async (tokenAddr, tokenId) => {
    if (checkValidity(to)) {
      const tokenContract = await new web3.eth.Contract(erc721Abi, tokenAddr, {
        from: account,
      });

      const trf = await tokenContract.methods
        .transferFrom(account, to, tokenId)
        .send({ from: account })
        .on('receipt', (receipt) => {
          setTo('');
        });
      console.log(trf);
      addNewErc721Token();
    }
  };

  const checkValidity = (s) => {
    if (!s) {
      alert('Empty Adress!');
      return false;
    } else {
      const maniStr = s.trim();
      if (maniStr.length !== 42 || maniStr.slice(0, 2) !== '0x') {
        alert('Invalid Address!');
        return false;
      }
    }
    return true;
  };

  return (
    <div className="m-4 w-80 bg-white rounded-xl shadow-md">
      {/* image */}
      <img
        className="h-60 w-80 object-cover rounded-t-xl"
        src={token.tokenURI}
        alt={token.tokenURI}
      />
      <div className="p-6 text-center">
        {/* token name */}
        <div className="uppercase tracking-wide text-L text-black font-semibold">
          {token.name}
        </div>
        {/* token content */}
        <span className="mt-2 text-xs text-gray-500">
          Welcome to the Yoon Sea page.
        </span>
        {/* send token */}
        {sendBtnFlag ? (
          <div>
            <button
              onClick={() => {
                setSendBtnFlag(false);
              }}
            >
              Send this token
            </button>
          </div>
        ) : (
          <div>
            To:{' '}
            <input
              type="text"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
            ></input>
            <div>
              <button onClick={sendToken.bind(this, contAddr, token.tokenId)}>
                Send
              </button>{' '}
              <button
                onClick={() => {
                  setSendBtnFlag(true);
                  setTo('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Erc721;

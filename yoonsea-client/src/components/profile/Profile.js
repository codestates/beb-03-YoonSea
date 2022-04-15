import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
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

  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/my-listed-items')}>
        MyListedItems
      </button>
      <br />
      <button onClick={() => navigate('/my-purchases')}>MyPurchases</button>
    </div>
  );
};

export default Profile;

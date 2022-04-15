import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/index';
import { SET_ACCOUNT } from '../../context/action';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

const style = {
  wrapper: `bg-white w-screen px-5 py-3.5 flex shadow-md`,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-[#03111d] font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-white border border-gray rounded-[0.8rem]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-[#03111d] px-4 font-bold text-headerItems-rgba hover:text-headerItems-hover-rgba cursor-pointer`,
  headerIcon: `text-headerItems-rgba text-3xl font-black px-4 hover:text-headerItems-hover-rgba cursor-pointer`,
};

// const style = {
//   wrapper: `bg-white w-screen px-5 py-3.5 flex `,
//   logoContainer: `flex items-center cursor-pointer`,
//   logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
//   // searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
//   // searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
//   // searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
//   headerItems: ` flex items-center justify-end`,
//   headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
//   headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
// };

const Header = () => {
  // user scenario
  // 버튼에 따라 해당하는 페이지로 이동하게 한다
  // 왼쪽에는 메인 로고가 보여줘야 한다
  // 오른쪽에는 create, explore, wallet 순으로 보여줘야 한다
  // metamask 데이터가 없을시에 wallet 보여줘야 한다
  // metamask 데이터가 있을시에 profile 보여줘야 한다
  // create 클릭 시 create page로 이동해야한다
  // explore 클릭 시 explore page로 이동해야한다
  // wallet을 클릭 시 metamask 연결하는 로직을 실행한다
  // profile 클릭 시  profile page로 이동해야한다

  // react-router v5 v6 - spa의 페이지 이동
  // web3 - metamask 데이터 관리

  const { state, dispatch } = useContext(Context);
  const connectWallet = async () => {
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    dispatch({
      type: SET_ACCOUNT,
      payload: accounts[0],
    });
    console.log('account', state.account);
  };
  return (
    <div className={style.wrapper} height={72}>
      {/* <Link href="/"> */}
      <div className={style.logoContainer}>
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + '/assets/opensea.png'}
            height={40}
            width={40}
          />
        </Link>
        <div className={style.logoText}>OpenSea</div>
      </div>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search items, collections, and accounts"
        ></input>
      </div>
      <div className={style.headerItems}>
        <Link to="/explore">
          <div className={style.headerItem}>Explore</div>
        </Link>
        <div className={style.headerItem}>Stats</div>
        <div className={style.headerItem}>Resources</div>
        <Link to="/create">
          <div className={style.headerItem}>Create</div>
        </Link>
        <Link to="/profile">
          <div className={style.headerIcon}>
            <CgProfile />
          </div>
        </Link>
        <Link to="/marketplace">
          <div className={style.headerIcon}>
            <MdOutlineAccountBalanceWallet />
          </div>
        </Link>
      </div>
    </div>
    // <header className={style.wrapper}>
    //   <h1>
    //     <Link to="/">
    //       <span>
    //         <img src="" alt="" />
    //       </span>
    //     </Link>
    //   </h1>
    //   <div>
    //     <Link to="/create">Create</Link>
    //     <Link to="/explore">Explore</Link>
    //     <Link to="/profile">Profile</Link>
    //     <button type="button" onClick={connectWallet}>
    //       Wallet
    //     </button>
    //   </div>
    // </header>
  );
};
export default Header;

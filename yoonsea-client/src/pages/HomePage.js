import { Link } from 'react-router-dom';

const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/KhHIVlusXfzP1Ns65IsT6hpngYMLJzHQWj1BbvPHsxToWLWsmzrgQXB95flYTuve8xynAQW2X69YKsUKXEns30YOfGu9DcbR-XL_nH0=s550')] before:bg-cover before:bg-center before:opacity-30 before:blur `,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  copyContainer: `w-1/2`,
  title: `relative text-[#03111d] text-[46px] font-semibold`,
  description: `text-[#343840] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white border border-[#2081e2] hover:shadow-xl hover:bg-[#1868b7] cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-white rounded-lg mr-5 text-[#2081e2] border border-[#2081e2] hover:shadow-xl cursor-pointer`,
  cardContainer: `rounded-[3rem] drop-shadow-[0_0_10px_rgba(4,17,29,0.25)] hover:drop-shadow-[0_0_50px_rgba(4,17,29,0.25)]`,
  infoContainer: `h-20 bg-white p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4 text-[#2081e2] hover:text-[#1868b7]`,
  name: `text-[#03111d]`,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
};

const HomePage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              Discover, collect, and sell extraordinary NFTs
            </div>
            <div className={style.description}>
              OpenSea is the world&apos;s first and largest NFT marketplace
            </div>
            <div className={style.ctaContainer}>
              <Link to="/explore">
                <button className={style.accentedButton}>Explore</button>
              </Link>
              <Link to="/create">
                <button className={style.button}>Create</button>
              </Link>
            </div>
          </div>
          <a
            className={style.cardContainer}
            href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/112478610229532752909831585034179242991996040106881929501328399430956454248449"
          >
            <img
              className="rounded-t-lg"
              src="https://lh3.googleusercontent.com/KhHIVlusXfzP1Ns65IsT6hpngYMLJzHQWj1BbvPHsxToWLWsmzrgQXB95flYTuve8xynAQW2X69YKsUKXEns30YOfGu9DcbR-XL_nH0=s550"
              alt=""
            />
            <div className={style.infoContainer}>
              <img
                className="h-[2.25rem] rounded-full"
                src="https://lh3.googleusercontent.com/Nla_IZN056KsTPQSpIDHCZHz66iona1jV0YWfEpDL4YGrZI3tBBdYxkJV_xkMZvqp6HWDl5Jwb9UpG-HoUZlYSCXpJj7DuA7bIWIf6g=s80"
                alt=""
              />
              <div className={style.author}>
                <div className={style.name}>💎Miss Thing #014</div>
                <p className="text-[#1868b7]">resibhaskoro</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

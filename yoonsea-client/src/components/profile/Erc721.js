const Erc721 = ({ token }) => {
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
      </div>
    </div>
  );
};

export default Erc721;

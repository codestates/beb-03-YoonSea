import React from 'react';

import PageTemplate from '../template/PageTemplate';
import loadingGif from '../../assets/Loading.gif';

const Loading = () => {
  return (
    <PageTemplate>
      <div className="py-80 flex justify-center content-center">
        <img src={loadingGif} alt="Awaiting Metamask Connection..." />
      </div>
    </PageTemplate>
  );
};

export default Loading;

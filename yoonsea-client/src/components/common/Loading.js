import React from 'react';

import PageTemplate from '../template/PageTemplate';

const Loading = () => {
  return (
    <PageTemplate>
      <div className="py-80 flex justify-center content-center">
        <img
          src={process.env.PUBLIC_URL + '/assets/Loading.gif'}
          alt={'Awaiting Metamask Connection...'}
        />
      </div>
    </PageTemplate>
  );
};

export default Loading;

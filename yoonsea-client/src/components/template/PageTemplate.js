import React from 'react';

const PageTemplate = ({ children }) => {
  // Page에 사용되는 템플릿이 관리되어야 한다
  return <main>{children}</main>;
};

export default PageTemplate;

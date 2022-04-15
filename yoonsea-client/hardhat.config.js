require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: process.env.DEPLOY_KEY_ROPSTEN,
      accounts: [process.env.DEPLOY_ACC_ROPSTEN],
    },
  },
  solidity: '0.8.4',
  paths: {
    artifacts: './src/scripts/artifacts',
    sources: './src/scripts/contracts',
    cache: './src/scripts/cache',
    tests: './src/scripts/test',
  },
};

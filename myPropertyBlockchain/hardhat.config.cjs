const { task } = require("hardhat/config");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.27" },
      { version: "0.7.0" },
      { version: "0.6.12" },
    ],
  },
};
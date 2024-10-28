require("@nomicfoundation/hardhat-toolbox");


const fs = require("fs");
const mnemonic = fs.readFileSync(".secret", "utf-8").trim();
const infuraId = fs.readFileSync(".infura", "utf-8").trim();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks:{
    sepolia:{
      url:`https://sepolia.infura.io/v3/${infuraId}`,
      accounts:{
        mnemonic,
        path:"m/44'/60'/0'/0",
        initialIndex:0,
        count:10,
      },
    },
  },
  etherscan: {
    apiKey: fs.readFileSync(".etherscan").toString().trim(),
  },
  solidity: "0.8.27",
};

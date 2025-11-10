import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
  networks: {
    besu: {
      url: "http://rpc-http.blockchain.local",
      accounts: ["0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"],
      chainId: 1337,
      gasPrice: 0,
      gas: -1,
    },
  },
  // Cấu hình verify cho Blockscout
  etherscan: {
    apiKey: {
      // Blockscout không yêu cầu API key, nhưng cần cấu hình customChains
      besu: "no-api-key-needed",
    },
    customChains: [
      {
        network: "besu",
        chainId: 1337,
        urls: {
          apiURL: "http://explorer.blockchain.local/api", // URL API của Exploer
          browserURL: "http://explorer.blockchain.local", // URL giao diện Blockscout
        },
      },
    ],
  },
  sourcify: {
    enabled: false, // Tắt Sourcify nếu chỉ dùng Blockscout
  },
};

export default config;

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```


npx hardhat verify --network besu \
  0xa50a51c09a5c451C52BB714527E1974b686D8e77 \
  "My Token" \
  "MTK" \
  18 \
  1000000
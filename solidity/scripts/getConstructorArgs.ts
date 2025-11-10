// Script để lấy Constructor Arguments ABI-encoded
// Sử dụng: npx hardhat run scripts/getConstructorArgs.ts

import { ethers } from "hardhat";

async function main() {
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();
  
  // Thay đổi các giá trị này theo constructor arguments khi deploy
  const name = "My Token";
  const symbol = "MTK";
  const decimals = 18;
  const initialSupply = 1000000;
  
  const encoded = abiCoder.encode(
    ["string", "string", "uint8", "uint256"],
    [name, symbol, decimals, initialSupply]
  );
  
  console.log("\n=== Constructor Arguments (ABI-encoded) ===");
  console.log(encoded);
  console.log("\n=== Thông tin chi tiết ===");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Initial Supply:", initialSupply);
  console.log("\nCopy giá trị ABI-encoded ở trên để dùng khi verify trên Blockscout UI");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


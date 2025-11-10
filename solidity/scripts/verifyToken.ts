// Script để verify MyToken contract trên Blockscout
// Sử dụng: npx hardhat run scripts/verifyToken.ts --network besu

import hre from "hardhat";

async function main() {
  // Địa chỉ contract đã deploy
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x..."; // Thay bằng địa chỉ thực tế
  
  // Constructor arguments - phải khớp với tham số khi deploy
  // Thứ tự: name, symbol, decimals, initialSupply
  const constructorArgs = [
    "My Token",      // name
    "MTK",           // symbol
    18,              // decimals
    1000000,         // initialSupply
  ];

  console.log("Đang verify contract tại địa chỉ:", CONTRACT_ADDRESS);
  console.log("Constructor arguments:", constructorArgs);

  try {
    await hre.run("verify:verify", {
      address: CONTRACT_ADDRESS,
      constructorArguments: constructorArgs,
    });
    console.log("\n✅ Verify thành công! Contract đã được verify trên Blockscout.");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("\n✅ Contract đã được verify trước đó.");
    } else {
      console.error("\n❌ Lỗi khi verify:", error.message);
      throw error;
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


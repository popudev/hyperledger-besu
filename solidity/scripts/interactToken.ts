// Script để tương tác với token sau khi deploy
// Sử dụng: npx hardhat run scripts/interactToken.ts --network besu

import hre from "hardhat";

async function main() {
  // Thay đổi địa chỉ này bằng địa chỉ token đã deploy
  const TOKEN_ADDRESS = "0x..."; // Điền địa chỉ token sau khi deploy
  
  // Lấy signer
  const [owner, recipient] = await hre.ethers.getSigners();
  
  console.log("Owner address:", owner.address);
  console.log("Recipient address:", recipient.address);
  
  // Kết nối với contract
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = MyToken.attach(TOKEN_ADDRESS);
  
  // 1. Kiểm tra thông tin token
  console.log("\n=== Thông tin Token ===");
  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const totalSupply = await token.totalSupply();
  const ownerBalance = await token.balanceOf(owner.address);
  
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Total Supply:", hre.ethers.formatUnits(totalSupply, decimals));
  console.log("Owner Balance:", hre.ethers.formatUnits(ownerBalance, decimals));
  
  // 2. Transfer token
  console.log("\n=== Transfer Token ===");
  const transferAmount = hre.ethers.parseUnits("100", decimals); // Transfer 100 token
  const tx1 = await token.transfer(recipient.address, transferAmount);
  console.log("Transfer transaction hash:", tx1.hash);
  await tx1.wait();
  console.log("Transfer completed!");
  
  const recipientBalance = await token.balanceOf(recipient.address);
  console.log("Recipient balance:", hre.ethers.formatUnits(recipientBalance, decimals));
  
  // 3. Approve và TransferFrom
  console.log("\n=== Approve và TransferFrom ===");
  const approveAmount = hre.ethers.parseUnits("50", decimals);
  const tx2 = await token.approve(recipient.address, approveAmount);
  console.log("Approve transaction hash:", tx2.hash);
  await tx2.wait();
  console.log("Approve completed!");
  
  // Recipient thực hiện transferFrom
  const tokenAsRecipient = token.connect(recipient);
  const transferFromAmount = hre.ethers.parseUnits("30", decimals);
  const tx3 = await tokenAsRecipient.transferFrom(owner.address, recipient.address, transferFromAmount);
  console.log("TransferFrom transaction hash:", tx3.hash);
  await tx3.wait();
  console.log("TransferFrom completed!");
  
  // 4. Mint thêm token (chỉ owner)
  console.log("\n=== Mint Token ===");
  const mintAmount = hre.ethers.parseUnits("1000", decimals);
  const tx4 = await token.mint(mintAmount);
  console.log("Mint transaction hash:", tx4.hash);
  await tx4.wait();
  console.log("Mint completed!");
  
  const newTotalSupply = await token.totalSupply();
  console.log("New Total Supply:", hre.ethers.formatUnits(newTotalSupply, decimals));
  
  // 5. Burn token
  console.log("\n=== Burn Token ===");
  const burnAmount = hre.ethers.parseUnits("100", decimals);
  const tx5 = await token.burn(burnAmount);
  console.log("Burn transaction hash:", tx5.hash);
  await tx5.wait();
  console.log("Burn completed!");
  
  const finalTotalSupply = await token.totalSupply();
  console.log("Final Total Supply:", hre.ethers.formatUnits(finalTotalSupply, decimals));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


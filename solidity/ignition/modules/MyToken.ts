// Module deployment cho MyToken ERC-20
// Blockscout sẽ tự động nhận diện contract này là token

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MyTokenModule = buildModule("MyTokenModule", (m) => {
  // Tham số có thể tùy chỉnh khi deploy
  const tokenName = m.getParameter("name", "My Token");
  const tokenSymbol = m.getParameter("symbol", "MTK");
  const tokenDecimals = m.getParameter("decimals", 18);
  const initialSupply = m.getParameter("initialSupply", 1000000); // 1 triệu token

  const myToken = m.contract("MyToken", [
    tokenName,
    tokenSymbol,
    tokenDecimals,
    initialSupply,
  ]);

  return { myToken };
});

export default MyTokenModule;


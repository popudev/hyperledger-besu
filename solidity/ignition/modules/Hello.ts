// Module deployment cho Hello contract
// Contract đơn giản để lấy ra chuỗi "Hello"

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HelloModule = buildModule("HelloModule", (m) => {
  // Contract Hello không cần tham số constructor
  const hello = m.contract("Hello");

  return { hello };
});

export default HelloModule;


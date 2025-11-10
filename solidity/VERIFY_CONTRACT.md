# Hướng dẫn Verify Contract trên Blockscout

Có 2 cách chính để verify contract trên Blockscout:
1. **Sử dụng Hardhat CLI** (Khuyến nghị - Tự động)
2. **Sử dụng Blockscout UI** (Thủ công)

---

## Cách 1: Verify bằng Hardhat CLI (Khuyến nghị)

### Bước 1: Cập nhật địa chỉ contract

Sau khi deploy, bạn sẽ nhận được địa chỉ contract. Cập nhật vào script:

**Cách 1: Sử dụng biến môi trường**
```bash
export CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
npx hardhat run scripts/verifyToken.ts --network besu
```

**Cách 2: Sửa trực tiếp trong script**
Mở file `scripts/verifyToken.ts` và thay đổi:
```typescript
const CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890";
```

### Bước 2: Cập nhật Constructor Arguments

Đảm bảo constructor arguments trong script khớp với tham số khi deploy:

```typescript
const constructorArgs = [
  "My Token",      // name - phải khớp với tham số deploy
  "MTK",           // symbol - phải khớp với tham số deploy
  18,              // decimals - phải khớp với tham số deploy
  1000000,         // initialSupply - phải khớp với tham số deploy
];
```

### Bước 3: Cập nhật Blockscout URL (nếu cần)

Nếu Blockscout không chạy ở `http://localhost:4000`, cập nhật trong `hardhat.config.ts`:

```typescript
customChains: [
  {
    network: "besu",
    chainId: 1337,
    urls: {
      apiURL: "http://YOUR_BLOCKSCOUT_URL:4000/api",
      browserURL: "http://YOUR_BLOCKSCOUT_URL:4000",
    },
  },
],
```

### Bước 4: Chạy verify

```bash
npx hardhat run scripts/verifyToken.ts --network besu
```

Nếu thành công, bạn sẽ thấy:
```
✅ Verify thành công! Contract đã được verify trên Blockscout.
```

### Bước 5: Kiểm tra trên Blockscout

1. Mở Blockscout tại URL của bạn
2. Tìm kiếm địa chỉ contract
3. Bạn sẽ thấy:
   - ✅ Badge "Verified" trên trang contract
   - Tab **Code** hiển thị source code
   - Tab **Read Contract** và **Write Contract** với giao diện thân thiện

---

## Cách 2: Verify bằng Blockscout UI (Thủ công)

### Bước 1: Truy cập trang Verify

1. Mở Blockscout (thường là `http://localhost:4000`)
2. Tìm kiếm địa chỉ contract của bạn
3. Trên trang contract, click vào tab **Code** hoặc tìm nút **"Verify & Publish"**

### Bước 2: Chọn phương thức verify

Blockscout hỗ trợ các phương thức:

#### **A. Solidity (Single file)** - Đơn giản nhất

1. Chọn **"Solidity (Single file)"**
2. Điền thông tin:
   - **Contract Name**: `MyToken`
   - **Compiler Version**: `0.8.28` (phải khớp với version trong contract)
   - **EVM Version**: `default` hoặc `paris`
   - **Optimization**: `No` (nếu không bật optimizer)
   - **Constructor Arguments**: ABI-encoded arguments
   - **Source Code**: Copy toàn bộ nội dung file `contracts/MyToken.sol`

3. **Lấy Constructor Arguments ABI-encoded**:

Cách 1: Sử dụng Hardhat console
```bash
npx hardhat console --network besu
```

```javascript
const { ethers } = require("ethers");
const abiCoder = ethers.AbiCoder.defaultAbiCoder();
const args = abiCoder.encode(
  ["string", "string", "uint8", "uint256"],
  ["My Token", "MTK", 18, 1000000]
);
console.log(args);
```

Cách 2: Sử dụng online tool như [ABI Encoder](https://abi.hashex.org/)

4. Click **"Verify & Publish"**

#### **B. Solidity (Standard JSON Input)** - Khuyến nghị cho contract phức tạp

1. Chọn **"Solidity (Standard JSON Input)"**
2. Lấy Standard JSON Input từ Hardhat:

```bash
# Compile contract
npx hardhat compile

# Standard JSON Input được lưu trong:
# artifacts/build-info/[hash].json
```

3. Tìm file build-info mới nhất trong `artifacts/build-info/`
4. Copy toàn bộ nội dung file JSON đó
5. Paste vào ô **"Standard JSON Input"**
6. Điền **Contract Name**: `contracts/MyToken.sol:MyToken`
7. Điền **Constructor Arguments**: ABI-encoded (như trên)
8. Click **"Verify & Publish"**

#### **C. Solidity (Multi-file)** - Cho contract có nhiều file

1. Chọn **"Solidity (Multi-file)"**
2. Upload từng file source code
3. Điền các thông tin compiler
4. Điền constructor arguments
5. Click **"Verify & Publish"**

### Bước 3: Kiểm tra kết quả

Sau khi verify thành công:
- ✅ Badge "Verified" xuất hiện
- Source code hiển thị đầy đủ
- Có thể tương tác với contract qua UI

---

## Lấy Constructor Arguments ABI-encoded

### Sử dụng Hardhat Console:

```bash
npx hardhat console --network besu
```

```javascript
const { ethers } = require("ethers");
const abiCoder = ethers.AbiCoder.defaultAbiCoder();

// Thay đổi các giá trị này theo constructor của bạn
const name = "My Token";
const symbol = "MTK";
const decimals = 18;
const initialSupply = 1000000;

const encoded = abiCoder.encode(
  ["string", "string", "uint8", "uint256"],
  [name, symbol, decimals, initialSupply]
);

console.log("Constructor Arguments (ABI-encoded):");
console.log(encoded);
```

### Sử dụng Script:

Tạo file `scripts/getConstructorArgs.ts`:

```typescript
import { ethers } from "hardhat";

async function main() {
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();
  
  const args = abiCoder.encode(
    ["string", "string", "uint8", "uint256"],
    ["My Token", "MTK", 18, 1000000]
  );
  
  console.log("Constructor Arguments (ABI-encoded):");
  console.log(args);
}

main().catch(console.error);
```

Chạy:
```bash
npx hardhat run scripts/getConstructorArgs.ts
```

---

## Troubleshooting

### Lỗi: "Contract not verified"

**Nguyên nhân:**
- Constructor arguments không khớp
- Compiler version không đúng
- Optimization settings không khớp
- Source code không khớp với bytecode

**Giải pháp:**
1. Kiểm tra lại constructor arguments
2. Đảm bảo compiler version khớp (0.8.28)
3. Kiểm tra optimization settings trong `hardhat.config.ts`
4. Đảm bảo source code chính xác

### Lỗi: "Already Verified"

Contract đã được verify trước đó. Không cần verify lại.

### Lỗi: "Invalid API URL"

**Nguyên nhân:** Blockscout URL không đúng hoặc không truy cập được

**Giải pháp:**
1. Kiểm tra Blockscout có đang chạy không
2. Cập nhật URL trong `hardhat.config.ts`
3. Kiểm tra firewall/network settings

### Lỗi: "Constructor arguments mismatch"

**Nguyên nhân:** Constructor arguments không khớp với lúc deploy

**Giải pháp:**
1. Kiểm tra lại tham số khi deploy
2. Sử dụng Hardhat console để encode lại arguments
3. Đảm bảo thứ tự arguments đúng

---

## Lưu ý quan trọng

1. **Compiler Version**: Phải khớp chính xác với version khi compile
2. **Optimization**: Settings phải khớp (enabled/disabled, runs)
3. **EVM Version**: Thường là `default` hoặc `paris` cho Solidity 0.8.28
4. **Constructor Arguments**: Phải ABI-encode đúng thứ tự và kiểu dữ liệu
5. **Source Code**: Phải giống hệt với code đã compile và deploy

---

## Verify tự động sau khi deploy

Bạn có thể tích hợp verify vào quy trình deploy bằng cách thêm vào script deploy:

```typescript
// Sau khi deploy
const deployment = await hre.ignition.deploy(MyTokenModule);
const contractAddress = deployment.myToken.address;

// Verify ngay sau khi deploy
try {
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [name, symbol, decimals, initialSupply],
  });
} catch (error) {
  console.log("Verify failed:", error);
}
```

---

## Kết quả sau khi verify

Sau khi verify thành công trên Blockscout, bạn sẽ có:

✅ **Source Code hiển thị công khai**
✅ **Tab Read Contract** - Đọc state variables và view functions
✅ **Tab Write Contract** - Gọi write functions qua UI
✅ **Tab Events** - Xem tất cả events
✅ **Tab Code** - Xem source code với syntax highlighting
✅ **Badge "Verified"** - Xác nhận contract đã được verify


# Hướng dẫn Deploy Token và Hiển thị trên Blockscout

## Tổng quan

Blockscout tự động nhận diện các contract tuân theo chuẩn ERC-20 và hiển thị chúng trong trang **Tokens**. Contract `MyToken.sol` đã được tạo với đầy đủ các function chuẩn ERC-20.

## Bước 1: Compile Contract

```bash
npx hardhat compile
```

## Bước 2: Deploy Token lên Besu Network

### Deploy với tham số mặc định:
```bash
npx hardhat ignition deploy ./ignition/modules/MyToken.ts --network besu
```

### Deploy với tham số tùy chỉnh:
```bash
npx hardhat ignition deploy ./ignition/modules/MyToken.ts \
  --parameters '{"MyTokenModule":{"name":"My Custom Token","symbol":"MCT","decimals":18,"initialSupply":1000000}}' \
  --network besu
```

Sau khi deploy thành công, bạn sẽ nhận được:
- **Contract Address**: Địa chỉ của token contract
- **Transaction Hash**: Hash của transaction deploy

## Bước 3: Kiểm tra trên Blockscout

1. Mở Blockscout tại URL của bạn (thường là `http://localhost:4000` hoặc URL tương ứng)
2. Tìm kiếm địa chỉ contract token vừa deploy
3. Blockscout sẽ tự động nhận diện đây là ERC-20 token và hiển thị:
   - Tab **Token** với thông tin: Name, Symbol, Decimals, Total Supply
   - Danh sách holders và balances
   - Lịch sử transfers

## Bước 4: Thực thi các Transaction

### 4.1. Sử dụng Script Helper

Cập nhật địa chỉ token trong file `scripts/interactToken.ts`:
```typescript
const TOKEN_ADDRESS = "0x..."; // Điền địa chỉ token
```

Sau đó chạy:
```bash
npx hardhat run scripts/interactToken.ts --network besu
```

Script này sẽ thực hiện:
- Transfer token
- Approve và TransferFrom
- Mint token mới
- Burn token

### 4.2. Sử dụng Hardhat Console

```bash
npx hardhat console --network besu
```

Trong console:

```javascript
// Kết nối với token
const MyToken = await ethers.getContractFactory("MyToken");
const token = MyToken.attach("0x..."); // Địa chỉ token

// Lấy thông tin
const name = await token.name();
const symbol = await token.symbol();
const totalSupply = await token.totalSupply();

// Transfer
const [owner, recipient] = await ethers.getSigners();
const amount = ethers.parseUnits("100", 18);
await token.transfer(recipient.address, amount);

// Approve
await token.approve(recipient.address, amount);

// TransferFrom (từ recipient)
const tokenAsRecipient = token.connect(recipient);
await tokenAsRecipient.transferFrom(owner.address, recipient.address, amount);

// Mint (chỉ owner)
await token.mint(ethers.parseUnits("1000", 18));

// Burn
await token.burn(ethers.parseUnits("100", 18));
```

### 4.3. Sử dụng Blockscout UI

1. Vào trang contract token trên Blockscout
2. Tab **Write Contract** hoặc **Read Contract**
3. Kết nối wallet và thực hiện các function:
   - `transfer(address _to, uint256 _value)`
   - `approve(address _spender, uint256 _value)`
   - `transferFrom(address _from, address _to, uint256 _value)`
   - `mint(uint256 _amount)` - chỉ owner
   - `burn(uint256 _amount)`

## Các Function ERC-20 Chuẩn

Contract `MyToken` bao gồm các function sau:

### Read Functions:
- `name()` - Tên token
- `symbol()` - Ký hiệu token
- `decimals()` - Số thập phân
- `totalSupply()` - Tổng supply
- `balanceOf(address)` - Số dư của một địa chỉ
- `allowance(address owner, address spender)` - Số lượng được phép chi tiêu

### Write Functions:
- `transfer(address _to, uint256 _value)` - Chuyển token
- `approve(address _spender, uint256 _value)` - Cho phép chi tiêu
- `transferFrom(address _from, address _to, uint256 _value)` - Chuyển từ địa chỉ khác
- `mint(uint256 _amount)` - Tạo token mới (chỉ owner)
- `burn(uint256 _amount)` - Đốt token

## Events

Contract emit các events sau (Blockscout sẽ hiển thị):
- `Transfer(address indexed from, address indexed to, uint256 value)`
- `Approval(address indexed owner, address indexed spender, uint256 value)`

## Lưu ý

1. **Gas Price**: Network Besu có `gasPrice: 0` nên không cần trả phí
2. **Token sẽ tự động xuất hiện**: Sau khi deploy, Blockscout sẽ tự động index và hiển thị token trong trang Tokens
3. **Cần có transaction**: Để token hiển thị đầy đủ, nên thực hiện ít nhất một transaction transfer sau khi deploy
4. **Verify Contract** (tùy chọn): Có thể verify contract trên Blockscout để hiển thị source code

## Troubleshooting

- **Token không hiển thị trên Blockscout**: 
  - Đợi vài phút để Blockscout index
  - Kiểm tra contract có đúng chuẩn ERC-20 không
  - Thực hiện ít nhất một transaction transfer

- **Transaction failed**:
  - Kiểm tra balance đủ không
  - Kiểm tra allowance khi dùng transferFrom
  - Kiểm tra quyền owner khi dùng mint


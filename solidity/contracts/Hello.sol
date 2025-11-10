// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title Hello
 * @dev Contract đơn giản để lấy ra chuỗi "Hello"
 */
contract Hello {
    // Biến public để lưu chuỗi Hello
    string public greeting = "Hello";
    
    /**
     * @dev Hàm để lấy ra chuỗi Hello
     * @return Chuỗi "Hello"
     */
    function getHello() public pure returns (string memory) {
        return "Hello";
    }
    
    /**
     * @dev Hàm để lấy ra chuỗi greeting đã lưu
     * @return Chuỗi greeting
     */
    function getGreeting() public view returns (string memory) {
        return greeting;
    }
}


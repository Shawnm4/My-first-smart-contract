// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Inbox {
    string public message;

constructor(string memory initialMessage) {
     message = initialMessage;
}

function setMessage(string memory newMessage) public{
    message = newMessage;
  
}


}
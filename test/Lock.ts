import hre from "hardhat";
import dotenv from "dotenv";
dotenv.config;
const { Web3 } = require("web3");
import hardhat from "hardhat";
import contractObj from "../artifacts/contracts/Lock.sol/Inbox.json";
import impersonateAccounts from "../helpers/impersonateAccounts";

const assert = require("assert");
export const web3 = new Web3(hardhat.network.provider);

const abi = contractObj.abi;
const bytecode = contractObj.bytecode;

const INITIAL_MESSAGE = "Hi there!";
let accounts = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"];
let inbox: any;

beforeEach(async () => {
  console.log("hey");
  try {
    await impersonateAccounts({
      accounts: accounts,
    });
    console.log(accounts);
    inbox = await new web3.eth.Contract(abi)
      .deploy({
        data: bytecode,
        arguments: [INITIAL_MESSAGE],
      })
      .send({ from: accounts[0], gas: "1000000" });

    console.log("addy", inbox.options.address);
  } catch (e) {
    console.log(e);
  }
});

describe("Inbox", () => {
  try {
    it("Deploys a contract", () => {
      assert.ok(inbox.options.address);
    });
  } catch (e) {
    console.log(e);
  }
  try {
    it("Has a default message", async () => {
      const message = await inbox.methods.message().call();
      assert.equal(message, INITIAL_MESSAGE);
    });
  } catch (e) {
    console.log(e);
  }
  try {
    it("can change the message", async () => {
      await inbox.methods.setMessage("bye").send({ from: accounts[0] });
      const message = await inbox.methods.message().call();
      assert.equal(message, "bye2");
    });
  } catch (e) {
    console.log(e);
  }
});

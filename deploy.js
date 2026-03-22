const {Web3}= require("web3");
const solc = require("solc");
const fs = require("fs");

const web3 = new Web3("http://127.0.0.1:7545");

const source = fs.readFileSync("contract.sol", "utf8");

const input = {
  language: "Solidity",
  sources: {
    "contract.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input)));

const contractFile =
  compiled.contracts["contract.sol"]["DocumentStore"];

console.log(contractFile.abi);

async function deploy() {

  const accounts = await web3.eth.getAccounts();
  console.log("Deploying from account:", accounts[0]);

  const result = await new web3.eth.Contract(contractFile.abi)
    .deploy({
      data: contractFile.evm.bytecode.object,
    })
    .send({
      from: accounts[0],
      gas: "5000000",
    });

  console.log("Contract deployed to:", result.options.address);
}

deploy();
const path = require("path");
const fs = require("fs");
const solc = require("solc");

const wikiPath = path.resolve(__dirname, "contracts", "DecWiki.sol");
const source = fs.readFileSync(wikiPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "DecWiki.sol": {
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

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "DecWiki.sol"
].DecWiki;

// const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
// const contractAbi = compiledContract.contracts["DecWiki.sol"]["DecWiki"].abi;
// const contractBytecode =
//   compiledContract.contracts["DecWiki.sol"]["DecWiki"].evm.bytecode.object;

// module.exports = { contractAbi, contractBytecode };

// console.log(contractAbi);
// console.log("");
// console.log(contractBytecode);

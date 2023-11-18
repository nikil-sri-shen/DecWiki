const { assert } = require("chai");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const { abi, evm } = require("../compile");

const web3 = new Web3(ganache.provider());

let wiki;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  //console.log(accounts);

  wiki = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "6000000", gasPrice: "1000000000" });
});

describe("DecWiki", () => {
  // ------------------------------------------------------------------------------------------
  // it("should return correct contract owner", async () => {
  //   const owner = await wiki.methods.owner().call();
  //   assert.strictEqual(owner, accounts[0], "Incorrect contract owner");
  //   console.log(owner);
  //   console.log(accounts[0]);
  // });
  // ------------------------------------------------------------------------------------------
  // it("should register a user", async () => {
  //   // Initial registration
  //   await wiki.methods.registerUser("Alice").send({ from: accounts[0] });

  //   // Check if the user is registered
  //   const user = await wiki.methods.users(accounts[0]).call();
  //   assert.isTrue(user.isRegistered, "User should be registered");

  //   console.log("Before try block");

  //   // Try to register the same user again
  //   try {
  //     console.log("Entering try block");
  //     await wiki.methods.registerUser("Alice").send({ from: accounts[0] });
  //     console.log("After try block");
  //     // If the above line does not throw an error, the test should fail
  //     assert.fail("Expected an error but got none");
  //   } catch (error) {
  //     // Check if the error message matches the expected message
  //     console.log("Error caught:", error.message);
  //     assert.include(error.message, "User is already registered");
  //   }
  // });
  // ------------------------------------------------------------------------------------------
  it("should publish an article", async () => {
    // Register a user
    await wiki.methods.registerUser("Alice").send({ from: accounts[2] });

    const gasEstimate = await wiki.methods
      .publishArticle("New Article", "Content of the new article")
      .estimateGas({ from: accounts[2] });
    console.log("Gas Estimate:", gasEstimate);

    await wiki.methods
      .publishArticle("New Article", "Content of the new article")
      .send({ from: accounts[2], gas: gasEstimate, gasPrice: "1000000000" });

    // Check if the article is published
    const article = await wiki.methods.articlesByTitle("New Article").call();
    console.log(article);
    assert.equal(article.title, "New Article", "Article title does not match");
    assert.equal(
      article.content,
      "Content of the new article",
      "Article content does not match"
    );
    assert.equal(article.author, accounts[2], "Article author does not match");
    assert.equal(article.votes, 0, "Article votes should be initialized to 0");
    assert.isFalse(
      article.isVerified,
      "Article should not be verified initially"
    );
    assert.equal(
      await wiki.methods.articleCount().call(),
      1,
      "Article count should be incremented"
    );
  });

  it("should not allow publishing an article with the same title", async () => {
    // Register a user
    await wiki.methods.registerUser("Alice").send({ from: accounts[2] });

    const gasEstimate = await wiki.methods
      .publishArticle("New Article", "Content of the new article")
      .estimateGas({ from: accounts[2] });
    console.log("Gas Estimate:", gasEstimate);

    await wiki.methods
      .publishArticle("New Article", "Content of the new article")
      .send({ from: accounts[2], gas: gasEstimate, gasPrice: "1000000000" });

    // Try to publish an article with the same title again
    try {
      await wiki.methods
        .publishArticle("New Article", "New content")
        .send({ from: accounts[2], gas: gasEstimate, gasPrice: "1000000000" });
      // If the above line does not throw an error, the test should fail
      assert.fail("Expected an error but got none");
    } catch (error) {
      // Check if the error message matches the expected message
      assert.include(error.message, "Article with this title already exists");
    }
  });
});

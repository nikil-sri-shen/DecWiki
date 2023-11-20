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
  // it("should publish an article", async () => {
  //   // Register a user
  //   await wiki.methods.registerUser("Alice").send({ from: accounts[2] });
  // const gasEstimate = await wiki.methods
  //   .publishArticle("New Article", "Content of the new article")
  //   .estimateGas({ from: accounts[2] });
  // console.log("Gas Estimate:", gasEstimate);
  //   await wiki.methods
  //     .publishArticle("New Article", "Content of the new article")
  //     .send({ from: accounts[2], gas: gasEstimate, gasPrice: "1000000000" });
  //   // Check if the article is published
  //   const article = await wiki.methods.articlesByTitle("New Article").call();
  //   console.log(article);
  //   assert.equal(article.title, "New Article", "Article title does not match");
  //   assert.equal(
  //     article.content,
  //     "Content of the new article",
  //     "Article content does not match"
  //   );
  //   assert.equal(article.author, accounts[2], "Article author does not match");
  //   assert.equal(article.votes, 0, "Article votes should be initialized to 0");
  //   assert.isFalse(
  //     article.isVerified,
  //     "Article should not be verified initially"
  //   );
  //   assert.equal(
  //     await wiki.methods.articleCount().call(),
  //     1,
  //     "Article count should be incremented"
  //   );
  // });
  // it("should not allow publishing an article with the same title", async () => {
  //   // Register a user
  //   await wiki.methods.registerUser("Alice").send({ from: accounts[2] });
  //   const gasEstimate = await wiki.methods
  //     .publishArticle("New Article", "Content of the new article")
  //     .estimateGas({ from: accounts[2] });
  //   console.log("Gas Estimate:", gasEstimate);
  //   await wiki.methods
  //     .publishArticle("New Article", "Content of the new article")
  //     .send({ from: accounts[2], gas: gasEstimate, gasPrice: "1000000000" });
  //   // Try to publish an article with the same title again
  //   try {
  //     await wiki.methods
  //       .publishArticle("New Article", "New content")
  //       .send({ from: accounts[2], gas: gasEstimate, gasPrice: "1000000000" });
  //     // If the above line does not throw an error, the test should fail
  //     assert.fail("Expected an error but got none");
  //   } catch (error) {
  //     // Check if the error message matches the expected message
  //     assert.include(error.message, "Article with this title already exists");
  //   }
  // });
  //          ------------------------------------------------------------------------------------------
  // it("should allow a registered user to vote for an article", async function () {
  //   this.timeout(5000); // Set the timeout to 5000ms
  //   // Register a user
  //   await wiki.methods.registerUser("Username").send({ from: accounts[0] });
  // const gasEstimate1 = await wiki.methods
  //   .publishArticle("New Article", "Content of the new article")
  //   .estimateGas({ from: accounts[0] });
  // console.log("Gas Estimate:", gasEstimate1);
  //   // Publish an article
  //   await wiki.methods
  //     .publishArticle("ArticleTitle", "ArticleContent")
  //     .send({ from: accounts[0], gas: gasEstimate1, gasPrice: "1000000000" });
  // const gasEstimate2 = await wiki.methods
  //   .voteArticle("ArticleTitle")
  //   .estimateGas({ from: accounts[0] });
  // console.log("Gas Estimate:", gasEstimate2);
  //   // Vote for the article
  //   await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .send({ from: accounts[0], gas: gasEstimate2, gasPrice: "1000000000" });
  //   // Query the article to check if the votes have increased
  //   const article = await wiki.methods.queryArticle("ArticleTitle").call();
  //   assert.strictEqual(parseInt(article.votes), 1, "Voting failed");
  // });
  // it("should not allow voting for a non-existent article", async () => {
  //   // Register a user
  //   await wiki.methods.registerUser("Username").send({ from: accounts[0] });
  //   const gasEstimate2 = await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .estimateGas({ from: accounts[0] });
  //   console.log("Gas Estimate:", gasEstimate2);
  //   // Attempt to vote for a non-existent article
  //   try {
  //     await wiki.methods
  //       .voteArticle("NonExistentArticle")
  //       .send({ from: accounts[0], gas: gasEstimate2, gasPrice: "1000000000" });
  //     assert.fail("Voting for non-existent article should throw an error");
  //   } catch (err) {
  //     assert.strictEqual(err.message.includes("Article does not exist"), true);
  //   }
  // });
  // it("should not allow voting for an article with an empty title", async () => {
  //   // Register a user
  //   await wiki.methods.registerUser("Username").send({ from: accounts[0] });
  //   const gasEstimate2 = await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .estimateGas({ from: accounts[0] });
  //   console.log("Gas Estimate:", gasEstimate2);
  //   // Attempt to vote for an article with an empty title
  //   try {
  //     await wiki.methods
  //       .voteArticle("")
  //       .send({ from: accounts[0], gas: gasEstimate2, gasPrice: "1000000000" });
  //     assert.fail("Voting for article with empty title should throw an error");
  //   } catch (err) {
  //     assert.strictEqual(err.message.includes("Title cannot be empty"), true);
  //   }
  // });
  //          ------------------------------------------------------------------------------------------
  // it("should allow a registered user to verify an article", async function () {
  //   this.timeout(5000);
  //   // Register a user
  //   await wiki.methods.registerUser("Username").send({ from: accounts[0] });
  //   const gasEstimate1 = await wiki.methods
  //     .publishArticle("New Article", "Content of the new article")
  //     .estimateGas({ from: accounts[0] });
  //   console.log("Gas Estimate:", gasEstimate1);
  //   // Publish an article
  //   await wiki.methods
  //     .publishArticle("ArticleTitle", "ArticleContent")
  //     .send({ from: accounts[0], gas: gasEstimate1, gasPrice: "1000000000" });
  //   const gasEstimate2 = await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .estimateGas({ from: accounts[0] });
  //   console.log("Gas Estimate:", gasEstimate2);
  //   // Vote for the article three times
  //   await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .send({ from: accounts[0], gas: gasEstimate2, gasPrice: "1000000000" });
  //   await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .send({ from: accounts[0], gas: gasEstimate2, gasPrice: "1000000000" });
  //   await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .send({ from: accounts[0], gas: gasEstimate2, gasPrice: "1000000000" });
  //   const gasEstimate3 = await wiki.methods
  //     .verifyArticle("ArticleTitle")
  //     .estimateGas({ from: accounts[0] });
  //   console.log("Gas Estimate:", gasEstimate2);
  //   // Verify the article
  //   await wiki.methods
  //     .verifyArticle("ArticleTitle")
  //     .send({ from: accounts[0], gas: gasEstimate3, gasPrice: "1000000000" });
  //   // Query the article to check if it's verified
  //   const article = await wiki.methods.queryArticle("ArticleTitle").call();
  //   assert.strictEqual(article.isVerified, true, "Verification failed");
  // });
  // it("should not allow a user to verify an already verified article", async function () {
  //   this.timeout(5000);
  //   // Register a user
  //   await wiki.methods.registerUser("Username").send({ from: accounts[0] });
  // const gasEstimate1 = await wiki.methods
  //   .publishArticle("New Article", "Content of the new article")
  //   .estimateGas({ from: accounts[0] });
  // console.log("Gas Estimate:", gasEstimate1);
  // // Publish an article
  // await wiki.methods
  //   .publishArticle("ArticleTitle", "ArticleContent")
  //   .send({ from: accounts[0], gas: gasEstimate1, gasPrice: "1000000000" });
  //   const gasEstimate2 = await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .estimateGas({ from: accounts[0] });
  //   console.log("Gas Estimate:", gasEstimate2);
  //   // Vote for the article three times
  //   await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .send({ from: accounts[0], gas: gasEstimate2, gasPrice: "1000000000" });
  //   await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .send({ from: accounts[0], gas: gasEstimate2, gasPrice: "1000000000" });
  //   await wiki.methods
  //     .voteArticle("ArticleTitle")
  //     .send({ from: accounts[0], gas: gasEstimate2, gasPrice: "1000000000" });
  //   const gasEstimate3 = await wiki.methods
  //     .verifyArticle("ArticleTitle")
  //     .estimateGas({ from: accounts[0] });
  //   console.log("Gas Estimate:", gasEstimate2);
  //   // Verify the article
  //   await wiki.methods
  //     .verifyArticle("ArticleTitle")
  //     .send({ from: accounts[0], gas: gasEstimate3, gasPrice: "1000000000" });
  //   // Attempt to verify the article again
  //   try {
  //     await wiki.methods
  //       .verifyArticle("ArticleTitle")
  //       .send({ from: accounts[0], gas: gasEstimate3, gasPrice: "1000000000" });
  //     assert(false, "Expected an error but did not receive one");
  //   } catch (error) {
  //     assert(error, "Expected an error but did not receive one");
  //   }
  // });
  //          ------------------------------------------------------------------------------------------
  // it("should return correct details for a queried article", async () => {
  //   // Register a user
  //   await wiki.methods.registerUser("Username").send({ from: accounts[0] });
  //   const gasEstimate1 = await wiki.methods
  //     .publishArticle("New Article", "Content of the new article")
  //     .estimateGas({ from: accounts[0] });
  //   console.log("Gas Estimate:", gasEstimate1);
  //   // Publish an article
  //   await wiki.methods
  //     .publishArticle("ArticleTitle", "ArticleContent")
  //     .send({ from: accounts[0], gas: gasEstimate1, gasPrice: "1000000000" });
  //   // Query the article
  //   const queriedArticle = await wiki.methods
  //     .queryArticle("ArticleTitle")
  //     .call();
  //   console.log(queriedArticle);
  //   // Check the details
  //   assert.strictEqual(queriedArticle.author, accounts[0], "Incorrect author");
  //   assert.strictEqual(
  //     queriedArticle.retrievedTitle,
  //     "ArticleTitle",
  //     "Incorrect title"
  //   );
  //   assert.strictEqual(
  //     queriedArticle.content,
  //     "ArticleContent",
  //     "Incorrect content"
  //   );
  //   assert.strictEqual(
  //     parseInt(queriedArticle.votes),
  //     0,
  //     "Incorrect vote count"
  //   );
  //   assert.strictEqual(
  //     queriedArticle.isVerified,
  //     false,
  //     "Incorrect verification status"
  //   );
  // });
  // it("should not allow querying a non-existent article", async () => {
  //   // Attempt to query a non-existent article
  //   try {
  //     await wiki.methods.queryArticle("NonExistentTitle").call();
  //     assert(false, "Expected an error but did not receive one");
  //   } catch (error) {
  //     assert(error, "Expected an error but did not receive one");
  //   }
  // });
});

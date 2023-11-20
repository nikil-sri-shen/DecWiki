// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecWiki {
    address public owner;

    struct User {
        string username;
        bool isRegistered;
    }

    struct Article {
        string title;
        string content;
        address author;
        uint256 votes;
        bool isVerified;
    }

    mapping(address => User) public users;
    mapping(string => Article) public articlesByTitle;

    uint256 public articleCount;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "User is not registered");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerUser(string memory username) public {
        require(!users[msg.sender].isRegistered, "User is already registered");
        users[msg.sender] = User(username, true);
    }

    function publishArticle(
        string memory title,
        string memory content
    ) public onlyRegisteredUser {
        // require(articlesByTitle[title].author == address(0), "Article with this title already exists");
        articlesByTitle[title] = Article(title, content, msg.sender, 0, false);
        articleCount++;
    }

    function voteArticle(string memory title) public onlyRegisteredUser {
        require(bytes(title).length > 0, "Title cannot be empty");
        Article storage article = articlesByTitle[title];
        require(article.author != address(0), "Article does not exist");
        article.votes++;
    }

    function verifyArticle(string memory title) public onlyRegisteredUser {
        require(bytes(title).length > 0, "Title cannot be empty");
        Article storage article = articlesByTitle[title];
        require(article.author != address(0), "Article does not exist");
        require(!article.isVerified, "Article is already verified");
        // You may want to set a threshold for the number of votes required to verify an article
        if (article.votes >= 3) {
            article.isVerified = true;
        }
    }

    function queryArticle(
        string memory title
    )
        public
        view
        returns (
            address author,
            string memory retrievedTitle,
            string memory content,
            uint256 votes,
            bool isVerified
        )
    {
        require(bytes(title).length > 0, "Title cannot be empty");
        Article storage article = articlesByTitle[title];
        require(article.author != address(0), "Article does not exist");
        return (
            article.author,
            article.title,
            article.content,
            article.votes,
            article.isVerified
        );
    }
}

//https://sepolia.infura.io/v3/a7b26022e503446196b3d8b73e8b2d40

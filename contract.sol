// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract DocumentStore {

    string public documentHash;

    function storeDocument(string memory _hash) public {
        documentHash = _hash;
    }

    function getDocument() public view returns(string memory){
        return documentHash;
    }
}
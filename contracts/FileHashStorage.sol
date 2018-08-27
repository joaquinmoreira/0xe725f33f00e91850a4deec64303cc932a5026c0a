pragma solidity 0.4.24;


contract FileHashStorage {
    struct File {
        bytes32 digest;
        uint8 hashFunction;
        uint8 size;
        uint timestamp;
    }
    
    struct User {
        File[] documents;
    }
    
    mapping (address => File[]) public filesByUser;
    mapping (bytes32 => address) userByFileHash;
    
    function addFile(bytes32 digest, uint8 hashFunction, uint8 size)
        public
        returns (bool success)
    {
        filesByUser[msg.sender].push(File(digest, hashFunction, size, block.timestamp));
        bytes32 hash = getIPFSHash(digest, hashFunction, size);
        
        require(
            userByFileHash[hash] == 0x0,
            "This file was already uploaded"
        );
        
        userByFileHash[hash] = msg.sender;
        return true;
    }
    
    function getOwnerOfFile(bytes32 digest, uint8 hashFunction, uint8 size) 
        public
        view
        returns (address ownerAddress) 
    {
        bytes32 hash = getIPFSHash(digest, hashFunction, size);
        return userByFileHash[hash];
    }
    
    function getIPFSHash(bytes32 digest, uint8 hashFunction, uint8 size)
        internal
        pure
        returns (bytes32 hash)
    {
        return keccak256(abi.encodePacked(digest, hashFunction, size));
    }
    
    function filesQuantity()
        public
        view
        returns (uint index)
    {
        return filesByUser[msg.sender].length;
    }
}

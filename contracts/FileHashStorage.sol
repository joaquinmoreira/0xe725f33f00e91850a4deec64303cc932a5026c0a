pragma solidity 0.4.24;


contract FileHashStorage {
    struct File {
        string hash;
        string[] tags;
    }
    
    struct User {
        File[] documents;
    }
    
    mapping (address => File[]) filesByUser;
    mapping (string => address) userByFileHash;
    address owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function addFile(string hash)
        public
        returns (uint index)
    {
        filesByUser[msg.sender].push(File(hash, new string[](0)));
        return index;
    }
    
    function addTagToFile(uint index, string tag)
        public
        returns (bool status)
    {
        filesByUser[msg.sender][index].tags.push(tag);
        return true;
    }
    
    function getAddressFromFile(string hash)
        public
        view
        returns (address user)
    {
        return userByFileHash[hash];
    }
    
    function getFilesLength()
        public
        view
        returns (uint length)
    {
        return filesByUser[msg.sender].length;
    }
    
    function getFileHash(uint index)
        public
        view
        returns (string hash)
    {
        return filesByUser[msg.sender][index].hash;
    }
    
    function getFileTagsLength(uint index)
        public
        view
        returns (uint length)
    {
        return filesByUser[msg.sender][index].tags.length;
    }
    
    function getFileTag(uint fileIndex, uint tagIndex)
        public
        view
        returns (string tag)
    {
        return filesByUser[msg.sender][fileIndex].tags[tagIndex];
    }
}

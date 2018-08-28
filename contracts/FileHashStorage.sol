pragma solidity 0.4.24;

import "zeppelin/contracts/lifecycle/Destructible.sol";
import "zeppelin/contracts/lifecycle/Pausable.sol";

/** @title Associates files represented by its IPFS hash to ethereum addresses
  * @author Joaquin Moreira
  * @notice You can use this contract for only the most basic simulation
  * @dev The IPFS is received through the addFile separated in its 3 components:
  * digest, hashFunction and size.
*/
contract FileHashStorage is Destructible, Pausable {
    struct File {
        bytes32 digest;
        uint8 hashFunction;
        uint8 size;
        uint timestamp;
    }
    
    struct User {
        File[] documents;
    }

    /* @dev This mapping is used for getting all the files from an address */    
    mapping (address => File[]) public filesByUser;

    /* @dev This mapping is used for checking if some file is already owned */
    mapping (bytes32 => address) public userByFileHash;


    /** @dev Adds a file represented by its IPFS hash components 
      * to the mappings above
      */      
    function addFile(bytes32 digest, uint8 hashFunction, uint8 size)
        public
    {
        bytes32 hash = getIPFSHash(digest, hashFunction, size);
        require(
            userByFileHash[hash] == 0x0,
            "This file was already uploaded"
        );
        
        filesByUser[msg.sender].push(File(digest, hashFunction, size, block.timestamp));
        userByFileHash[hash] = msg.sender;
    }

    /** @dev Returns the owner of a file represented by its IPFH hash components
      * @return the address of the owner
      */
    function getOwnerOfFile(bytes32 digest, uint8 hashFunction, uint8 size) 
        public
        view
        returns (address ownerAddress) 
    {
        bytes32 hash = getIPFSHash(digest, hashFunction, size);
        return userByFileHash[hash];
    }
    
    /** @dev Hashes the IPFSHash components to get a key to the usersByFileHash mapping
      * @return the hash of the file
      */
    function getIPFSHash(bytes32 digest, uint8 hashFunction, uint8 size)
        internal
        pure
        returns (bytes32 hash)
    {
        return keccak256(abi.encodePacked(digest, hashFunction, size));
    }
    
    /** @dev Returns the quantity of files associated to the address of the sender 
      * @return the quantity of the files associated to the address
      */
    function filesQuantity()
        public
        view
        returns (uint index)
    {
        return filesByUser[msg.sender].length;
    }
}

const FileHashStorage = artifacts.require("FileHashStorage");

const IPFS_HASH = {
  digest: "0x93b9321ad6d4b13b2dfa0d590d4a16d7af70e71e92d691bdb3982ab30cdcce9b",
  hashFunction: 18,
  size: 32
};

const IPFS_SHA =
  "0x8f149c74a4e6411cfefceda99cafb0456b0da001db145494cc72cd510f19273b";

contract("FileHashStorage addFile", async accounts => {
  it("addFile should run without errors when the file is being added for the first time", async () => {
    let exceptionCatch = false;

    try {
      const instance = await FileHashStorage.deployed();
      await instance.addFile(
        IPFS_HASH.digest,
        IPFS_HASH.hashFunction,
        IPFS_HASH.size,
        { from: accounts[0] }
      );
    } catch (e) {
      exceptionCatch = true;
    }
    assert.equal(exceptionCatch, false);
  });

  it("addFile should revert when the same file is try to be added again by the same address", async () => {
    try {
      const instance = await FileHashStorage.deployed();
      await instance.addFile(
        IPFS_HASH.digest,
        IPFS_HASH.hashFunction,
        IPFS_HASH.size,
        { from: accounts[0] }
      );
      await instance.addFile(
        IPFS_HASH.digest,
        IPFS_HASH.hashFunction,
        IPFS_HASH.size,
        { from: accounts[0] }
      );
    } catch (e) {
      assert.match(
        e.message,
        /VM Exception while processing transaction: revert/
      );
    }
  });

  it("addFile should revert when the same file is try to be added again by other address", async () => {
    try {
      const instance = await FileHashStorage.deployed();
      await instance.addFile(
        IPFS_HASH.digest,
        IPFS_HASH.hashFunction,
        IPFS_HASH.size,
        { from: accounts[0] }
      );
      await instance.addFile(
        IPFS_HASH.digest,
        IPFS_HASH.hashFunction,
        IPFS_HASH.size,
        { from: accounts[1] }
      );
    } catch (e) {
      assert.match(
        e.message,
        /VM Exception while processing transaction: revert/
      );
    }
  });
});

contract("FileHashStorage getOwnerFfFile", async accounts => {
  it("getOwnerOfFile should return the address of the owner", async () => {
    const instance = await FileHashStorage.deployed();
    await instance.addFile(
      IPFS_HASH.digest,
      IPFS_HASH.hashFunction,
      IPFS_HASH.size,
      { from: accounts[0] }
    );
    const owner = await instance.getOwnerOfFile.call(
      IPFS_HASH.digest,
      IPFS_HASH.hashFunction,
      IPFS_HASH.size
    );
    assert.equal(owner, accounts[0]);
  });
});

contract("FileHashStorage filesQuantity", async accounts => {
  it("filesQuantity should reflect the increased quantity after adding a file", async () => {
    const instance = await FileHashStorage.deployed();
    await instance.addFile(
      IPFS_HASH.digest,
      IPFS_HASH.hashFunction,
      IPFS_HASH.size,
      { from: accounts[0] }
    );
    const quantity = await instance.filesQuantity.call({ from: accounts[0] });
    assert.equal(quantity, 1);
  });
});

contract("FileHashStorage userByFileHash", async accounts => {
  it("userByFileHash should return the proper owner address", async () => {
    const instance = await FileHashStorage.deployed();
    await instance.addFile(
      IPFS_HASH.digest,
      IPFS_HASH.hashFunction,
      IPFS_HASH.size,
      { from: accounts[0] }
    );
    const address = await instance.userByFileHash.call(IPFS_SHA, {
      from: accounts[0]
    });
    assert.equal(address, accounts[0]);
  });
});

contract("FileHashStorage filesByUser", async accounts => {
  it("filesByUser should return the proper file data", async () => {
    const instance = await FileHashStorage.deployed();
    await instance.addFile(
      IPFS_HASH.digest,
      IPFS_HASH.hashFunction,
      IPFS_HASH.size,
      { from: accounts[0] }
    );
    const fileIndex = 0;

    const [digest, hashFunction, size] = await instance.filesByUser.call(
      accounts[0],
      fileIndex
    );

    assert.equal(digest, IPFS_HASH.digest);
    assert.equal(hashFunction.toNumber(), IPFS_HASH.hashFunction);
    assert.equal(size.toNumber(), IPFS_HASH.size);
  });
});

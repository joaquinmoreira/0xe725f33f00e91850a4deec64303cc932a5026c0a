import ipfsAPI from "ipfs-api";
import bs58 from "bs58";

const HOST = "ipfs.infura.io";
const GATEWAY = "ipfs.infura.io";
const PORT = "5001";

const ipfs = ipfsAPI(HOST, PORT, { protocol: "https" });

const getFile = hash => `https:${GATEWAY}/ipfs/${hash}`;

const getComponentsFromHash = hash => {
  const decoded = bs58.decode(hash);

  return {
    digest: `0x${decoded.slice(2).toString("hex")}`,
    hashFunction: decoded[0],
    size: decoded[1]
  };
};

const getHashFromComponents = hash => {
  const { digest, hashFunction, size } = hash;
  if (size === 0) return null;

  const hashBytes = Buffer.from(digest.slice(2), "hex");
  const multihashBytes = new hashBytes.constructor(2 + hashBytes.length);
  multihashBytes[0] = hashFunction;
  multihashBytes[1] = size;
  multihashBytes.set(hashBytes, 2);

  return bs58.encode(multihashBytes);
};

export { getFile, getComponentsFromHash, getHashFromComponents };
export default ipfs;

import ipfsAPI from "ipfs-api";

const HOST = "ipfs.infura.io";
const PORT = "5001";

const ipfs = ipfsAPI(HOST, PORT, { protocol: "https" });

export default ipfs;

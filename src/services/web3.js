import Web3 from "web3";

const isWeb3Present = () => typeof web3 !== "undefined";

const getWeb3 = async () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", () => {
      if (!isWeb3Present()) {
        window.addEventListener("message", ({ data }) => {
          if (data && data.type && data.type === "ETHEREUM_PROVIDER_SUCCESS") {
            web3 = new Web3(window.ethereum);
          }
        });
        window.postMessage({ type: "ETHEREUM_PROVIDER_REQUEST" }, "*");
      } else {
        web3 = new Web3(web3.currentProvider);
      }
      web3 ? resolve(web3) : reject();
    });
  });
};

export { getWeb3, isWeb3Present };

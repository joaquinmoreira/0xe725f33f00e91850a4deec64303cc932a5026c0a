import React, { Component } from "react";
import Web3 from "web3";

const isWeb3Present = () => typeof web3 !== "undefined";

const getWeb3 = () => {
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
  });
};

const withAddress = WrappedComponent =>
  class extends Component {
    state = {
      address: isWeb3Present() ? web3.eth.accounts[0] : null
    };

    componentDidMount() {
      isWeb3Present() && this.setupAddressInterval();
    }

    componentWillUnmount() {
      clearInterval(this.addressInterval);
    }

    setupAddressInterval() {
      const updater = () => {
        const [address] = web3.eth.accounts;
        const { oldAddress } = this.state;
        if (address !== oldAddress) {
          web3.eth.defaultAccount = address;
          this.setState({ address });
        }
      };
      this.addressInterval = setInterval(updater, 3000);
    }

    render() {
      const { address } = this.state;
      return <WrappedComponent address={address} />;
    }
  };

export { getWeb3, withAddress, isWeb3Present };

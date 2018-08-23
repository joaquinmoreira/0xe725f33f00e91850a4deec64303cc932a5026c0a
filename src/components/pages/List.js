import React, { Component } from "react";
import contract from "truffle-contract";
import { withAddress } from "../../services/web3";
import FileHashStorage from "../../../build/contracts/FileHashStorage";
import Layout from "../Layout";

class List extends Component {
  state = { loading: true };

  async componentDidMount() {
    await this.initializeContract();
    await this.getFiles();
    this.setState({ loading: false });
  }

  async getFiles() {
    /* eslint-disable no-await-in-loop */

    const quantity = await this.contract.getFilesLength();
    const files = [];

    for (let fileIndex = 0; fileIndex < quantity.toNumber(); fileIndex += 1) {
      const hash = await this.contract.getFileHash(fileIndex);
      const tagsQuantity = await this.contract.getFileTagsLength(fileIndex);
      const tags = [];
      for (
        let tagIndex = 0;
        tagIndex < tagsQuantity.toNumber();
        tagIndex += 1
      ) {
        const tag = await this.contract.getFileTag(fileIndex, tagIndex);
        tags.push(tag);
      }
      files.push({ hash, tags, index: fileIndex });
    }

    this.setState({ files });

    /* eslint-enable no-await-in-loop */
  }

  async initializeContract() {
    const { address } = this.props;
    const Contract = contract(FileHashStorage);
    Contract.setProvider(web3.currentProvider);
    Contract.defaults({ from: address });
    this.contract = await Contract.deployed();
  }

  render() {
    const { loading, files } = this.state;

    if (loading) return <p>Loading ...</p>;

    return (
      <Layout>
        <ul>
          {files.map(({ index, hash }) => (
            <li key={index}>
              {index + 1}:
              <a href={`https://ipfs.infura.io/ipfs/${hash}`}>{hash}</a>
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}

export default withAddress(List);

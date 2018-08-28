import React, { Component, Fragment } from "react";
import contract from "truffle-contract";
import moment from "moment";
import { isWeb3Present, getWeb3 } from "../../../services/web3";
import { getFile, getHashFromComponents } from "../../../services/ipfs";
import FileHashStorage from "../../../../build/contracts/FileHashStorage";
import Layout from "../../Layout";
import { shortAddress } from "../../../utils";
import ErrorPage, { ERROR_TYPES } from "../ErrorPage";
import { Container, Title, Address, File, FilesContainer } from "./components";
import Loading from "../../Loading";

const DATE_FORMAT = "MMMM Do YYYY, HH:mm:ss a";

class List extends Component {
  state = { loading: true };

  async componentDidMount() {
    await getWeb3();
    this.setupAddress();
    await this.initializeContract();
    await this.getFiles();
    this.setState({ loading: false });
  }

  async getFiles() {
    /* eslint-disable no-await-in-loop */

    const { address } = this.state;
    const quantity = await this.contract.filesQuantity();
    const files = [];

    for (let fileIndex = 0; fileIndex < quantity.toNumber(); fileIndex += 1) {
      const file = await this.contract.filesByUser(address, fileIndex);
      const [digest, hashFunction, size, timestamp] = file;
      const hash = getHashFromComponents({
        digest,
        hashFunction: hashFunction.toNumber(),
        size: size.toNumber()
      });
      files.push({ hash, timestamp });
    }

    this.setState({ files });

    /* eslint-enable no-await-in-loop */
  }

  setupAddress() {
    const updater = () => {
      const [address] = web3.eth.accounts;
      const { address: oldAddress } = this.state;
      if (address !== oldAddress) {
        web3.eth.defaultAccount = address;
        this.setState({ address });
      }
    };
    updater();
    this.addressInterval = setInterval(updater, 500);
  }

  async initializeContract() {
    const { address } = this.state;
    const Contract = contract(FileHashStorage);
    Contract.setProvider(web3.currentProvider);
    Contract.defaults({ from: address });
    this.contract = await Contract.deployed();
  }

  validForRender() {
    const { address } = this.state;
    return isWeb3Present() && address;
  }

  render() {
    const { address, loading, files } = this.state;

    if (loading) return <Loading size="60px" />;

    return (
      <Fragment>
        {this.validForRender() ? (
          <Layout>
            <Container>
              <Fragment>
                <Title>
                  Files associated to the address:&nbsp;
                  <Address>{shortAddress(address)}</Address>
                </Title>
                <FilesContainer>
                  {files.map(({ hash, timestamp }) => {
                    const date = moment
                      .unix(timestamp.toNumber())
                      .format(DATE_FORMAT);
                    return (
                      <File key={hash}>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={getFile(hash)}
                        >
                          {shortAddress(hash)}
                        </a>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`/file/${hash}/${address}`}
                        >
                          Proof link
                        </a>
                        <span>{date}</span>
                      </File>
                    );
                  })}
                </FilesContainer>
              </Fragment>
            </Container>
          </Layout>
        ) : (
          <ErrorPage
            type={
              isWeb3Present()
                ? ERROR_TYPES.METAMASK_LOCKED
                : ERROR_TYPES.MISSING_WEB3
            }
          />
        )}
      </Fragment>
    );
  }
}

export default List;

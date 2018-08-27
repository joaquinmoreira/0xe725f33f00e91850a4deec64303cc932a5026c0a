import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import contract from "truffle-contract";
import moment from "moment";
import { withAddress, isWeb3Present } from "../../../services/web3";
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
    await this.initializeContract();
    await this.getFiles();
    this.setState({ loading: false });
  }

  async getFiles() {
    /* eslint-disable no-await-in-loop */

    const { address } = this.props;
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

  async initializeContract() {
    const { address } = this.props;
    const Contract = contract(FileHashStorage);
    Contract.setProvider(web3.currentProvider);
    Contract.defaults({ from: address });
    this.contract = await Contract.deployed();
  }

  validForRender() {
    const { address } = this.props;
    return isWeb3Present() && address;
  }

  render() {
    const { loading, files } = this.state;
    const { address } = this.props;

    return (
      <Fragment>
        {this.validForRender() ? (
          <Layout>
            <Container>
              {loading ? (
                <Loading size="60px" />
              ) : (
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
              )}
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

List.propTypes = {
  address: PropTypes.string
};

List.defaultProps = {
  address: null
};

export default withAddress(List);

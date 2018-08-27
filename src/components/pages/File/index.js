import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import contract from "truffle-contract";
import { isWeb3Present } from "../../../services/web3";
import { getFile, getComponentsFromHash } from "../../../services/ipfs";
import FileHashStorage from "../../../../build/contracts/FileHashStorage";
import Layout from "../../Layout";
import Loading from "../../Loading";
import ErrorPage, { ERROR_TYPES } from "../ErrorPage";
import { Container } from "./components";

class File extends Component {
  state = { loading: true };

  async componentDidMount() {
    await this.initializeContract();
    this.verifyFile();
    this.setState({ loading: false });
  }

  async verifyFile() {
    const {
      match: {
        params: { address, hash }
      }
    } = this.props;
    const { digest, hashFunction, size } = getComponentsFromHash(hash);
    const ownerAddress = await this.contract.getOwnerOfFile(
      digest,
      hashFunction,
      size
    );
    this.setState({ isOwner: ownerAddress === address });
  }

  async initializeContract() {
    const { address } = this.props;
    const Contract = contract(FileHashStorage);
    Contract.setProvider(web3.currentProvider);
    Contract.defaults({ from: address });
    this.contract = await Contract.deployed();
  }

  validForRender() {
    return isWeb3Present();
  }

  render() {
    const {
      match: {
        params: { address, hash }
      }
    } = this.props;
    const { isOwner, loading } = this.state;

    return (
      <Fragment>
        {this.validForRender() ? (
          <Layout>
            <Container>
              {loading ? (
                <Loading size="60px" />
              ) : isOwner ? (
                <p>
                  The file with the hash: <a href={getFile(hash)}>{hash}</a> is
                  proven to be owned by {address}
                </p>
              ) : (
                <p>
                  The file with the hash: <a href={getFile(hash)}>{hash}</a> can
                  not be proved to be owned by the address {address}
                </p>
              )}
            </Container>
          </Layout>
        ) : (
          <ErrorPage type={ERROR_TYPES.MISSING_WEB3} />
        )}
      </Fragment>
    );
  }
}

File.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      address: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default File;

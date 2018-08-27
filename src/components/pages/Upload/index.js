import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import contract from "truffle-contract";
import { Ethereum } from "styled-icons/fa-brands";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Inputs,
  Dropzone,
  Message,
  Submit
} from "./components";
import { withAddress, isWeb3Present } from "../../../services/web3";
import ipfs, { getComponentsFromHash } from "../../../services/ipfs";
import FileHashStorage from "../../../../build/contracts/FileHashStorage";
import { shortAddress } from "../../../utils";
import ErrorPage, { ERROR_TYPES } from "../ErrorPage";
import Layout from "../../Layout";
import Loading from "../../Loading";
import { UPLOADED, ALREADY_UPLOADED, DEFAULT_ADDRESS } from "./constants";

class Upload extends Component {
  state = {};

  onFileChange = async files => {
    if (files.length === 0) return;

    const [file] = files;
    this.setState({ file });
  };

  onSubmit = async e => {
    const { file } = this.state;
    const { address } = this.props;
    e.preventDefault();

    this.setState({ uploading: true });
    const hash = await this.addToIpfs(file);
    await this.initializeContract();

    const { digest, hashFunction, size } = getComponentsFromHash(hash);
    const existingOwnerAddress = await this.contract.getOwnerOfFile(
      digest,
      hashFunction,
      size
    );

    let uploadedAddress;
    let status;
    if (existingOwnerAddress === DEFAULT_ADDRESS) {
      status = UPLOADED;
      await this.saveToContract(digest, hashFunction, size);
      uploadedAddress = address;
    } else {
      status = ALREADY_UPLOADED;
      uploadedAddress = existingOwnerAddress;
    }

    this.setState({
      upload: {
        status,
        address: uploadedAddress,
        hash
      },
      uploading: false
    });
  };

  addToIpfs = async file => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        const buffer = await Buffer.from(reader.result);
        ipfs.add(buffer, (err, files) => {
          if (err) reject(new Error(err));
          const [{ hash }] = files;
          resolve(hash);
        });
      };
    });
  };

  saveToContract = async (digest, hashFunction, size) => {
    const { address } = this.props;
    await this.contract.addFile(digest, hashFunction, size, { from: address });
  };

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

  isSubmitDisabled() {
    const { uploading, file } = this.state;
    return !file || uploading;
  }

  message() {
    const {
      upload: { address, hash, status }
    } = this.state;

    const url = `/file/${hash}/${address}`;
    if (status === "ALREADY_UPLOADED") {
      return (
        <Fragment>
          The specified file was already uploaded. See More details of the file
          &nbsp;
          <a href={url}>here</a>
        </Fragment>
      );
    } else if (status === "UPLOADED") {
      return (
        <Fragment>
          The file was uploaded succesfully and asociated to your address. A
          confirmation link for you to proof your ownership is&nbsp;
          <a href={url}>here</a>
        </Fragment>
      );
    }
  }

  render() {
    const { uploading, file, upload } = this.state;
    const { address } = this.props;

    return (
      <Fragment>
        {this.validForRender() ? (
          <Layout>
            <Container>
              <Header>
                <Title>
                  Select a file to save it under your <Ethereum />{" "}
                  address:&nbsp;
                  <em>{shortAddress(address)}</em>
                </Title>
                <SubTitle>
                  You will need to confirm a transaction to our smart contract.
                </SubTitle>
              </Header>
              <Inputs>
                <Dropzone.Container onDrop={this.onFileChange} multiple={false}>
                  {props => (
                    <Dropzone.Area {...props}>
                      {file ? file.name : "Drop file or click to browse."}
                    </Dropzone.Area>
                  )}
                </Dropzone.Container>
              </Inputs>
              {upload && <Message>{this.message()}</Message>}
              <Submit
                disabled={this.isSubmitDisabled()}
                onClick={this.onSubmit}
                loading={uploading}
              >
                {uploading ? <Loading size="15px" color="white" /> : "Upload"}
              </Submit>
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

Upload.propTypes = {
  address: PropTypes.string
};

Upload.defaultProps = {
  address: null
};

export default withAddress(Upload);

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import contract from "truffle-contract";
import { Ethereum } from "styled-icons/fa-brands";
import { withAddress, isWeb3Present } from "../../services/web3";
import ipfs from "../../services/ipfs";
import FileHashStorage from "../../../build/contracts/FileHashStorage";
import { shortAddress } from "../../utils";
import ErrorPage, { ERROR_TYPES } from "./ErrorPage";
import Layout from "../Layout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-between;
`;

const Title = styled.h1`
  font-size: 26px;

  & > svg {
    height: 26px;
    vertical-align: middle;
  }

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.fg.accent};
  }
`;

const SubTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 60px;
`;

Dropzone.Container = styled(Dropzone)`
  max-width: 400px;
  min-width: 200px;
  width: 100%;
  height: 150px;
  margin: 0 auto;
  border-radius: 6px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.bg.secondary};
`;

Dropzone.Area = styled.p`
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  text-align: center;
  border: ${({ theme, isDragActive, isDragReject }) => {
    if (isDragReject) return "1px solid red";
    else if (isDragActive) return `1px solid ${theme.colors.fg.accent}`;
    else return "transparent";
  }};
`;

class Upload extends Component {
  state = {};

  onFileChange = async files => {
    if (files.length === 0) return;

    const [file] = files;
    this.setState({ uploading: true });
    const hash = await this.addToIpfs(file);
    await this.saveToContract(hash);
    this.setState({ uploading: false });
  };

  onSubmit = async e => {
    e.preventDefault();
    const hash = await this.addToIpfs();
    await this.saveToContract(hash);
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

  saveToContract = async hash => {
    const { address } = this.props;
    const Contract = contract(FileHashStorage);
    Contract.setProvider(web3.currentProvider);
    Contract.defaults({ from: address });
    const instance = await Contract.deployed();
    await instance.addFile(hash, { from: address });
  };

  validForRender() {
    const { address } = this.props;
    return isWeb3Present() && address;
  }

  render() {
    const { uploading } = this.state;
    const { address } = this.props;

    return (
      <Fragment>
        {this.validForRender() ? (
          <Layout>
            <Container>
              <Title>
                Select a file to save it under your <Ethereum /> address:&nbsp;
                <em>{shortAddress(address)}</em>
              </Title>
              <SubTitle>
                You will need to confirm a transaction to our smart contract.
              </SubTitle>
              <Dropzone.Container onDrop={this.onFileChange} multiple={false}>
                {props => (
                  <Dropzone.Area {...props}>
                    {uploading ? "loading" : "Drop file or click to browse."}
                  </Dropzone.Area>
                )}
              </Dropzone.Container>
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

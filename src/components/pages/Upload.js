import React from "react";
import PropTypes from "prop-types";

const Upload = ({ address }) => (
  <div>
    Hello World
    {address}
  </div>
);

Upload.propTypes = {
  address: PropTypes.string
};

Upload.defaultProps = {
  address: null
};

export default Upload;

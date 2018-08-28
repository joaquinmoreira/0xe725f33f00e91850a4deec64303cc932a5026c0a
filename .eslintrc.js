module.exports = {
  "extends": ["airbnb", "prettier", "prettier/react", "stylelint"],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": 0,
    "node/no-unsupported-features": 0,
  },
  "globals": {
    document: true,
    window: true,
    web3: true,
    artifacts: true,
    contract: true,
    assert: true,
    before: true
  },
  "parser": "babel-eslint"
};

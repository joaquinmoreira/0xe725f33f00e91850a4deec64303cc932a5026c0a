module.exports = {
  "extends": ["airbnb", "prettier", "prettier/react"],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": 0,
  },
  "globals": {
    document: true,
    window: true,
    web3: true,
  },
};

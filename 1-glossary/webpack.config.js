require("dotenv").config();
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

/*
  What should go here?  Great question!

  Before you go to documentation, verify which version of webpack
  you are using.

  Use this config to copy production versions of your
  index.html and styles.css to dist folder upon build
*/
const SRC_DIR = path.join(__dirname, './client/src');
const DIST_DIR = path.join(__dirname, './client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './client/src/index.html', to: '' },
        { from: './client/src/styles.css', to: '' },
      ],
    }),
  ],
};

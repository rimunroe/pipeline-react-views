var path = require('path');

module.exports = {
  entry: path.join(__dirname, "index.js"),
  output: {
    filename: 'pipeline-react-views.js',
    libraryTarget: "umd",
    library: "pipeline-react-views"
  },
  externals: {
    lodash: "lodash",
    react: "react"
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" },
      { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.coffee']
  }
};

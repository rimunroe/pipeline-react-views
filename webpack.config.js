var path = require('path');

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: path.join("build", "pipeline-react-views.js"),
    libraryTarget: "umd",
    library: "pipelineReactViews"
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" },
      { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.coffee']
  },
  plugins: []
};

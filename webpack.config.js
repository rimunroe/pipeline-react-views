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
  }
};

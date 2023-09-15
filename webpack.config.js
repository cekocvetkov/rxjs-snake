const path = require('path');
module.exports = {
  mode: "development",

  //add ts-loader
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        use: "ts-loader"
      },
      {
        test: /\.css$/i,
        include: [path.resolve(__dirname, 'src')],
        use: ["style-loader", "css-loader"],
      }
    ]
  },

  // set entry and output files
  entry: { bundle: path.resolve(__dirname, 'src/index.ts') },
  output: { path: path.resolve(__dirname, 'dist'), filename: "[name].js" },

  // use .ts files  
  resolve: {
    extensions: ['.ts', '.js']
  },

  // disable devtool
  devtool: false,
}
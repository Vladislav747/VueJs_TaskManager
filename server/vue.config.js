const path = require('path');

module.exports = {
  devServer: {
    proxy: 'http://localhost:8082'
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  publicPath: process.env.NODE_ENV === 'production' ?
    '../dist/' :
    '/',
    
    outputDir:path.resolve(__dirname, '../dist/')
  // devServer: {
  //   proxy: {

  //   }
  // }
}
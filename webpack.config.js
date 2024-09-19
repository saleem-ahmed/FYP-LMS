const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
    }
  },
  // your existing configuration
  plugins: [

    new webpack.DefinePlugin({
      'process.env.NODE_OPTIONS': JSON.stringify('--openssl-legacy-provider')
    })
  ]
};

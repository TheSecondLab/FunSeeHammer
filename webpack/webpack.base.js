module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [require('babel-plugin-add-module-exports')]
        }
      }
    }]
  }
};

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    //Do we need publicPath?
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,

        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css/,

        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    port: 3000,
    proxy: [
      {
        context: ['/'],
        target: 'http://localhost:8000',
      },
    ],
  },
};

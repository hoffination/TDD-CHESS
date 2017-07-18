const { CheckerPlugin } = require('awesome-typescript-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const cleanPath = [
  'dist'
]

module.exports = {
  entry: './src/entry.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      // {
      //   test: /\.css$/,
      //   loaders: [
      //     'style-loader',
      //     'css-loader',
      //     'postcss-loader'
      //   ]
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(cleanPath),
    new CheckerPlugin(),
    // 'source-loader'
  ]
};
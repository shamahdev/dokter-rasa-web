const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/scripts/'),
      'styles': path.resolve(__dirname, 'src/styles/'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WebpackPwaManifest({
      name: 'Dokter Rasa',
      short_name: 'Dokter Rasa',
      description: 'Temukan Restoran untuk obat rasa laparmu!',
      theme_color: '#C52C26',
      background_color: '#C52C26',
      start_url: '/index.html',
      display: 'standalone',
      crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
      ios: true,
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          type: 'image/png',
          purpose: 'any maskable',
          destination: 'images',
        },
      ],
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/scripts/sw.js',
      swDest: 'sw.js',
    }),
  ],
};

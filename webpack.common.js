const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 50,
          },
        },
      ],
      overrideExtension: true,
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
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/icons/icon.png'),
          sizes: [96, 120, 128, 152, 167, 180, 192, 256, 384, 512, 1024],
          type: 'image/png',
          purpose: 'any maskable',
          destination: path.join('images', 'icons'),
          ios: true,
        },
      ],
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/scripts/sw.js',
      swDest: 'sw.js',
    }),
    new BundleAnalyzerPlugin(),
  ],
};

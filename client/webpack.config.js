const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new GenerateSW(),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor PWA',
        short_name:'JATE PWA',
        description:'An online/offline text editor using progressive web applications',
        background_color:'#ffffff',
        publicPath: './',
        orientation: 'portrait',
        display: 'standalone',
        incognito: 'split',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes:[96,128,192,256,384,512]
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },

      ],
    },
  };
};


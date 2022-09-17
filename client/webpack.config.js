const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const path = require('path');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');
// Import GenerateSW to create serviceworker
// Import InjectManifest to create Manifest.json

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
      new InjectManifest({
        swSrc: './src-sw.js', // source of the script for the service worker in our client folder
        swDest: 'src-sw.js' // where the service worker script will be saved in the dist folder
      }),
      new GenerateSW(), // create a service worker 
      new WebpackPwaManifest({ // configuration for the manifest.json file we are creating
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor PWA',
        short_name:'JATE PWA',
        description:'An online/offline text editor using progressive web applications',
        background_color:'#ffffff',
        publicPath: './',
        start_url: '/',
        orientation: 'portrait',
        display: 'standalone',
        incognito: 'split',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes:[96,128,192,256,384,512],
            destination: path.join('assets', 'icons')
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
          // loads our CSS 
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ]
            }
            // loads babel plugin, compiles files to be readable
          }
        },

      ],
    },
  };
};


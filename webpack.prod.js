const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const appDir = path.resolve(__dirname, 'build');

module.exports = merge({
  devtool: false,
  output: {
    path: appDir,
    filename: 'main.js',
    publicPath: '/he3'
  },
  optimization: {
    minimizer: [new TerserPlugin({
      sourceMap: true,
    })]
  },
  plugins: [
    new webpack.DefinePlugin({
      //'process.env.NODE_ENV': JSON.stringify('production')
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PUBLIC_URL: JSON.stringify('/he3')
      }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title: 'History Engine 3.0',
      filename: 'index.html',
      appMountId: 'root',
      links: [
        'https://fonts.googleapis.com/css?family=Merriweather:300|Lato:400,100,300|Lora:100,400|Crimson+Text:400i|PT+Sans:400',
        '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/leaflet.css',
        {
          rel: 'icon',
          href: 'http://dsl.richmond.edu/assets/images/favicon.png'
        }
        // {
        //   rel: 'alternate icon',
        //   href:  '/panorama/photogrammar/favicon.ico'
        // }
      ],
      googleAnalytics: {
        trackingId: 'UA-4063620-22',
        pageViewOnLoad: true
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          property: 'og:url',
          content: 'https://dsl.richmond.edu/socialvulnerability/'
        },
        {
          property: 'og:title',
          content: 'Not Even Past: Social Vulnerability and the Legacy of Redlining'
        },
        {
          property: 'og:description',
          content: 'Not Even Past maps redlining maps from the 1930s with maps of health dispartities today, showing enduring contours of marked inequality in American cities over the past century.'
        },
        {
          property: 'og:image',
          content: 'https://dsl.richmond.edu/socialvulnerability/images/ogimage.jpg'
        },
        {
          property: 'og:image:width',
          content: '1200'
        },
        {
          property: 'og:image:height',
          content: '630'
        }
      ],
    }),
  ]
}, common);

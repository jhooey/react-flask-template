const path = require("path");
const webpack = require('webpack')
const HtmlWebpackPugin = require('html-webpack-plugin'); // generate html templates
const CleanWebpackPlugin = require('clean-webpack-plugin'); // get rid of old build files - we moved build files to /react-scripts so we don't delete all of our custom scripts

const cssButMakeItSassyHTMLPlugin = new HtmlWebpackPugin({
  template: path.resolve(__dirname, "templates/styles.html"), // where to get the master html for the app
  filename: path.resolve(__dirname, "templates/snippets/sassy_site_css.html") // where to output the html with the bundle appended
})
const appContainerPlugin = new HtmlWebpackPugin({
  template: path.resolve(__dirname, "templates/react/inject_app_container.html"), // where to get the master html for the app
  filename: path.resolve(__dirname, "templates/snippets/app_container.html") // where to output the html with the bundle appended
})
const providePlugin = new webpack.ProvidePlugin({
    'React': 'react',
    'ReactDOM': '"react-dom"',
    'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    '_': 'lodash'
})

module.exports = {
  mode: "development",
  watch: true,
  node: {
    child_process: 'empty',
    fs: 'empty'
  },

  entry: {
    Index: path.resolve(__dirname, "src/index.js"),
    SiteCSS: path.resolve(__dirname, "src/styles/custom.scss")
  },

  output: {
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].[contenthash:8].bundle.js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].[contenthash:8].bundle.js',
    // `path` is the folder where Webpack will place your bundles
    path: path.resolve(__dirname, "static/react-scripts"),
    // `publicPath` is where Webpack will load your bundles from (optional)
    publicPath: '/static/react-scripts/'
  },

  resolve: {
    modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "./node_modules")]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
   ]
  },
  plugins: [
    providePlugin,
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    appContainerPlugin,
    cssButMakeItSassyHTMLPlugin
  ],

  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity, // no limit on number of output files
      minSize: 0, // don't join small files together to meet arbitrary minimum size requirement
      cacheGroups: {
        vendor: { // chunk each node module into own bundle
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  }
};

// for an entertaining and informative article that a lot of this config is from,
// please read this / consider it cited:
// https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758

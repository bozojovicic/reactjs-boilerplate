const path              = require('path');
const webpack           = require('webpack');
const htmlPlugin        = require('html-webpack-plugin');
const openBrowserPlugin = require('open-browser-webpack-plugin'); 
const dashboardPlugin   = require('webpack-dashboard/plugin');
const autoprefixer      = require('autoprefixer'); 

var debug = process.env.NODE_ENV !== "production";

const PATHS = {
  app: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'public'),
  images:path.join(__dirname,'src/assets/'),
  build: path.join(__dirname, 'dist')
};

const options = {
  host:'localhost',
  port:'3000'
};

module.exports = {
  entry: {
    app: PATHS.app
  },
  devtool: debug ? "inline-sourcemap" : null,
  output: {
    path: PATHS.build,
    filename: 'bundle.[hash].js'
  },
  devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port 
    },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['react', 'env', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include:PATHS.app
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
        include:PATHS.app
      },      
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,        
        loader: 'file',
        query: {
          name: '[path][name].[ext]'
        }
      },      
    ]
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ]
      }),
    ];
  },
  plugins:[
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),

    new dashboardPlugin(),
    new webpack.HotModuleReplacementPlugin({
        multiStep: true
    }),
    new htmlPlugin({
      template:path.join(PATHS.public,'index.html'),
      inject:'body'
    }),
    new openBrowserPlugin({
      url: `http://${options.host}:${options.port}`
    })
  ]
};
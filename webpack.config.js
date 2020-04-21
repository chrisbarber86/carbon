const production = process.env.NODE_ENV === 'production';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    'components/button': './src/components/button/index.js',
    'components/button-toggle': './src/components/button-toggle/index.js'
  },
  output: {
    path: `${__dirname}/lib`,
    filename: '[name].js',
    library: 'carbon-react',
    libraryTarget: 'umd'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        node_vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 1
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'style/fonts/'
          }
        }]
      },
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: production ? MiniCssExtractPlugin.loader : 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              path.resolve(process.cwd(), './src/style-config')
            ]
          }
        }]
      }
    ]
  },
  externals: {
    react: 'umd react',
    'react-dom': 'umd react-dom'
  }
};

// import Button from 'carbon-react/lib/components/button';

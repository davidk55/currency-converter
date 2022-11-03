const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: mode,

  devtool: 'source-map',
  devServer: {
    static: 'dist',
    open: true,
    hot: true,
    watchFiles: ['src/**/*'],
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Currency Converter',
      filename: './index.html',
      template: './src/template.html',
      favicon: './src/assets/images/favicon.svg',
    }),
    new MiniCssExtractPlugin(),
  ],
};

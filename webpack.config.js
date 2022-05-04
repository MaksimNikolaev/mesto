const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/pages/index.js",
  output: {
    filename: "main.[hash].js", //hash нужен чтобы фиксировались измеения, а не кэшировались браузером.
    path: path.resolve(__dirname, "dist"),
    clean: true, //удаление файла js
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      cache: false,
    }),
    new MiniCssExtractPlugin(),
  ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?)|eot|ttf|otf/,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    compress: true,
    port: 8081,
    open: true,
    static: path.resolve(__dirname, 'dist'),
  },
  devtool: "inline-source-map", //управление исходной картой js
};

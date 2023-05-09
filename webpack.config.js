const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// html ���� ���� �÷������Դϴ�
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css ���� ���� �÷������Դϴ�
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// build ���� �ڵ� ������ ���� �÷����� �Դϴ�

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build")
  },
  devServer: {
    contentBase: path.resolve("./build"),
    index: "index.html",
    port: 9000
    // ���� ���� �ڵ� ������ ���� �����Դϴ�
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test: /\.json$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          name: "model/[name].[ext]"
        },
        include: [
          path.resolve(__dirname, "./model")
        ]
      },
      {
        test:/\.ico$/,
        loader:"file-loader?name=[name].[ext]",
      }
    ]
    // js, jsx, html, css ���� ���鸵 ���� �����Դϴ�
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new CleanWebpackPlugin()
    // �÷����� �������Դϴ�
  ]
};
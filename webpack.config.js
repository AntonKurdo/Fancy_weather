let path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let conf = {
	entry: './src/index.js',
       mode: 'production',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js'
    },
   
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', 
            minify: false

        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })    ],

        module: {
            rules: [
              {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,  
                           
                  },
                  'css-loader',
                ],
              },
            ],
          },
          module: {
              rules: [
                {
                  test: /\.css$/i,
                  use: ['style-loader', 'css-loader'],
                },
              ],
            },
        };

module.exports = conf;
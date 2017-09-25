var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

module.exports = {
    entry : path.join(__dirname, "src/main.js"),
    output : {
        path : path.join(__dirname, "dist"),
        filename : "bundle.js"
    },
    plugins : [new htmlWebpackPlugin({
        template : path.join(__dirname, "src/index.html"),
        filename : "index.html"
    })],
    module : {
        rules : [{ test : /\.css$/, use : ["style-loader","css-loader"]},
                 { test : /\.js$/, use : ["babel-loader"], exclude : /node_modules/},
                 { test : /\.(ttf||woff||woff2||svg||eot||ttf||otf)$/, use : ["file-loader"]},
                 { test : /\.(jpg||png||gif)$/, use : ["url-loader"]},
                 { test : /\.vue$/, use : ["vue-loader"]}]
    }
}
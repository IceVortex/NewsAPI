const path = require("path");

module.exports = {
    entry: {
        main: "./js/index.js",
        vendor: "./js/vendor.js"
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ["html-loader"],
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    name: "[name].[hash].[ext]",
                    outputPath: "imgs"
                  }
                }
            }/*,
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["babel-preset-env"],
                    plugins: [
                        "babel-plugin-transform-runtime"
                      ]
                  }
                }
            }*/
        ]
    }
}
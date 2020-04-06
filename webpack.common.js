const path = require("path");

module.exports = {
    entry: { 
        main: "./js/index.js",
        vendor: "./js/vendor.js"
    },
    module: {
        rules: [/*,
            {
                test: /\.html$/,
                use: ["html-loader"]
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
            }*/
        ]
    }
}
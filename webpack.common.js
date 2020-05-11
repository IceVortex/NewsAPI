const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './src/main.js',
    plugins: [new VueLoaderPlugin()],
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ["vue-template-loader"],
                exclude: /index.html/
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
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
}
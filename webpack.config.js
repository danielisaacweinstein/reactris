var webpack = require('webpack');  

if ( process.env.NODE_ENV !== "production" ) {
    module.exports = {  
        entry: [
          'webpack/hot/only-dev-server',
          "./js/app.js"
        ],
        output: {
            path: __dirname + '/build',
            filename: "bundle.js"
        },
        module: {
          loaders: [
            {
              test: /\.js?$/,
              loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015'],
              exclude: /node_modules/
            },
            {
              test: /\.jsx?$/,
              loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015'],
              exclude: /node_modules/
            },
            { test: /\.css$/, loader: "style!css" }
          ],
        },
        plugins: [
          new webpack.NoErrorsPlugin()
        ]
    
    };
} else {
    module.exports = {  
        entry: [
          "./js/app.js"
        ],
        output: {
            path: __dirname + '/build',
            filename: "bundle.js"
        }
    };
}

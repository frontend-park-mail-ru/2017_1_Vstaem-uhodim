var path = require('path');

module.exports = {
	entry: {
		test: "./static/main.js"
	},
	output: {
		filename: "build.js",
		path: path.resolve(__dirname, "static"),
	},
	devtool: "cheap-eval-source-map",

	//watch: true,

	module: {
		rules: [{
			test: /\.js$/,
			loader: "babel-loader",
			options: {presets: ['es2015']}
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}, {
			test: /\.pug$/,
			loader: "pug-loader"
		}]
	}
};

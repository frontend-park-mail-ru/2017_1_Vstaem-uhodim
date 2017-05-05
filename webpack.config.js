var path = require('path');
var glob = require("glob");

module.exports = [{
	entry: {
		main: ["babel-polyfill","./static/main.js"],
		test: glob.sync("./static/api-specs/*.js"),
		offline: ["babel-regenerator-runtime", "./static/offline.js"]
	},
	output: {
		filename: "build_[name].js",
		path: path.resolve(__dirname, "static")
	},
	//devtool: "cheap-eval-source-map",

	//watch: true,

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				options: {presets: ["es2015", "stage-0"]}
			},
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader?importLoaders=1!postcss-loader"
			},
			{
				test: /\.pug$/,
				loader: "pug-loader"
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
				}
			}
		]
	}
}];

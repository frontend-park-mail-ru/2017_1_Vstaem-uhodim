module.exports = {
	plugins: [
		require("autoprefixer") ({browsers:["last 2 version", ">1%"]}),
		require("precss")
	]
};

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const browsers = ['ie 6-8', 'Firefox < 20', 'Android > 2.1']

module.exports = function(prod){
	var cssOptions = cssLoaders(prod);
	return {
		css:cssLoader(prod, cssOptions),
		less:lessLoader(prod, cssOptions),
		vue:vueLoader(prod, cssOptions),
	}
}
function cssLoaders(prod){
	return [
		{
			loader:'css-loader',
			options:{
	      minimize: prod ? true : false,
	      sourceMap: prod ? false : true
	    }
		},
		{
      loader: 'autoprefixer-loader',
      options: {
        browsers: browsers
      }
    }
	];
}

function cssLoader(prod, cssOptions){
	return prod ? ExtractTextPlugin.extract({
		fallback: 'style-loader',
	  use: cssOptions
	}) : ['style-loader'].concat(cssOptions);
}

function vueLoader(prod, cssOptions){
	return prod ? ExtractTextPlugin.extract({
	    fallback: 'vue-style-loader',
	    use: cssOptions
	  }) : ['vue-style-loader'].concat(cssOptions)
}

function lessLoader(prod, cssOptions){
	var less = {
  	loader: "less-loader",
  	options: {
      sourceMap: prod ? false : true
    }
  }
	return prod ? ExtractTextPlugin.extract({
	    fallback: 'style-loader',
	    use: cssOptions.concat([less])
	  }) : ['style-loader'].concat(cssOptions).concat([less])
}
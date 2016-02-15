var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var babelrc = fs.readFileSync('./.babelrc');
var babelLoaderQuery = {};

try {
    babelLoaderQuery = JSON.parse(babelrc);
    console.log(babelLoaderQuery);
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

  		clean: ['./dist','./lib'],

  		less: {
            dev: {
                files: {
                    "./dist/sq-components.css": "./assets/sq-components.less"
                }
            },
            prod: {
                files: {
                    "./dist/sq-components.min.css": "./assets/sq-components.less"
                },
                options: {
                    compress: true
                }
            }
        },
        webpack: {
        	dev: {
   				resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './src/sq-components.js',
                output: {
                    path: './dist',
                    filename: 'sq-components.js'
                },
                module:{
                	 loaders: [{
                            test: /\.jsx?$/,
                            exclude: /node_modules/,
                            loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]
                     }]
                }
        	},
        	lib: {
   				resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './src/sq-components.js',
                output: {
                    path: './lib',
                    filename: 'sq-components.js'
                },
                module:{
                	 loaders: [{
                            test: /\.jsx?$/,
                            exclude: /node_modules/,
                            loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]
                        }
                    ]
                },
                externals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'classnames': 'classnames',
                    blacklist: 'blacklist'
                }
        	},
        	prod: {
				resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './src/sq-components.js',
                output: {
                    path: './dist',
                    filename: 'sq-components.min.js'
                },
                module:{
                	 loaders: [{
                            test: /\.jsx?$/,
                            exclude: /node_modules/,
                            loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]
                        }
                    ]
                },
                plugins: [
                	new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        },
                        output: {
                            comments: false
                        }
                    })
                ]

        	}
        }
    });
	grunt.registerTask('default', ['clean', 'less:dev','less:prod','webpack:lib','webpack:dev','webpack:prod']);
}
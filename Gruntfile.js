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

    clean: ['./dist', './lib'],

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
      },
      example: {
        files: {
          "./example/example.swipe.css": "./example/example.swipe.less"
        }
      },
    },
    babel: {
      options: babelLoaderQuery,
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['*.js', '**/*.js'],
            dest: 'lib/'
          }
        ]
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
        module: {
          loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]
          }]
        }
      },
      example: {
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        entry: {
          'example.swipe':'./example/example.swipe.js'
        },
        output: {
          path: './example',
          filename: '[name].bundle.js'
        },
        module:{
          loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]
          }
          ]
        },
        devtool: 'eval'
      },
      lib: {
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        entry: './src/sq-components.js',
        output: {
          library: 'sq-components',
          libraryTarget: 'umd',
          path: './lib',
          filename: 'sq-components.js'
        },
        module: {
          loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]
          }]
        },
        externals: [{
          'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
          }
        }, {
          'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
          }
        }]
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
        module: {
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
  grunt.registerTask('default', ['clean', 'less:dev', 'less:prod','less:example', 'babel', 'webpack:example', 'webpack:dev', 'webpack:prod']);

  grunt.registerTask('example', ['less:example', 'webpack:example']);
}
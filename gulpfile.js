var gulp = require('gulp');
var gutil = require("gulp-util");
var del = require('del');

var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var WebpackDevServer = require("webpack-dev-server");
var Karma = require('karma').Server;

gulp.task('clean', function(cb) {
  return del('dist/**/*', cb);
});

function copyIndex() {
  return gulp.src('./index.html').pipe(gulp.dest("./dist"));
}

gulp.task("webpack:build-dev", ["clean"], function(callback) {
  copyIndex();
  var myDevConfig = Object.create(webpackConfig);
  myDevConfig.debug = true;

  // create a single instance of the compiler to allow caching
  var devCompiler = webpack(myDevConfig);

  // run webpack
  devCompiler.run(function(err, stats) {
    if (err) throw new gutil.PluginError("webpack:build-angular-dev",
      err);
    gutil.log("[webpack:build-angular-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack:build", ["clean"], function(callback) {
  copyIndex();
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if (err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {
  var myDevConfig = Object.create(webpackConfig);
  myDevConfig.debug = true;
  myDevConfig.entry.baxi.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
  myDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Start a webpack-dev-server
  var compiler = webpack(myDevConfig);

  new WebpackDevServer(compiler, {
    publicPath: myDevConfig.output.publicPath,
    hot: true,
    inline: true,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]",
      "http://localhost:8080/index.html");
  });
});

gulp.task('test', function(done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-debug', function(done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

// Angular Development build
gulp.task("build-dev", ["webpack:build-dev"]);

// Production build
gulp.task("build", ["webpack:build"]);

// Default task when no task is specified
gulp.task('default', ['build']);

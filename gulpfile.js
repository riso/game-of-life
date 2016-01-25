const gulp = require("gulp");
const gutil = require("gulp-util");
const del = require("del");

const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const WebpackDevServer = require("webpack-dev-server");
const Karma = require("karma").Server;

gulp.task("clean", (cb) => del("dist/**/*", cb));

function copyIndex() {
  return gulp.src("./index.html").pipe(gulp.dest("./dist"));
}

gulp.task("webpack:build-dev", ["clean"], (callback) => {
  copyIndex();
  const myDevConfig = Object.create(webpackConfig);
  myDevConfig.debug = true;

  // create a single instance of the compiler to allow caching
  const devCompiler = webpack(myDevConfig);

  // run webpack
  devCompiler.run((err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack:build-angular-dev", err);
    }
    gutil.log("[webpack:build-angular-dev]", stats.toString({
      colors: true,
    }));
    callback();
  });
});

gulp.task("webpack:build", ["clean"], (callback) => {
  copyIndex();
  // modify some webpack config options
  const myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true,
    }));
    callback();
  });
});

gulp.task("webpack-dev-server", () => {
  const myDevConfig = Object.create(webpackConfig);
  myDevConfig.debug = true;
  myDevConfig.entry.gol.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
  myDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Start a webpack-dev-server
  const compiler = webpack(myDevConfig);

  new WebpackDevServer(compiler, {
    publicPath: myDevConfig.output.publicPath,
    hot: true,
    inline: true,
    stats: {
      colors: true,
    },
  }).listen(8080, "localhost", (err) => {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]",
      "http://localhost:8080/index.html");
  });
});

gulp.task("test", (done) => {
  new Karma({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true,
  }, done).start();
});

gulp.task("test-debug", (done) => {
  new Karma({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: false,
  }, done).start();
});

// Angular Development build
gulp.task("build-dev", ["webpack:build-dev"]);

// Production build
gulp.task("build", ["webpack:build"]);

// Default task when no task is specified
gulp.task("default", ["build"]);

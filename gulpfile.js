'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const exec = require('child_process').exec;
const webpack = require('webpack-stream');

var paths = ['*.js', 'test/*.js', 'models/*.js'];

var sources = {
  html: __dirname + '/app/layout/*.html',
  js:   __dirname + '/app/index.js',
  test: __dirname + '/test/*_spec.js',
  css:  __dirname + '/app/style/*.css',
  img:  __dirname + '/app/style/images/*.jpg'
};

var runCommand = function(command) {
  exec(command, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
};

gulp.task('lint', () => {
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(paths)
  .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(['server.js', 'test/**'], ['test', 'lint']);
});

gulp.task('mongo-start', () => {
  var command = 'mongod --dbpath ./data';
  runCommand(command);
});

gulp.task('mongo-stop', () => {
  var command = 'mongo admin --eval "db.shutdownServer()"';
  runCommand(command);
});

gulp.task('webpack', function() {
  return gulp.src(__dirname + '/app/index.js')
  .pipe(webpack({
    watch: true,
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.png$/, loader: 'url-loader?limit=100000' },
        { test: /\.jpg$/, loader: 'file-loader' }
      ]
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('bundle:dev', function () {
  return gulp.src(sources.js)
  .pipe(webpack({output: {filename: 'bundle.js'}}))
  .pipe(gulp.dest('./build'));
});

gulp.task('copy', function () {
  return gulp.src(sources.html)
  .pipe(gulp.dest('./build'));
});

gulp.task('copycss', function () {
  return gulp.src(sources.css)
  .pipe(gulp.dest('./build'));
});

gulp.task('images',function() {
  return gulp.src(sources.img)
  .pipe(gulp.dest('./build'));
});

gulp.task('bundle:test', () => {
  return gulp.src(sources.test)
  .pipe(webpack({output: {filename:'test_bundle.js'}}))
  .pipe(gulp.dest('./test'));
});

gulp.task('default', ['lint', 'webpack', 'bundle:dev', 'copy', 'copycss', 'images']);

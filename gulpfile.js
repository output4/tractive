var gulp = require("gulp");
var browserify = require("browserify");
var less = require('gulp-less');
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var path = require('path');

var paths = {
  pages: ["src/*.html"],
  fonts: ["src/webfonts/*"]
};

gulp.task("copy-html", function () {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

gulp.task("copy-fonts", function () {
  return gulp.src(paths.fonts).pipe(gulp.dest("dist/webfonts"));
});


var ts = function() {
  console.log('compile ts');
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/ts/main.ts"],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
}

var css = function () {
  console.log('compile less');
  return gulp.src('./src/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
};

gulp.task("ts", ts);
gulp.task('less', css);

function watchall() {
  var watcher = gulp.watch(['./src/less/*.less', './src/ts/*.ts', './src/*.html']);
  watcher.on('change', gulp.series(
      gulp.parallel('ts'),
      gulp.parallel('less'),
      gulp.parallel('copy-html'))
    );
}

gulp.task("default", gulp.series(
    gulp.parallel("copy-html"),
    gulp.parallel("copy-fonts"),
    gulp.parallel('less'),
    gulp.parallel('ts'))
  );
gulp.task('watch', watchall);
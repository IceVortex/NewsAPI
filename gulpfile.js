var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var connect = require('gulp-connect-php');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');


gulp.task('sass', function() {
    return gulp.src('./sass/index.sass')
      .pipe(sass())
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return browserify({
      entries: ['./js/']
    })
    .transform( babelify, { presets: ['env']})
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./JSbabel/'))
});

gulp.task('watch', ['sass', 'js'], function() {
    connect.server({}, function () {
        browserSync({
          proxy: '127.0.0.1:8000'
        });
      });
    gulp.watch('./sass/**/*.sass', ['sass']);
    gulp.watch('./js/**/*.js', ['js']);
    gulp.watch('./js/*.js').on('change', browserSync.reload);
    gulp.watch('./index.php').on('change', browserSync.reload);
});

gulp.task('default', ['sass','watch']);
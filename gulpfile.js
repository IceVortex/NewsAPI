var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var connect = require('gulp-connect-php');

gulp.task('sass', function() {
    return gulp.src('./sass/index.sass')
      .pipe(sass())
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    connect.server({}, function () {
        browserSync({
          proxy: '127.0.0.1:8000'
        });
      });
    gulp.watch('./sass/**/*.sass', ['sass']);
    gulp.watch('./js/*.js').on('change', browserSync.reload);
    gulp.watch('./index.php').on('change', browserSync.reload);
});

gulp.task('default', ['sass','watch']);
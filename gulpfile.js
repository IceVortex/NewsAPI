const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const connect = require('gulp-connect-php');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

gulp.task('sass', () => {
    return gulp.src('./sass/index.sass')
      .pipe(sass())
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
});

gulp.task('js', () => {
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

gulp.task('watch', ['sass', 'js'], () => {
    connect.server({}, () => {
        browserSync({
          proxy: '127.0.0.1:8000'
        });
      });
    gulp.watch('./sass/**/*.sass', ['sass']);
    gulp.watch('./js/**/*.js', ['js', browserSync.reload]);
    gulp.watch('./index.php').on('change', browserSync.reload);
});

gulp.task('default', ['sass','watch']);
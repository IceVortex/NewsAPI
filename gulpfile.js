var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('./sass/**/*.sass')         //source
      .pipe(sass())
      .pipe(gulp.dest('./css'))                 //destination
      .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: 'local',
        port: 4000
    });

    gulp.watch('./sass/**/*.sass', gulp.series('sass'));
    //gulp.watch('./css/**/*.css').on('change', browserSync.reload);  // [Browsersync] File event [change] :
    gulp.watch('./sass/**/*.sass').on('change', browserSync.reload);  // [Browsersync] Reloading Browsers... (buffered 2 events)
});
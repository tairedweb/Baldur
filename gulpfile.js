var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('staging/scss/*.+(scss|sass)')
    .pipe(sass()) 
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('staging/scss/*.scss', ['sass']);
    gulp.watch('**/*.php', browserSync.reload); 
    gulp.watch('staging/js/*.js', browserSync.reload); 
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "http://localhost:8888/redcomponent"
  });
    gulp.watch("staging/scss/*.scss").on("change", browserSync.reload);
})
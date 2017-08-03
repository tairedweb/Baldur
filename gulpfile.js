var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('staging/scss/*.+(scss|sass)')
    .pipe(sass()) 
    .pipe(gulp.dest('staging/css'))
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "http://localhost:8888/redcomponent"
  });
    gulp.watch("staging/scss/*.scss").on("change", browserSync.reload);
});


gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('staging/scss/*.scss', ['sass']);
    gulp.watch('**/*.php', browserSync.reload); 
    gulp.watch('staging/js/*.js', browserSync.reload); 
});


gulp.task('useref', function(){
  return gulp.src('index.php')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
    return gulp.src('staging/scss/*.+(scss|sass)')
    .pipe(sass()) 
    .pipe(gulp.dest('staging/css'))
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(rename('dist.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('scripts', function(){
    return gulp.src(['staging/js/*.js'])
    .pipe(rename('dist.min.js'))
    .pipe(concat('dist.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
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


gulp.task('watch', ['browserSync', 'sass', 'scripts'], function (){
    gulp.watch('staging/scss/*.scss', ['sass']);
    gulp.watch('**/*.php', browserSync.reload); 
    gulp.watch('staging/js/*.js', browserSync.reload);
});



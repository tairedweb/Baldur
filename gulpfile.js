//Requried dependencies, all needed but could be written simpler by removing 'var name'
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();

//Run 'gulp boot-sass' prior to running 'gulp-watch'
gulp.task('boot-sass', function () {
    return gulp.src('staging/scss/bootstrap.scss')
    .pipe(sass())
    .pipe(gulp.dest('staging/css'))
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(rename('bootstrap.min.css'))
    .pipe(gulp.dest('dist/css'))
});

//Compiling, minifying scss 
gulp.task('sass', function(){
    return gulp.src('staging/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('staging/css'))
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(rename('dist.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

//Concat, minifying js
gulp.task('scripts', function(){
    return gulp.src(['staging/js/*.js'])
    .pipe(rename('dist.min.js'))
    .pipe(concat('dist.min.js', {
            newLine:'\n;'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(replace(/(\/\*\! Version [^*]* \*\/)/g, '\n$1')) 
    .pipe(replace(/^\s*\r?\n/gm, ''))
    .pipe(browserSync.reload({
        stream: true
    }))
});

//Task to move all fonts from staging to dist folder, nothing more than that
gulp.task('fonts', function() {
  return gulp.src('staging/fonts/**/*')
  .pipe(gulp.dest('dist/css/fonts'))
})

//Only monitor the styles.scss file, if we set it to look after all *.scss it would include bootstrap, and that takes longer to compile. Restructure folders if we need it to monitor for multiple files or import files into styles.scss instead
gulp.task('browserSync', function() {
    browserSync.init({
        //Remember to change this proxy so that it have the right path according to your project
        proxy: "http://localhost:8888/redcomponent"
    });
    gulp.watch("staging/scss/styles.scss").on("change", browserSync.reload);
});


gulp.task('watch', ['browserSync', 'sass', 'scripts'], function (){
    gulp.watch('staging/scss/styles.scss', ['sass']);
    gulp.watch('**/*.php', browserSync.reload); 
    gulp.watch('staging/js/*.js', ['scripts']);
});



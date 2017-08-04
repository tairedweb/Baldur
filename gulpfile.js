//Requried dependencies, all needed but could be written simpler by removing 'var name'
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var replace = require('gulp-replace');
var imagemin = require('gulp-imagemin');
var tinypng = require('gulp-tinypng-compress');
var cache = require('gulp-cache');
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
});

//Task to optimize images
gulp.task('images', function(){
  return gulp.src('staging/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({plugins: [{removeViewBox: true}]})
  ])))
  .pipe(gulp.dest('dist/images'))
});

//Tinypng task is the most effecient image compressor but also very time-consuming - would not use it for watch task
gulp.task('tinypng', function () {
    gulp.src('staging/images/**/*.{png,jpg,jpeg}')
        .pipe(cache(tinypng({
        //Get your own API key here: https://tinypng.com/developers 
            key: 'OfQXJtc2DNuFfh-XCAc-7Tb7w4wmI322',
            sigFile: 'staging/images/.tinypng-sigs',
            log: true
        })))
        .pipe(gulp.dest('dist/images'));
});

//To clear the cache use this task
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})

//Only monitor the styles.scss file, if we set it to look after all *.scss it would include bootstrap, and that takes longer to compile. Restructure folders if we need it to monitor for multiple files or import files into styles.scss instead
gulp.task('browserSync', function() {
    browserSync.init({
        //Remember to change this proxy so that it have the right path according to your project
        proxy: "http://localhost:8888/redcomponent"
    });
    gulp.watch("staging/scss/styles.scss").on("change", browserSync.reload);
});


gulp.task('watch', ['browserSync', 'sass', 'scripts', 'images'], function (){
    gulp.watch('staging/scss/styles.scss', ['sass']);
    gulp.watch('**/*.php', browserSync.reload); 
    gulp.watch('staging/js/*.js', ['scripts']);
    gulp.watch('staging/images/**/*.+(png|jpg|jpeg|gif|svg)', ['images']);
});



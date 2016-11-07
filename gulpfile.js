'use strict'

const gulp           = require('gulp');
const browserSync    = require('browser-sync').create();
const sass           = require('gulp-sass');
const concat         = require('gulp-concat');
const sourcemaps     = require('gulp-sourcemaps');
const gulpif         = require('gulp-if');
const jade           = require('gulp-jade');
const uglify         = require('gulp-uglify'); // для js
const cleanCss       = require('gulp-clean-css');
const include        = require('gulp-include');
const del            = require('del');
const useref         = require('gulp-useref');
const gutil          = require('gulp-util');
const imagemin       = require('gulp-imagemin');
const compass        = require('gulp-compass');
const autoprefixer   = require('gulp-autoprefixer');
const foreach        = require('gulp-foreach');
const rework         = require('gulp-rework');
const reworkUrl      = require('rework-plugin-url');
const filter         = require('gulp-filter');
const runSequence    = require('run-sequence');
const rename         = require("gulp-rename");
const insert         = require('gulp-insert');
const plumber        = require('gulp-plumber');
const minifyCss      = require('gulp-minify-css');



/*
gulp.task('default', ['browser-sync', 'libs', 'watch'], function(){
    
});
*/

gulp.task('default', ['scss', 'jade','watch', 'browser-sync'], function(){
    
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./develop"
        },
        port: 8000
    });
});

gulp.task('scss', function() {
    return gulp.src("./develop/scss/*.scss")
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass())
       // .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 version', '> 2%', 'firefox 15', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
          }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./develop/css'))
        .pipe(browserSync.stream());
        
});

gulp.task('jade', function() {
    return gulp.src("./develop/jade/*.jade")
        .pipe(jade({
            pretty: '  ',
        }))
        .pipe(gulp.dest('./develop'))
});

gulp.task('js', function(){
    return gulp.src("./develop/js/*.js")
});

gulp.task('watch', function() {
    gulp.watch('./develop/scss/**/*.scss', ['scss']);
    gulp.watch('./develop/js/*.js', ['js', browserSync.reload]);
    gulp.watch('./develop/jade/**/*.jade', ['jade', browserSync.reload]);
});



//=================build==========================

//cleandist
gulp.task('build:clean', function () {
    return del.sync(['./dist']);
});

//copydist
gulp.task('build:copyDist', function () {  
    return gulp.src([
        'develop/sendform.php', 
        'develop/.htaccess', 
        'develop/favicon.png'])
    .pipe(gulp.dest('dist'));
});

//copylibs
gulp.task('build:copyLibs', function () {  
    return gulp.src([
        'develop/libs/**'])
    .pipe(gulp.dest('dist/libs'));
});


//copy dist fonts
gulp.task('build:copyDistFonts',  function () {  
    return gulp.src(['develop/fonts/**/{*.eot,*.svg,*.ttf,*.eot,*.otf,*.woff2,*.woff}']
        )
    .pipe(gulp.dest('dist/fonts'));
});

//minifi img
gulp.task('build:minifiImg',  function () { 
    return gulp.src(['develop/images/**/{*.jpg,*.png,*.jpeg,*.gif,*.svg}'])
    .pipe(imagemin())
    .on('error', console.log)
    .pipe(gulp.dest('dist/images'));
});

gulp.task('build:minifiJsCss',   function () { 
    return gulp.src('develop/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))   
    .pipe(gulpif('*.css', minifyCss()))    
    .pipe(gulp.dest('dist'));
});




//build
gulp.task('build', ['build:clean'], function (callback) {
    return runSequence(['build:copyDist', 'build:copyLibs', 'build:copyDistFonts', 'build:minifiImg', 'build:minifiJsCss'], callback);
});

//------------=====build======--------------------
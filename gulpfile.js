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
const jadeGlobbing   = require('gulp-jade-globbing');
const sassGlob       = require('gulp-sass-glob');
const changed        = require('gulp-changed');
const replace        = require('gulp-replace');
const print          = require('gulp-print');



/*
gulp.task('default', ['browser-sync', 'libs', 'watch'], function(){
    
});
*/

gulp.task('default', ['scss', 'js', 'jadeBlocks', 'watch', 'browser-sync'], function(){

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
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))    
        .pipe(sassGlob())
        .pipe(print())
        .pipe(sass.sync({
            errLogToConsole: true
        }))
       // .pipe(sourcemaps.init())
       .pipe(autoprefixer({
        browsers: ['last 2 version', '> 2%', 'firefox 15', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
       .pipe(sourcemaps.write("."))
       .pipe(gulp.dest('./develop/css'))
       .pipe(browserSync.stream());

   });

gulp.task('jade', function() {
    return gulp.src(["./develop/jade/**/*.jade", "!./develop/jade/template/**/*"])
        .pipe(changed('develop/jade'))
        .pipe(print())
        .pipe(plumber())
        .pipe(jadeGlobbing())
        .pipe(jade({
            pretty: '  ',
        }))
        
        .pipe(gulp.dest('./develop'))
});

gulp.task('jadeBlocks', function() {
    return gulp.src(["./develop/jade/**/*.jade", "!./develop/jade/template/**/*"])
        .pipe(plumber())
        .pipe(jadeGlobbing())
        .pipe(print())
        .pipe(jade({
            pretty: '  ',
        }))
        .pipe(gulp.dest('./develop'))
});

gulp.task('deljs', function(){
   return del.sync(['./develop/js/main.js']);
});

gulp.task('js', ['deljs'], function(){

    return gulp.src("./develop/js/template.js")
    .pipe(plumber())
    .pipe(include())
    .pipe(print())
    .on('error', console.log)
    .pipe(concat("main.js"))      
    .pipe(gulp.dest("./develop/js"));
});

gulp.task('watch', function() {
    gulp.watch('./develop/**/*.scss', ['scss']);
    gulp.watch('./develop/**/*.js', ['js', browserSync.reload]);
    gulp.watch('./develop/blocks/**/*.jade', ['jadeBlocks', browserSync.reload]);
    gulp.watch('./develop/jade/template/**/*.jade', ['jadeBlocks', browserSync.reload]);
    gulp.watch(['./develop/jade/**/*.jade', './develop/jade/template/**/*.jade'], ['jade', browserSync.reload]);
});



//=================build==========================


// ====TO DIST====
//cleandist
gulp.task('build:clean', function () {
    return del.sync(['./dist']);
});

//copydist
gulp.task('build:copyDist', function () {  
    return gulp.src([
        'develop/sendform.php', 
        'develop/.htaccess', 
        'develop/favicon.png',
        'develop/*.html',
        ])
    .pipe(print())
    .pipe(gulp.dest('dist'));
});

//copylibs
gulp.task('build:copyLibs', function () {  
    return gulp.src([
        'develop/libs/**'])
    .pipe(print())
    .pipe(gulp.dest('dist/libs'));
});


//copy dist fonts
gulp.task('build:copyDistFonts',  function () {  
    return gulp.src(['develop/fonts/**/{*.eot,*.svg,*.ttf,*.eot,*.otf,*.woff2,*.woff}']
        )
    .pipe(print())
    .pipe(gulp.dest('dist/fonts'));
});

//minifi img
gulp.task('build:minifiImg',  function () { 
    return gulp.src(['develop/images/**/{*.jpg,*.png,*.jpeg,*.gif,*.svg}'])
    .pipe(print())
    .pipe(imagemin())
    .on('error', console.log)
    .pipe(gulp.dest('dist/images'));
});

gulp.task('build:minifiJsCss',   function () { 
    return gulp.src('./develop/index.html')
    .pipe(useref())
    .pipe(print())
    .pipe(gulpif('*.js', uglify().on('error', function(err) {
    gutil.log(gutil.colors.red('[Error]'), err.toString());
    this.emit('end');
    })))   
    .pipe(gulpif('*.css', minifyCss()))    
    .pipe(gulp.dest('dist'));
});

gulp.task('build:dist', ['build:clean'], function (callback) {
    return runSequence(['build:copyDist', 'build:copyLibs', 'build:copyDistFonts', 'build:minifiImg', 'build:minifiJsCss'], callback);
});
//===TO DIST====


/* ===TO JOOMLA==== */
//copy dist fonts
gulp.task('Jbuild:copyDistFonts',  function () {  
    return gulp.src(['develop/fonts/**/{*.eot,*.svg,*.ttf,*.eot,*.otf,*.woff2,*.woff}']
        )
    .pipe(print())
    .pipe(gulp.dest('../fonts'));
});

//minifi img
gulp.task('Jbuild:minifiImg',  function () { 
    return gulp.src(['develop/images/**/{*.jpg,*.png,*.jpeg,*.gif,*.svg}'])
    .pipe(print())
    .pipe(imagemin())
    .on('error', console.log)
    .pipe(gulp.dest('../images'));
});

gulp.task('Jbuild:minifiJsCss',   function () { 
    return gulp.src('develop/index.html')
    .pipe(useref())
    .pipe(print())
    //.pipe(replace(/\$/g, 'jQuery'))
    .pipe(gulpif('*.js', uglify()))   
    .pipe(gulpif('*.css', minifyCss()))    
    .pipe(gulp.dest('../'));
});

gulp.task('build:joomla', ['build:clean'], function (callback) {
    return runSequence(['Jbuild:copyDistFonts', 'Jbuild:minifiJsCss'], callback);
});
/* ===TO JOOMLA==== */



//build
gulp.task('build', ['build:clean'], function (callback) {
    return runSequence(['build:dist', 'Jbuild:minifiImg', 'build:joomla'], callback);
});

//------------=====build======--------------------
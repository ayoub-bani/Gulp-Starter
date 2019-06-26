var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


// CSS Task
gulp.task('concat-css', function () {
    return gulp.src('project/css/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
})

// Javascript Task
gulp.task('concat-js', function () {
    return gulp.src('project/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
})

// watch Tasks
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    })
    gulp.watch('project/css/**/*.scss', gulp.series('concat-css'));
    gulp.watch('dist/*.html').on('change', browserSync.reload);
    gulp.watch('project/js/*.js').on('change', browserSync.reload);
});
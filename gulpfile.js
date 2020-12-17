'use strict'

var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
let sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify');

gulp.task('compile', () => {
    return gulp.src('server/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/server'));
});

// 拷贝文件到指定目录
gulp.task('copy1', () => {
    return gulp.src('server/common/alipay/pem/**')
        .pipe(gulp.dest('dist/server/common/alipay/pem'));
});

gulp.task('copy2', () => {
    return gulp.src('server/webservice/KingMed_HeFei/static/**')
        .pipe(gulp.dest('dist/server/webservice/KingMed_HeFei/static'));
});

gulp.task('copy3', () => {
    return gulp.src('server/reports/script/static/**')
        .pipe(gulp.dest('dist/server/reports/script/static'));
});

gulp.task('watch', () => {
    return gulp.src('server/**/*.js')
        .pipe(watch('server/**/*.js', {
            verbose: true
        }))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify({ mangle: false }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/server/'));
});

gulp.task('default', () => {
    gulp.start('compile');
    gulp.start('copy1');
    gulp.start('copy2');
    gulp.start('copy3');
});

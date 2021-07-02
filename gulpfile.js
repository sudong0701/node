const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpTs = require('gulp-typescript')
const tsProject = gulpTs.createProject('tsconfig.json');

gulp.task('compile', () => {
    return gulp.src(['server/**/*.js', 'server/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(tsProject())
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
    return gulp.src(['server/**/*.js', 'server/**/*.ts'])
        .pipe(watch('server/**/*.js', {
            verbose: true
        }))
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(babel())
        .pipe(uglify({ mangle: false }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/server/'));
});


gulp.task('default', gulp.series(gulp.parallel('compile', 'copy1', 'copy2', 'copy3')))

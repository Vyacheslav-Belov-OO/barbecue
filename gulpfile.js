const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const { src, dest, watch, series, parallel } = require('gulp');
const babel = require('gulp-babel');

gulp.task('babel', () =>
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('src/dist/js/'))
);

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        },
        notify:false
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/dist/*").on('change', browserSync.reload);
});

gulp.task('autoprefixer', function () {
    return gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('src/dist/css/'))
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css/"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/js/*.js", gulp.parallel('babel'));
    gulp.watch("src/css/*", gulp.parallel('autoprefixer'));
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'autoprefixer', 'babel'));

// gulp.task('deployment', ['minify-css', 'minify-js', 'copy']);
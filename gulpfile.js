var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

var dest = 'static';
var src = 'frontend';

var toCopy = [
    src + "/**/*.html"
];

var css = [
    //"node_modules/foundation-sites/css/normalize.min.css",
    "node_modules/foundation-sites/css/foundation.min.css",
    src + "/styles.css"
];


var vendors = [
    "node_modules/angular2/bundles/angular2-polyfills.js",
    "node_modules/systemjs/dist/system.src.js",
    "node_modules/rxjs/bundles/Rx.js",
    "node_modules/angular2/bundles/angular2.dev.js",
    "node_modules/angular2/bundles/router.dev.js"
];

gulp.task('clean', function () {
    return gulp.src(dest, {read: false})
        .pipe(clean());
});

gulp.task('compilets', function () {
    return gulp
        .src(src + '/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        //.pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest));
});


gulp.task('copy', function () {
    return gulp.src(toCopy)
        .pipe(gulp.dest(dest));
});


gulp.task('js-vendors', function () {
    return gulp.src(vendors)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(dest));
});


gulp.task('css', function () {
    return gulp.src(css)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(dest));
});

gulp.task('default', ["clean"], function() {
    gulp.run(["copy", "copy-world", "js", "js-vendors", "css", "templates"]);
});

gulp.task('watch', ["clean"], function() {

    gulp.run(["copy", "compilets", "js-vendors", "css"]);
    gulp.watch(src + "/**/*.ts", ["compilets"]);
    gulp.watch(toCopy, ["copy"]);
    gulp.watch(css, ["css"]);
});


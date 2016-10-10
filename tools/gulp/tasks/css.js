"use strict";

var gulp = require("gulp"),
    fs = require("fs"),
    sass = require("gulp-sass"),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require("gulp-minify-css"),
    concat = require("gulp-concat"),
    flatten = require('gulp-flatten'),
    removeDir = require('../lib/remove-dir');


gulp.task("css-clear", function () {
    removeDir('./build/.tmp/css/');
    return removeDir('./build/css')
});


gulp.task("css-sass", ['css-clear'], function () {
    return gulp.src([
        "./src/**/lib/*.scss",
        "./src/**/*.scss"
    ])
        .pipe(sass())
        .pipe(flatten())
        .pipe(gulp.dest("build/.tmp/css"));
});


gulp.task("css-libs", ["css-sass"], function () {
    return gulp.src(["./src/**/*.css", "./src/css/libs/*.css"])
        .pipe(minifyCSS())
        .pipe(concat("libs.min.css"))
        .pipe(gulp.dest("build/.tmp/css/libs"));
});

gulp.task("css", ["css-sass"], function () {
    return gulp.src(["./src/**/*.css", "build/.tmp/css/*.css"])
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest("./build/css"));
});


gulp.task("css-dev", ["css-libs", "css-sass"], function () {
    return gulp.src(["build/.tmp/css/**/*.css"])
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%'],
            cascade: false
        }))
        .pipe(gulp.dest("./build/css"));
});

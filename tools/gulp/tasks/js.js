"use strict";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    fs = require("fs"),
    removeDir = require('../lib/remove-dir'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    flatten = require('gulp-flatten'),
    webpack = require('gulp-webpack'),
    react = require('gulp-react');


gulp.task("js-clear", function () {
    return removeDir('build/js')
});


gulp.task('react', function () {
    return gulp.src('./src/**/*.jsx')
        .pipe(react({harmony: true, es6module: true}))
        .pipe(flatten())
        .pipe(uglify())
        .pipe(gulp.dest("build/js/react"));
});

gulp.task("js", ["js-clear", "react"], function () {
    var jsFiles = [
        "src/**/lib/*.js",
        "src/**/libs/*.js",
        "src/**/vendor/*.js",
        "src/**/vendor/*.js",
        "src/**/*.js",
        "build/.tmp/js/*.js"
    ];
    return gulp.src(jsFiles)
        .pipe(concat("combined.js"))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./build/js"));
});

gulp.task("js-dev", ["js-clear", "react"], function () {
    var jsFiles = [
        "./src/js/**/*.js",
        "./src/js/*.js",
        "build/.tmp/js/*.js"
    ];
    return gulp.src(jsFiles)
        .pipe(gulp.dest("./build/js"));
});

"use strict";

var gulp = require("gulp"),
    imageminMozjpeg = require("imagemin-mozjpeg"),
    pngquant = require("imagemin-pngquant"),
    optipng = require("imagemin-optipng"),
    fs = require("fs");


gulp.task("image-optimize", function () {
    return gulp.src(["./src/img/**/*.{png,jpg,jpeg,gif,svg}"])
        .pipe(optipng({optimizationLevel: 3})())
        .pipe(pngquant({quality: "65-80", speed: 4})())
        .pipe(imageminMozjpeg({quality: 70})())
        .pipe(gulp.dest("./build/img"));
});

gulp.task("image-copy", function () {
    return gulp.src(["./src/img/**/*.{png,jpg,jpeg,gif,svg}"])
        .pipe(gulp.dest("./build/img"));
});

gulp.task("php-copy", function () {
    return gulp.src(["./src/php/*","./src/php/**/*"])
        .pipe(gulp.dest("./build/php"));
});

gulp.task("assets-fonts", function () {
    return gulp.src(["src/fonts/**/*"])
        .pipe(gulp.dest("./build/fonts"));
});
// gulp.task("assets-pdf", function () {
//     return gulp.src(["src/pdf/*"])
//         .pipe(gulp.dest("./build/pdf"));
// });

// gulp.task("assets", ["image-optimize", 'assets-fonts', 'php-copy'], function () {
gulp.task("assets", ["image-copy", 'assets-fonts', 'php-copy'], function () {
    return gulp.src(["./src/favicon.ico", "./src/*.png", "./src/*.txt", "./src/.htaccess"])
        .pipe(gulp.dest("./build"));
});

gulp.task("assets-dev", ["image-copy", 'assets-fonts', 'php-copy'], function () {
    return gulp.src(["./src/favicon.ico", "./src/*.png", "./src/*.txt", "./src/.htaccess"])
        .pipe(gulp.dest("./build"));
});
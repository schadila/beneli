"use strict";

var gulp = require("gulp"),
    connect = require("gulp-connect");

gulp.task("livereload-connect", ["build-dev"], function () {
    connect.server({
        root: "./build",
        livereload: true
    });
});

gulp.task("livereload-html", ["build-dev"], function () {
    gulp.src("./build")
        .pipe(connect.reload());
});

gulp.task("livereload-watch", ["build-dev"], function () {
    gulp.watch(["./src/*","./src/**/*"], ["build-dev", "livereload-html"]);
    // gulp.watch(["./src/sass/**/*.scss"], [ "build-dev", "livereload-html"]);
    // gulp.watch(["./src/php/**/*"], ["php-copy"]);
    // gulp.watch(["./src/images/**/*.{gif,jpg,png}"], [ "build-dev", "livereload-html"]);
    // gulp.watch(["./src/content/**/*.md"], [ "build-dev", "livereload-html"]);
    // gulp.watch(["./src/templates/**/*"], [ "build-dev", "livereload-html"]);
    // gulp.watch(["./src/i18n/**/*.json"], [ "build-dev", "livereload-html"]);
});

gulp.task("default", ["livereload-connect", "livereload-watch"]);

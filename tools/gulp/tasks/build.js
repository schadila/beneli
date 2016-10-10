'use strict';

var gulp = require('gulp'),
    removeDir = require('../lib/remove-dir');


gulp.task('clear', function () {
    return removeDir('build');
});

gulp.task('build', ['clear', 'html', 'assets']);
gulp.task('build-dev', ['html-dev', 'assets-dev']);




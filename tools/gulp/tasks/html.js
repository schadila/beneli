'use strict';

var gulp = require('gulp'),
    includeSources = require('gulp-include-source'),
    minifyHTML = require('gulp-htmlmin'),
    Promise = require('bluebird'),
    compileHome = require('../lib/compile-home'),
    compilePages = require('../lib/compile-pages'),
    removeDir = require('../lib/remove-dir'),
    markdown = require('gulp-markdown-to-json'),
    replace = require('gulp-replace'),
    i18n = require('gulp-i18n-localize'),
    del = require('del');


gulp.task('compile-content', function () {
    return gulp.src('./src/content/*.md')
        .pipe(replace(/(^(?!---\n).)/, '---\n$1'))
        .pipe(markdown())
        .pipe(gulp.dest('./build/content'));
});

gulp.task('compile-templates', ['compile-content'], function (done) {
    var compilePromises = [];
    // pages
    compilePromises.push(new Promise(function (resolve, reject) {
        compilePages.run('.', resolve, reject);
    }));
    // index page generation
    compilePromises.push(new Promise(function (resolve, reject) {
        compileHome.run('.', resolve, reject);
    }));

    Promise.all(compilePromises)
        .then(function () {
            removeDir('./build/content');
            done();
        }, done);
});

gulp.task("copy-hype", function () {
    // return gulp.src(["src/hype/*","src/hype/**/*"])
    //     .pipe(gulp.dest("./build/hype"));
});

gulp.task('link-css-js', ['compile-templates', 'css', 'js'], function () {
    return gulp.src('./build/.tmp/*.html')
        .pipe(includeSources({cwd: './build'}))
        .pipe(gulp.dest('./build/.tmp/'));
});

gulp.task('link-css-js-dev', ['compile-templates', 'css-dev', 'js-dev'], function () {
    return gulp.src('./build/.tmp/*.html')
        .pipe(includeSources({cwd: './build'}))
        .pipe(gulp.dest('./build/.tmp/'));
});

gulp.task('translate', ['link-css-js'], function () {
    return gulp.src('./build/.tmp/*.html')
        .pipe(i18n({
            locales: ['de', 'fr'],
            localeDir: './src/i18n',
            schema: 'suffix',
            delimeters: ['[[', ']]']
        }))
        .pipe(gulp.dest('./build/.tmp/html/'));
});

gulp.task('translate-dev', ['link-css-js-dev'], function () {
    return gulp.src('./build/.tmp/*.html')
        .pipe(i18n({
            locales: ['de', 'fr'],
            localeDir: './src/i18n',
            schema: 'suffix',
            delimeters: ['[[', ']]']
        }))
        .pipe(gulp.dest('./build/.tmp/html/'));
});

gulp.task('html', ['css', 'js', 'link-css-js', 'translate'], function () {
    del.sync('./build/*.html');
    return gulp.src('./build/.tmp/html/*.html')
        .pipe(minifyHTML({
            caseSensitive: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            html5: true,
            minifyCSS: true,
            removeComments: true,
            removeRedundantAttributes: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('html-dev', ['css-dev', 'js-dev', 'link-css-js-dev', 'translate-dev'], function () {
    del.sync('./build/*.html');
    return gulp.src('./build/.tmp/html/*.html')
        .pipe(gulp.dest('./build'));
});



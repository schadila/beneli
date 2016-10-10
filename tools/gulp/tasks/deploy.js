var gulp = require('gulp');
var rsync = require('gulp-rsync');


var options = {
    clean: true,
    archive: false,
    recursive: true,
    verbose: true,
    progress: false,
    compress: true,
    root: 'build',
    exclude: '.tmp',
    // chmod: "o-rwx,g-rwx,u-rwx"
};

gulp.task('deploy-dev', ['build-dev'], function () {

    // options.hostname = 'contexta04.nine.ch';
    // options.username = 'dev';
    // options.destination = '/home/dev/www/dev-valisanne/';
    //
    // return gulp
    //     .src(['build/**/*', 'build/.*'])
    //     .pipe(rsync(options));
});

gulp.task('deploy-stage', ['build'], function () {

    options.hostname = 'contexta04.nine.ch';
    options.username = 'dev';
    options.destination = '/home/dev/www/stage-app-fondue/';

    return gulp
        .src(['build/**/*', 'build/.*'])
        .pipe(rsync(options));
});

// gulp.task('deploy-production', function () {
//     return false;
//     options.hostname = 'contexta04.nine.ch';
//     options.username = 'dev';
//     options.destination = '/home/dev/www/dev-digital-festival/';
//
//     return gulp
//         .src(['build/**/*', 'build/.*'])
//         .pipe(rsync(options));
// });
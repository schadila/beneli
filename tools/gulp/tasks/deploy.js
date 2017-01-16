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

    options.hostname = 'contexta04.nine.ch';
    options.username = 'dev';
    options.destination = '/home/dev/www/stage-app-rezepte/';

    return gulp
        .src(['build/**/*', 'build/.*'])
        .pipe(rsync(options));
});

gulp.task('deploy-stage', ['build'], function () {

    options.hostname = 'ftp.login-47.hoststar.ch';
    options.username = 'web404';
    options.password = 'Gx4$tu*e9K';
    options.destination = '/html/stage-beneli/';

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
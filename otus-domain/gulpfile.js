(function() {

    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var bump = require('gulp-bump');

    /* Task registry */
    gulp.task('default', defaultTask);

    function defaultTask() {
        console.log('Do stuff here...');
    }

    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                open: 'external',
                baseDir: '../',
                middleware: function(req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Headers', '*');
                    next();
                }
            },
            startPath: '/otus-domain'
        });

        gulp.watch([
            'app/**/*.html',
            'app/**/*.js',
            'app/**/*.css'
        ]).on('change', browserSync.reload);
    });

    gulp.task('upgrade-version', function(value) {
        gulp.src('./package.json')
            .pipe(bump({
                version: process.env.npm_config_value
            }))
            .pipe(gulp.dest('./'));
    });

}());

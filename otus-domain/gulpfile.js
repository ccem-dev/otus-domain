(function() {

    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var browserSyncSpa = require('browser-sync-middleware-spa');
    var bump = require('gulp-bump');

    var baseDir = __dirname + '/app/index.html';

    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                open: 'external',
                baseDir: '../',
                middleware: [
                    browserSyncSpa(/^[^\.]+$/, baseDir),

                    function(req, res, next) {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Access-Control-Allow-Headers', '*');
                        next();
                    }
                ]
            },
            startPath: 'otus-domain/login'
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

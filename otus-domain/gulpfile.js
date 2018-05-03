(function() {

    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var browserSyncSpa = require('browser-sync-middleware-spa');
    var bump = require('gulp-bump');
    var uglify = require("gulp-uglify");
    var minify = require('gulp-minify');
    var gulpif = require('gulp-if');
    var babel = require('gulp-babel');
    var concat = require('gulp-concat');
    var sonar = require('gulp-sonar');
    var packageJson = require('./package.json');
    var replaceTask = require('gulp-replace-task');
    var baseDir = __dirname + '/app/index.html';

    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                open: 'external',
                baseDir: '../',
                middleware: [
                    //browserSyncSpa(/^[^\.]+$/, baseDir),

                    function(req, res, next) {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Access-Control-Allow-Headers', '*');
                        next();
                    }
                ]
            },
            startPath: 'otus-domain'
        });

        gulp.watch([
            'app/**/*.html',
            'app/**/*.js',
            'app/**/*.css'
        ]).on('change', browserSync.reload);
    });

    gulp.task('compress', function() {
        gulp.src('app/**/*.js')
            .pipe(concat('otus-domain.js'))
	    .pipe(gulpif('*.js',
		babel({
		  presets: ['es2015']
		      })
		))
	     .pipe(uglify())
            .pipe(minify())
            .pipe(gulp.dest('dist'));
    });

    gulp.task('replace-env', function(value) {
        gulp.src('app/config/env.js')
            .pipe(replaceTask({
                patterns: [{
                    match: /http:\/\/api\-domain\.localhost:8080/g,
                    replacement: process.env.npm_config_apiUrl,
                }]
            }))
            .pipe(gulp.dest('app/config'));
    });


    gulp.task('upgrade-version', function(value) {
        gulp.src('./package.json')
            .pipe(bump({
                version: process.env.npm_config_value
            }))
            .pipe(gulp.dest('./'));
    });

    gulp.task('sonar', function() {
        var options = {
           sonar: {
             host: {
               url: process.env.npm_config_sonarUrl,
             },
             login: process.env.npm_config_sonarDatabaseUsername,
             password: process.env.npm_config_sonarDatabasePassword,
             projectKey: 'sonar:otus-domain-js',
             projectName: 'otus-domain-js',
             projectVersion: packageJson.version,
             sources: 'app',
             language: 'js',
             sourceEncoding: 'UTF-8',
             exec: {
               maxBuffer: 1024 * 1024
             },
             javascript: {
               lcov: {
                 reportPath: 'target/test-coverage/report-lcov/lcov.info'
               }
             }
           }
         };

        return gulp.src('thisFileDoesNotExist.js', {
                read: false
            })
            .pipe(sonar(options));
    });


}());

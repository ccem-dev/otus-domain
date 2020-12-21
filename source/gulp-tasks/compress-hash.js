var gulp = require('gulp');

var uncache = require('gulp-uncache');
var useref = require('gulp-useref');
var babel = require('gulp-babel');
var replace = require('gulp-replace');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulp_if = require('gulp-if');

gulp.task('compress-hash', function () {
    return gulp.src('dist/index.html')
        .pipe(uncache({
            append: 'hash',
            rename: true,
	    srcDir:'dist',
	    distDir:'dist'
        }))
        .pipe(gulp.dest('dist'));
});

var gulp = require('gulp');
var bump = require('gulp-bump');

gulp.task('upgrade-version', function(value) {
  gulp.src('./package.json')
    .pipe(bump({
      version: process.env.npm_config_value
    }))
    .pipe(gulp.dest('./'));
});

var gulp = require('gulp');
var rename = require('gulp-rename');
var replaceTask = require('gulp-replace-task');

gulp.task('unit', function() {
  if (process.argv[4]) {
    var parameterValue = process.argv[4];
    var fullPath = parameterValue.replace(/\.js/, "");
    fullPath = fullPath.replace(/otus\//g,"");
    var paths = fullPath.split('/');
    var directoryTest = './tests/unit/';
    for (var i = 0; i < paths.length-1; i++) {
      directoryTest = directoryTest + paths[i] + '/';
    }
    gulp.src('./tests/unit/example.js')
      .pipe(replaceTask({
        patterns: [{
          match: /Modulo/gm,
          replacement: String(paths[paths.length-1]),
        }]
      }))
      .pipe(replaceTask({
        patterns: [{
          match: /xdescribe/gm,
          replacement: 'describe',
        }]
      }))
      .pipe(rename(paths[paths.length-1] + '-spec.js'))
      .pipe(gulp.dest(directoryTest));
  } else {
    console.error('--path parameter is not informed');
  }
  return true;
});

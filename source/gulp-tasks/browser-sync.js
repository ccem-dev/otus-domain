var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  var index = process.argv.indexOf("--api-url");
  var apiurl = process.argv[index + 1] || 'http://localhost:51006';
  browserSync.init({
    server: {
      open: 'external',
      baseDir: ['./app', './'],
      middleware: [
        function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Headers', '*');
          res.setHeader('Set-Cookie',['Backend-Address='+apiurl+';path=/']);
          next();
        }
      ]
    }
  });

  gulp.watch([
    'app/**/*.html',
    'app/**/*.js',
    '../app/**/*.css'
  ]).on('change', browserSync.reload);
});

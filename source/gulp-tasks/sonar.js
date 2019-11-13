var packageJson = require('../package.json');
var gulp = require('gulp');
var sonar = require('gulp-sonar');

gulp.task('sonar', function() {
  var options = {
    sonar: {
      host: {
        url: process.env.npm_config_sonarUrl,
      },
      login: process.env.npm_config_sonarDatabaseUsername,
      password: process.env.npm_config_sonarDatabasePassword,
      projectKey: 'sonar:' + packageJson.name,
      projectName: packageJson.name,
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

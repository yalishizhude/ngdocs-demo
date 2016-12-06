'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var runSequence = require('run-sequence');
gulp.task('doc', [], function (cb) {
  var task = ['doc:generate']
  if(gulp.env.w) task.unshift('doc:watch');
  if(gulp.env.s) task.push('doc:serve');
  runSequence(task);
});
gulp.task('doc:watch', function(cb) {
  gulp.watch('src/**/*.js', ['doc:generate']);
});
gulp.task('doc:generate', function (cb) {
  return $.ngdocs.sections({
    api: {
      glob: ['src/**/*.js'],
      api: true,
      title: 'API文档'
    },
    guide: {
      glob: ['src/guide/*.ngdoc'],
      title: '开发指南'
    }
  })
  .pipe($.ngdocs.process({
    image: '',
    title: '前端框架'
  }))
  .pipe(gulp.dest('./docs'))
  .pipe($.connect.reload());
});
gulp.task('doc:serve', function(cb) {
  $.connect.server({
    root: ['docs'],
    livereload: true,
    port: 666,
    fallback: 'docs/index.html'
  });
  openURL(`http://localhost:666`);
});
gulp.task('default', ['doc']);

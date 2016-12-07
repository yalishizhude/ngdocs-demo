'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var runSequence = require('run-sequence');
//任务入口，默认调用生成文档任务
gulp.task('doc', [], function (cb) {
  var task = ['doc:generate']
  if(gulp.env.w) task.unshift('doc:watch');
  if(gulp.env.s) task.push('doc:serve');
  runSequence(task);
});
//监控任务，监控源文件并生成文档
gulp.task('doc:watch', function(cb) {
  gulp.watch('src/**/*.js', ['doc:generate']);
});
//生成文档任务，根据源文件生成
gulp.task('doc:generate', function (cb) {
  //生成两个章节
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
//服务器任务，提供在线查看功能
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

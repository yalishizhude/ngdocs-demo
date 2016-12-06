'use strict';
/**
 * @ngdoc directive
 * @name demo.directive:dr
 * @description
 * 测试指令，无操作
 * @restrict A
 * @scope
 * @param {string} name =名字。
 * @param {function} click &点击回调函数。
 */
angular.module('demo', []).directive('dr', function() {
  return {
    restrict: 'A',
    scope: {
      name: '=',
      click: '&'
    }
  }
  /**
   * @ngdoc service
   * @name demo.sr
   * @description
   * 测试服务，无操作
   */
}).service('sr', ['$q', function($q) {
  /**
   * @ngdoc function
   * @name demo.sr#noop
   * @methodOf demo.sr
   * @param {function} noop 啥也不干。
   */
  this.noop = angular.noop;
  /**
   * @ngdoc filter
   * @name demo.filter:fl
   * @param {object} val 待匹配对象。
   * @param {string} key 属性名。
   * @return {object} obj
   */
}]).filter('fl', function() {
  return function(val, key) {
    return val;
  }
});
